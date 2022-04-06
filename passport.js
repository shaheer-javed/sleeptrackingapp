const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = require('./db')
const User = require('./models/user');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            //Match username
            User.findOne({
                where: { username: username }
            }).then(
                (user) => {
                    if (!user) {
                        return done(null, false, { alertMsg: 'Email is not registered' });
                    }
                    //Match password   user.password=>hashed password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            console.log('incorrectpassword')
                            return done(null, false, { alertMsg: 'Password incorrect' });
                        }
                    })
                }
            ).catch((err) => {
                console.log('Error:', err)
            });
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(function(user) { done(null, user); });
    });
}