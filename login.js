const express = require('express');
const router = express.Router();
const db = require('./db.js')

router.post('/', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {

        db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (error, result, fields) => {
            if (error) throw error;
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Incorrect Username or Password!')
            }
            res.end();
        });
    } else {
        res.send('Enter Username and Password');
        res.end();
    }
});

module.exports = router