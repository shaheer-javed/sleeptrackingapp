const express = require('express');
const router = express.Router();
const db = require('./db.js')


router.post('/', (req, res) => {
    /*
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let confirm_password = req.body.confirm_password;

        [firstName, lastName, username, password, email]
    */

    let user = {

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    }
    let confirm_password = req.body.confirm_password;

    db.query('SELECT * FROM accounts WHERE username = ? AND email = ?', [user.username, user.email], (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            var msg = user.username + " or " + user.email + " already existed!!";
            res.send(`${msg}`);
        } else if (confirm_password != user.password) {
            var msg = "Passwords didn't matched"
            res.send(`${msg}`);
        } else {
            db.query('INSERT INTO accounts SET ?', user, (err, result) => {
                if (err) throw err;
            });
            var msg = "Successfully Registered!"
            res.send(`${msg}`);
        }
    });
})

module.exports = router