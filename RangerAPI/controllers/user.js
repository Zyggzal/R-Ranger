const Pwd = require('../utils/Password')
const { User, Group, Event, Invite, Review, Friend } = require('../models')
const errHandler = require('../utils/ErrorHandler')

const getIncludes = (inc) => {
    const includes = [];
    if(inc) {
        inc.split(',').forEach(i => {
            switch(i){
                case 'memberOf':
                    includes.push({ model: Group, as: i }); break;
                case 'creatorOfGroups':
                    includes.push({ model: Group, as: i }); break;
                case 'creatorOfEvents':
                    includes.push({model: Event, as: i }); break;
                case 'participatesIn':
                    includes.push({ model: Event, as: i }); break;
                case 'invites':
                    includes.push({ model: Invite, as: i }); break;
                case 'reviews': 
                    includes.push({ model: Review, as: i }); break;
                case 'friends': 
                    includes.push({ model: User, as: i }); break;
            }
        });
    }

    return includes;
}

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ include: getIncludes(req.query.include) });
        res.status(200).json(users);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { include: getIncludes(req.query.include) });
        if(user) {
            res.status(200).json(user);
        }
        else {
            errHandler(res, 'User not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.update = async (req, res) => {
    try {
        const { firstName, lastName, password, newPassword } = req.body;
        const user = await User.findByPk(req.params.id);
        if(user) {     
            if(Pwd.valid(password, user.password)) {
                const upd = { firstName, lastName }
                if(newPassword){
                    upd.password = Pwd.hash(newPassword);
                }
                const [updated] = await User.update( 
                    upd,
                    { where: { 
                        id: req.params.id
                    }}
                );
        
                if(updated) {
                    const updatedUser = await User.findByPk(req.params.id);
                    res.status(200).json(updatedUser);
                }
                else {
                    errHandler(res, 'Update failed', 404);
                }
            }
            else {
                errHandler(res, 'Wrong password', 400)
            }
        }
        else {
            errHandler(res, 'User not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.delete = async (req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(user) {
            if(Pwd.valid(req.body.password, user.password)) {
                user.destroy()
                res.status(204).json('Deletion successful')
            }
            else {
                errHandler(res, 'Wrong password', 400);
            }
        }
        else {
            errHandler(res, 'User not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500)
    }
}

module.exports.getFriends = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { include: { model: User, as: 'friends' }  });
        if(user) {
            res.status(200).json(user.friends);
        }
        else {
            errHandler(res, 'User not found', 404);
        }
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.updateFriend = async (req, res) => {
    try {
        const { id, status } = req.body;
        const [updated] = await Friend.update(
            { status },
            { where: {
                UserId: req.params.id,
                friendId: id
            }}
        );

        if(updated) {
            res.status(200).json("Update succeeded");
        }
        else {
            errHandler(res, 'Update failed', 404);
        }
    }
    catch (err) {
        errHandler(res, err, 500);
    }
}

module.exports.deleteFriend = async (req, res) => {
    try {
        await Friend.destroy({ where: { UserId: req.params.id, friendId: req.body.id }})

        res.status(200).json('Deletion successful');
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.addFriend = async (req, res) => {
    try {
        const { id, status } = req.body;
        const af = await Friend.create({ UserId: req.params.id, friendId: id, status });

        res.status(200).json(af);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}