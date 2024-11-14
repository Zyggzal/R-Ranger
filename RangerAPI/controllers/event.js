const { Event, User, Group, Invite, Review, EventParticipants } = require('../models');
const errHandler = require('../utils/ErrorHandler');

const getIncludes = (inc) => {
    const includes = [ { model: User, as: 'creator' }, { model: Group, as: 'creatorGroup' } ];
    if(inc) {
        inc.split(',').forEach(i => {
            switch(i){
                case 'participants':
                    includes.push({ model: User , as: i }); break;
                case 'reviews':
                    includes.push({ model: Review, as: i }); break;
                case 'invites':
                    includes.push({ model: Invite, as: i }); break;
            }
        });
    }

    return includes;
}

module.exports.getAll = async (req, res) => {
    try{
        const events = await Event.findAll({ include: getIncludes(req.query.include) });
        res.status(200).json(events);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getById = async (req, res) => {
    try{
        const event = await Event.findByPk(req.params.id, { include: getIncludes(req.query.include) });
        if(event) {
            res.status(200).json(event);
        }
        else {
            errHandler(res, 'Event not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.create = async (req, res) => {
    try{
        const { name, publicDescription, privateDescription, startDate, endDate, signUpEndDate, isPublic, isGroupEvent, participantsLimit, createdBy, createdByGroup } = req.body;
        const event = await Event.create({ name, publicDescription, privateDescription, startDate, endDate, signUpEndDate, isPublic, isGroupEvent, participantsLimit, createdBy, createdByGroup });
        res.status(200).json(event);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.delete = async (req, res) => {
    try {
        Event.destroy({
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
        const { name, publicDescription, privateDescription, startDate, endDate, signUpEndDate, isPublic, isGroupEvent, participantsLimit, createdBy, createdByGroup } = req.body;
        const [updated] = await Event.update(
            { name, publicDescription, privateDescription, startDate, endDate, signUpEndDate, isPublic, isGroupEvent, participantsLimit, createdBy, createdByGroup },
            { where: {
                id: req.params.id
            }}
        );

        if(updated) {
            const updatedEvent = await Event.findByPk(req.params.id);
            res.status(200).json(updatedEvent);
        }
        else {
            errHandler(res, 'Update failed', 404);
        }
    }
    catch (err) {
        errHandler(res, err, 500);
    }
}

module.exports.addParticipant = async (req, res) => {
    try {
        const { UserId, role, status } = req.body;
        const ep = await EventParticipants.create({ EventId: req.params.id, UserId, role, status });

        res.status(200).json(ep);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.removeParticipant = async (req, res) => {
    try {
        await Invite.destroy({ where: { EventId: req.params.id, UserId: req.body.UserId }})

        res.status(200).json('Deletion successful');
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getParticipants = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, { include: { model: User , as: 'participants' } });

        if(event) {
            res.status(200).json(event.participants);
        }
        else {
            errHandler(res, 'Event not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.updateParticipant = async (req, res) => {
    try {
        const { id, role, status } = req.body;
        const [updated] = await EventParticipants.update(
            { role, status },
            { where: {
                EventId: req.params.id,
                UserId: id
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