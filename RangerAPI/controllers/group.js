const { Group, User, UsersGroups, Event } = require('../models');
const errHandler = require('../utils/ErrorHandler');

const getIncludes = (inc) => {
    const includes = [ { model: User, as: 'creator' } ];
    if(inc) {
        inc.forEach(i => {
            switch(i){
                case 'members':
                    includes.push({ model: User, as: i }); break;
                case 'creatorOf':
                    includes.push({ model: Event, as: i }); break;
            }
        });
    }

    return includes;
}

module.exports.getAll = async (req, res) => {
    try {
        // const groups = await User.findAll(
        //     { include: 
        //         [
        //             { model: Group, as: 'creatorOf' },
        //             { model: Group, as: 'memberOf' }
        //         ]
        //     }
        // );
        // res.status(200).json(groups);
        const groups = await Group.findAll({ include: getIncludes(req.body.include) });
        res.status(200).json(groups);
    }
    catch(err) {
        errHandler(res, 'Fetch failed...', 500);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.id, { include: getIncludes(req.body.include) });
        res.status(200).json(group);
    }
    catch(err) {
        errHandler(res, 'Fetch failed...', 500);
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
        errHandler(res, 'Creation failed...', 500);
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
        errHandler(res, 'Deletion failed...', 500);
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
        errHandler(res, 'Deletion failed...', 500);
    }
}

module.exports.addUser = async (req, res) => {
    try {
        const ug = await UsersGroups.create({ 
            GroupId: req.params.id,
            UserId: req.body.id
        });

        res.status(200).json(ug);
    }
    catch(err) {
        errHandler(res, 'Creation failed...', 500);
    }
}

module.exports.deleteUser = async (req, res) => {
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
        errHandler(res, 'Deletion failed...', 500);
    }
}