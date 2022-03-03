const express = require('express');
const router = express.Router();
const db = require('./db.js')


router.get('/', (req, res) => {

    db.query('SELECT * FROM sleepdata ', (error, result) => {
        if (error) throw error;
        res.render('dashboard.ejs', { result })

    });

})

router.post('/addtime', (req, res) => {
    let sleeptime = req.body.sleeptime;
    let wakeuptime = req.body.wakeuptime;

    db.query('INSERT INTO sleepdata SET sleeptime = ? AND wakeuptime = ?', [sleeptime, wakeuptime], (err, result) => {
        if (err) throw err;
    });
    console.log(sleeptime, wakeuptime)
})

module.exports = router