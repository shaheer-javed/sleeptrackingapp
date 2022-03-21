const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { Op } = require("sequelize"); //because latest version doesnt add Operators automaitically
const sequelize = require('./db')
const User = require('./models/user');


router.post('/', async(req, res) => {
    /*
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let confirm_password = req.body.confirm_password;
        [firstName, lastName, username, password, email]

    */
    const existedUser = await User.findOne({
        where: {
            [Op.or]: [{ email: req.body.email }, { username: req.body.username }]
        }
    }).catch((err) => {
        console.log('Error:', err)
    });

    if (existedUser) {
        return res.json({ message: 'user already existed' })
    }

    const addUser = User.create({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).catch((err) => {
        console.log('Error:', err)
    });
    if (addUser) {
        console.log('user added sucessfully');
        res.send(`success`);
    }

})

module.exports = router