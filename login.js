const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('./db')
const User = require('./models/user');

router.post('/', async(req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    const existedUser = await User.findOne({
        where: {
            password: req.body.password,
            username: req.body.username
        } // can use the op.and method but comma(,) works same as and
    }).catch((err) => {
        console.log('Error:', err)
    });

    if (!existedUser) {
        return res.json({ message: 'Login info Is not correct!!!!!' })
    }

    return res.json({ message: 'login sucessfull' })


});

module.exports = router