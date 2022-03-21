const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const sequelize = require('./db')
const path = require('path');
const login = require('./login.js')
const register = require('./register.js')
const dashboard = require('./dashboard.js')
const User = require('./models/user');
const time = require('./models/time');

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

app.set('view engine', 'ejs') // need to place all ejs files in views folder

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/register.html'));
})
app.get('/addtime', (req, res) => {
    res.sendFile(path.join(__dirname + '/addtime.html'));
})

//static file
//app.use(express.static('foldername'));

app.use('/reg-auth', register);

app.use('/log-auth', login);

app.use('/', dashboard);

app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send("Welcome," + req.session.username + '!!');
    } else {
        res.send('Please login or register to view page!!');
    }
});


User.hasMany(time);
time.belongsTo(User);
//{ force: true } use this in sync to commit changes forcely in db
sequelize.sync().then((result) => {
    //console.log(result);

}).catch((err) => {
    console.log(err);
});

app.listen(5000, () => {
    console.log('app is running on port 5000')
});