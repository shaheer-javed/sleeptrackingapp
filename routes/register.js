const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { Op } = require("sequelize"); //because latest version doesnt add Operators automaitically
const sequelize = require('../db')
const User = require('../models/user');
const bcrypt = require('bcryptjs')


router.post('/', async(req, res) => {

    const existedUser = await User.findOne({
        where: {
            [Op.or]: [{ email: req.body.email }, { username: req.body.username }]
        }
    }).catch((err) => {
        console.log('Error:', err)
    });

    if (existedUser) {
        res.render('register', { alertMsg: "User already Existed!!!!" });
    }

    if (req.body.confirm_password == req.body.password) {
        var hashedpwd = req.body.password;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(hashedpwd, salt, (err, hash) => {
                if (err) throw err;
                hashedpwd = hash

                const addUser = User.create({
                    firstname: req.body.firstName,
                    lastname: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedpwd
                }).catch((err) => {
                    console.log('Error:', err)
                });
                if (addUser) {
                    console.log('user added sucessfully');
                    res.redirect('/dashboard')
                }
            })
        })

    } else {
        res.render('register', { alertMsg: "Password Don't match" });
    }
})

module.exports = router