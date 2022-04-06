const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const sequelize = require('./db')
const path = require('path');
const login = require('./routes/login.js')
const register = require('./routes/register.js')
const dashboard = require('./routes/dashboard.js')
const User = require('./models/user');
const time = require('./models/time');
const passport = require('passport');
require('./passport')(passport);
const { ensureAuth } = require('./auth');


const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// .urlencoded indicates that we are parsing URL encoded data from the body. When working with forms, we use the urlencoded parser because by default, forms send data in URL encoded format.
// extended is an option allowing you to choose which library you want to use to parse the URL encoded data. By default, this option is set to true and will use the qs library. When set to false,it uses the QueryString library.
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', 'ejs') // need to place all ejs files in views folder

app.get('/login', (req, res) => {
    res.render('login.ejs'); // res.render automatically get the ile from views folder by just writing the file name
})
app.get('/register', (req, res) => {
    res.render('register.ejs');
})
app.get('/addtime', ensureAuth, (req, res) => {
    res.render('addtime.ejs');
})
app.get('/edittime/:id', ensureAuth, (req, res) => {
    res.render('edittime.ejs', { id: req.params.id });
})

app.use('/reg-auth', register);

app.use('/log-auth', login);

app.use('/', dashboard);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

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