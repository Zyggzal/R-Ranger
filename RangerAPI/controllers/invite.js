const { User, Event, Invite, Group } = require('../models');
const errHandler = require('../utils/ErrorHandler');


const getIncludes = (inc) => {
    const includes = [ { model: User, as: 'sender' }, { model: User, as: 'user' }, { model: Event, as: 'event' }, { model: Group, as: 'group' } ];
    // if(inc) {
    //     inc.split(',').forEach(i => {
    //         switch(i){
    //             case 'members':
    //                 includes.push({ model: User, as: i }); break;
    //             case 'creatorOf':
    //                 includes.push({ model: Event, as: i }); break;
    //         }
    //     });
    // }
    return includes;
}

module.exports.getAll = async (req, res) => {
    try{
        const where = req.params.type ? { type: req.params.type } : null
        const invite = await Invite.findAll({ include: getIncludes(req.query.include), where: where });
        res.status(200).json(invite); 
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getById = async (req, res) => {
    try{
        const where = req.params.type ? { type: req.params.type } : null
        const invite = await Invite.findByPk(req.params.id, { include: getIncludes(req.query.include), where: where });
        if(invite) {
            res.status(200).json(invite); 
        }
        else {
            errHandler(res, 'Invite not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.create = async (req, res) => {
    try{
        const { UserId, senderId, EventId, GroupId, type, role } = req.body;
        const invite = await Invite.create({ UserId, senderId, EventId, GroupId, type, role });
        res.status(200).json(invite);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.update = async (req, res) => {
    try{

        const { role, isAccepted, id, EventId, UserId, GroupId } = req.body;
        const where = { }
        if(id) {
            where.id = id
        }
        else {
            where.UserId = UserId
            if(EventId) {
                where.EventId = EventId
            }
            else {
                where.GroupId = GroupId
            }
        }
        const [updated] = await Invite.update({ isAccepted, role },
            { where: where }
        );
        if(updated) {
            //const updatedInvite = await Invite.findByPk({ EventId, UserId });
            res.status(200).json("Update succeeded");
        }
        else {
            errHandler(res, 'Update failed', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.delete = async (req, res) => {
    try{
        const where = { }
        if(req.body.id) {
            where.id = req.body.id
        }
        else {
            where.UserId = req.body.UserId
            if(req.body.EventId) {
                where.EventId = req.body.EventId
            }
            else {
                where.GroupId = req.body.GroupId
            }
        }
        await Invite.destroy({ where: where })

        res.status(200).json("Delete succeeded");
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}