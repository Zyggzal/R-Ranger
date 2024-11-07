const { User, Event, Invite } = require('../models');
const errHandler = require('../utils/ErrorHandler');


const getIncludes = (inc) => {
    const includes = [ { model: User, as: 'sender' }, { model: User, as: 'user' }, { model: Event, as: 'event' } ];
    // if(inc) {
    //     inc.forEach(i => {
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

//Не работает и я хз почему
module.exports.getAll = async (req, res) => {
    try{
        const pk = { UserId: req.body.UserId, EventId: req.body.EventId }
        if(pk.UserId && pk.EventId) {
            const invite = await Invite.findByPk(pk, { include: getIncludes() });
            if(invite) {
                res.status(200).json(invite); 
            }
            else {
                errHandler(res, 'Invite not found', 404);
            }
        }
        else {
            const invites = null;
            if(pk.UserId) {
                invites = await Invite.findAll({ include: getIncludes(), where: { UserId: pk.UserId } });
            }
            else if(pk.EventId) {
                invites = await Invite.findAll({ include: getIncludes(), where: { EventId: pk.EventId } });
            }
            else {
                invites = await Invite.findAll({ include: getIncludes() });
            }
            res.status(200).json(invites); 
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.update = async (req, res) => {
    try{
        const { isAccepted, EventId, UserId } = req.body;
        const [updated] = await Invite.update({ isAccepted },
            { where: { EventId, UserId } }
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
        await Invite.destroy({ where: { EventId: req.body.EventId, UserId: req.body.UserId }})

        res.status(200).json("Delete succeeded");
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}