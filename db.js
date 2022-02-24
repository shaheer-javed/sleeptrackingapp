const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sleeptracker',
    //port : 3306 port 3306 is default thats why we dont set itother =wise we need to specify the port
});

db.connect((err) => {
    if (err) throw err;
    console.log('database connected');
})

module.exports = db