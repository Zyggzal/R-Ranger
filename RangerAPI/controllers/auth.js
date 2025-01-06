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

                res.status(200)
                    .cookie(
                        'jwt',
                        token,
                        {
                            httpOnly: true,
                            maxAge:  1000 * 60 * 60 * 2,
                            domain: 'localhost',
                            sameSite: 'Lax' 
                        }).json({
                            user,
                            expires: Date.now() + (3600 * 1000 * 2)
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

module.exports.logout = async (req, res) => {
    try {
        res.status(200)
            .cookie(
                'jwt',
                null,
                {
                    httpOnly: true,
                    maxAge:  0,
                    domain: 'localhost',
                    sameSite: 'Lax' 
                }).json("Logged out successfully")
    }
    catch(err) {
        errHandler(res, err, 500)
    }
}

module.exports.status = async (req, res) => {
    if (jwt.verify(req.cookies?.jwt, keys.jwt).userId === req.body.id) {
        res.send({isAuthenticated: true})
      } else {
        res.send({isAuthenticated: false})
      }
}

module.exports.register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ where: { email: req.body.email }})
        const userByLogin = await User.findOne({ where: { login: req.body.login }})
        if(existingUser) {
            errHandler(res, 'An account with this email is already registered', 409)
        }
        else if(userByLogin) {
            errHandler(res, 'User with this login is already registered', 409) 
        }
        else {
            const newUser = await User.create({
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                login: req.body.login,
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