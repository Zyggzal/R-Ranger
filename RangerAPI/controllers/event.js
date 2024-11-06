const { Event, User, Group } = require('../models');
const errHandler = require('../utils/ErrorHandler');

const getIncludes = (inc) => {
    const includes = [ { model: User, as: 'creator' }, { model: Group, as: 'creatorGroup' } ];
    if(inc) {
        inc.forEach(i => {
            switch(i){
                case 'participants':
                    includes.push({ model: User, as: i }); break;
                case 'creatorOfGroups':
                    includes.push({ model: Group, as: i }); break;
            }
        });
    }

    return includes;
}

module.exports.getAll = async (req, res) => {
    try{
        const events = await Event.findAll({ include: getIncludes(req.body.include) });
        res.status(200).json(events);
    }
    catch(err) {
        errHandler(res, 'Fetch failed', 500);
    }
}