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
        const invite = await Invite.findAll({ include: getIncludes(req.query.include) });
        res.status(200).json(invite); 
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getById = async (req, res) => {
    try{
        const invite = await Invite.findByPk(req.params.id, { include: getIncludes(req.query.include) });
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
        const { UserId, senderId, EventId, GroupId } = req.body;
        const invite = await Invite.create({ UserId, senderId, EventId, GroupId });
        res.status(200).json(invite);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.update = async (req, res) => {
    try{
        const { status, id, EventId, UserId } = req.body;
        const [updated] = await Invite.update({ status },
            { where: { id, EventId, UserId } }
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
        await Invite.destroy({ where: { id: req.body.id, EventId: req.body.EventId, UserId: req.body.UserId, GroupId: req.body.GroupId }})

        res.status(200).json("Delete succeeded");
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}