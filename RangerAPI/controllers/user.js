const Pwd = require('../utils/Password')
const { User, Group, Event, Invite } = require('../models')
const errHandler = require('../utils/ErrorHandler')

const getIncludes = (inc) => {
    const includes = [];
    if(inc) {
        inc.forEach(i => {
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
            }
        });
    }

    return includes;
}

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ include: getIncludes(req.body.include) });
        res.status(200).json(users);
    }
    catch(err) {
        errHandler(res, err, 500);
    }
}

module.exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { include: getIncludes(req.body.include) });
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
        const { username, password, newPassword } = req.body;
        const user = await User.findByPk(req.params.id);
        if(user) {     
            if(Pwd.valid(password, user.password)) {
                const upd = { username }
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