const { Sequelize } = require('sequelize');
const { Group, User, UsersGroups, Event, Invite } = require('../models');
const errHandler = require('../utils/ErrorHandler');

const getIncludes = (inc) => {
    const includes = [ { model: User, as: 'creator' } ];
    if(inc) {
        inc.split(',').forEach(i => {
            switch(i){
                case 'members':
                    includes.push({ model: User, as: i }); break;
                case 'creatorOf':
                    includes.push({ model: Event, as: i }); break;
                case 'invites':
                    includes.push({ model: Invite, as: i }); break;
            }
        });
    }

    return includes;
}

module.exports.getAll = async (req, res) => {
    try {
        const groups = await Group.findAll({ include: getIncludes(req.query.include) });
        res.status(200).json(groups);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id, { include: getIncludes(req.query.include) });
        if(group) {
            res.status(200).json(group);
        }
        else {
            errHandler(res, 'Group not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getPublic = async (req, res) => {
    try{
        const groups = await Group.findAll({ include: getIncludes(req.query.include), where: {isPublic: '1'} });
        return res.status(200).json(groups);

    }
    catch (err){
        errHandler(res, err, 500);
    }
}

module.exports.getAllByUserId = async (req, res) => {
    try{
        const u = await User.findByPk(req.params.id, { include: [{ model: Group, as: 'memberOf' }, { model: Group, as: 'creatorOfGroups' }]});
        if(!u) {
            errHandler(res, 'User not found', 404);
        }
        if(u.memberOf.length === 0 && u.creatorOfGroups.length === 0) {
            return res.status(200)
        }
        const or = []
        if(u.memberOf.length > 0) {
            u.memberOf.forEach((g) => {
                or.push(g.id)
            })
        }
        if(u.creatorOfGroups.length > 0) {
            u.creatorOfGroups.forEach((g) => {
                or.push(g.id)
            })
        }


        const groups = await Group.findAll({ include: getIncludes(req.query.include), where: Sequelize.or({ id: or }) })

        return res.status(200).json(groups);

    }
    catch (err){
        errHandler(res, err, 500);
    }
}

module.exports.create = async (req, res) => {
    try {
        const { name, isPublic, createdBy } = req.body;
        const group = await Group.create({ name, isPublic, createdBy });
        // await UsersGroups.create({ 
        //     GroupId: group.id,
        //     UserId: group.createdBy
        // });
        res.status(200).json(group);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.delete = async (req, res) => {
    try {
        Group.destroy({ 
            where: { 
                id: req.params.id
            }
        });

        res.status(200).json("Deletion successful");
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.update = async (req, res) => {
    try {
        const { name, isPublic } = req.body;
        const [updated] = await Group.update( 
            { name, isPublic },
            { where: { 
                id: req.params.id
            }}
        );

        if(updated) {
            const updatedGroup = await Group.findByPk(req.params.id);
            res.status(200).json(updatedGroup);
        }
        else {
            errHandler(res, 'Update failed', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.addMember = async (req, res) => {
    try {
        const ug = await UsersGroups.create({ 
            GroupId: req.params.id,
            UserId: req.body.id,
            role: req.body.role
        });

        res.status(200).json(ug);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.editMember = async (req, res) => {
    try {
        const { id, role } = req.body;
        const [updated] = await UsersGroups.update(
            { role },
            { where: {
                GroupId: req.params.id,
                UserId : id
            }}
        );

        if(updated) {
            res.status(200).json("Update successful");
        }
        else {
            errHandler(res, 'Update failed', 404);
        }
    }
    catch (err) {
        errHandler(res, err, 500);
    }
}


module.exports.deleteMember = async (req, res) => {
    try {
        UsersGroups.destroy({ 
            where: { 
                GroupId: req.params.id,
                UserId: req.body.id
            }
        });

        res.status(200).json("Deletion successful");
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getMembers = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id, { include: { model: User, as: 'members' } });
        if(group) {
            res.status(200).json(group.members);
        }
        else {
            errHandler(res, 'Group not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}