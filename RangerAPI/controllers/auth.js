const jwt = require('jsonwebtoken')
const { User } = require('../models')
const errHandler = require('../utils/ErrorHandler')
const Pwd = require('../utils/Password')
const keys = require('../config/key')

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email }})

        if(user) {
            if(Pwd.valid(req.body.password, user.password)) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, 
                keys.jwt,
                {
                    expiresIn: 60 * 60 * 2
                })

                res.status(200).json({
                    token: `Bearer: ${token}`
                })
            }
            else {
                errHandler(res, 'Incorrect data', 401)
            }
        }
        else {
            errHandler(res, 'User not found', 404)
        }
    }
    catch(err) {
        errHandler(res, err, 500)
    }
}

module.exports.register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ where: { email: req.body.email }})

        if(existingUser) {
            errHandler(res, 'User is already registered', 409)
        }
        else {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: Pwd.hash(req.body.password)
            })

            res.status(201).json(newUser)
        }
    }
    catch(err) {
        errHandler(res, err, 500)
    }
}