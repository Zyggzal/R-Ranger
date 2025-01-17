const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User')
const keys = require('../config/key')

const options = {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: (req) => req && req.cookies ? req.cookies['jwt'] : null,
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try{
                const user = await User.findByPk(payload.userId)
                if(user) done(null, user)
                else done(null, false)
            }
            catch(err) {
                done(err, false)
            }
        })
    )
}