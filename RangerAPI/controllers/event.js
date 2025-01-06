const { Event, User, Group, Invite, Review, EventParticipants } = require('../models');
const errHandler = require('../utils/ErrorHandler');
const sequelize = require("../config/database");
const {QueryTypes, where} = require("sequelize");

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
module.exports.getPublic = async (req, res) =>{
    try{
        const events = await Event.findAll({ include: getIncludes(req.query.include), where: {isPublic: '1'} });
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

module.exports.getEventsByName = async (req, res) => {
    try{
        const { name } = req.params;
        const { type } = req.body;

        let containsName = name.trim().split(/\s+/);

        containsName = containsName.join(' AND ');

        let condition = '';
        switch (type) {
            case 'public': condition = 'AND isPublic = 1'; break;
            case 'private': condition = 'AND isPublic = 0'; break;
            default: condition = 'AND isPublic = 1';
        }

        const foundUsers = await sequelize.query(
            `SELECT TOP 20 *, e.id as id
            FROM events as e
            LEFT JOIN users as u on u.id = e.createdBy
            WHERE CONTAINS(name, :name) ${condition} AND name LIKE :secondName
            ORDER BY LEN(name)`,
            {
                type: QueryTypes.SELECT,
                replacements: {name: `"${containsName}"`, secondName: `%${name}%`},
            }
        )

        res.status(200).json(foundUsers);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.create = async (req, res) => {
    const transaction = await sequelize.transaction();
    try{
        const { name, publicDescription, privateDescription, startDate, endDate, signUpEndDate, isPublic, isGroupEvent, participantsLimit, createdBy, createdByGroup } = req.body;
        const event = await Event.create(
            { name, publicDescription, privateDescription, startDate, endDate, signUpEndDate, isPublic, isGroupEvent, participantsLimit, createdBy, createdByGroup },
            {transaction}
            );

        if(event) {
            const creatorParticipant = await EventParticipants.create(
                {
                    role: 'creator',
                    status: 'accepted',
                    EventId: event.id,
                    UserId: createdBy
                },
                {transaction}
            );

            if(creatorParticipant) {
                await transaction.commit();
                res.status(200).json([event, creatorParticipant]);
            }
            else{
                await transaction.rollback();
                errHandler(res, 'adding creator failed', 500);
            }
        }
        else{
            await transaction.rollback();
            errHandler(res, 'adding event failed', 500);
        }

    }
    catch(err) {
        await transaction.rollback();
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

module.exports.addParticipantToEvent = async (req, res) => {
    try {
        const { UserId, role, status } = req.body;
        const ep = await EventParticipants.create({ EventId: req.params.id, UserId, role, status });

        res.status(200).json(ep);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.addParticipant = async (data) => {
    try {
        const { UserId, role, status, EventId } = data;
        //const ep = await EventParticipants.create({ EventId: req.params.id, UserId, role, status });
        const ep = await EventParticipants.create({ EventId, UserId, role, status });

        //res.status(200).json(ep);
    }
    catch(err) {
        // errHandler(res, err, 500);
    }
}

module.exports.removeParticipant = async (req, res) => {
    try {
        await EventParticipants.destroy({ where: { EventId: req.params.id, UserId: req.body.UserId }})

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

module.exports.getUserStatus = async (req, res) => {
    try {
        const ep = await EventParticipants.findOne({ where: { EventId: req.params.eventId, UserId: req.params.userId } })

        if(ep) {
            res.status(200).json(ep);
        }
        else {
            res.status(200).json({ role: 'stranger' });
        }
    }
    catch (err) {
        errHandler(res, err, 500);
    }
}