const { Event, User, Review } = require('../models');
const errHandler = require('../utils/ErrorHandler');

const getIncludes = (inc) => {
    const includes = [ { model: User, as: 'user' }, { model: Event, as: 'event' } ];
    // if(inc) {
    //     inc.split(',').forEach(i => {
    //         switch(i){
    //             case 'participants':
    //                 includes.push({ model: User , as: i }); break;
    //             case 'creatorOfGroups':
    //                 includes.push({ model: Group, as: i }); break;
    //             case 'reviews':
    //                 includes.push({ model: Review, as: i }); break;
    //         }
    //     });
    // }

    return includes;
}


module.exports.getAll = async (req, res) => {
    try {
        const reviews = await Review.findAll({ include: getIncludes(req.query.include) });
        res.status(200).json(reviews);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getById = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id, { include: getIncludes(req.query.include) });
        if(review) {
            res.status(200).json(review);
        }
        else {
            errHandler(res, 'Review not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.create = async (req, res) => {
    try {
        const { rating, comment, EventId, UserId } = req.body;
        const review = await Review.create({ rating, comment, EventId, UserId });
        res.status(200).json(review);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.delete = async (req, res) => {
    try {
        Review.destroy({
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
        const { rating, comment } = req.body;
        const [updated] = await Review.update(
            { rating, comment },
            { where: {
                id: req.params.id
            }}
        );

        if(updated) {
            const updatedReview = await Review.findByPk(req.params.id);
            res.status(200).json(updatedReview); 
        }
        else {
            errHandler(res, 'Update failed', 404);
        }
    }
    catch (err) {
        errHandler(res, err, 500);
    }
}