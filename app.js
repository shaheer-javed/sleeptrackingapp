const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./db.js')


const app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// .urlencoded indicates that we are parsing URL encoded data from the body. When working with forms, we use the urlencoded parser because by default, forms send data in URL encoded format.
// extended is an option allowing you to choose which library you want to use to parse the URL encoded data. By default, this option is set to true and will use the qs library. When set to false,it uses the QueryString library.
app.use(express.static(path.join(__dirname, 'static')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/register.html'));
})

//static file
//app.use(express.static('foldername'));

app.post('/auth', (req, res) => {

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

app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send("Welcome," + req.session.username + '!!');
    } else {
        res.send('Please login or register to view page!!');
    }
});

app.post('/reg-auth', (req, res) => {
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

    db.query('SELECT * FROM accounts WHERE username = ? AND email = ?', [user.username, user.email], (error, result, fields) => {
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




app.listen(5000, () => {
    console.log('app is running on port 5000')
});