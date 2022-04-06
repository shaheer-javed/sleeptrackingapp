const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../db')
const Time = require('../models/time');
const passport = require('passport');
var timeDifference;

const { ensureAuth } = require('../auth');

router.get('/dashboard', ensureAuth, async(req, res) => {

    const result = await Time.findAll({
        where: {
            userId: req.user.id
        }
    }).catch((err) => {
        console.log('Error:', err)
    });

    res.render('dashboard.ejs', { result });
})

router.post('/addtime', async(req, res) => {

    const addTime = await Time.create({
        date: req.body.date,
        sleeptime: req.body.sleeptime,
        wakeup: req.body.wakeuptime,
        totaltime: diff_hours(req.body.wakeuptime, req.body.sleeptime),
        timeDiff: timeDifference,
        userId: req.user.id

    }).catch((err) => {
        console.log('Error:', err)
    });
    if (addTime) {
        res.redirect('/dashboard');
    }
})

router.post('/edittime/:id', async(req, res) => {
    const UpdateTime = await Time.update({
        date: req.body.date,
        sleeptime: req.body.sleeptime,
        wakeup: req.body.wakeuptime,
        totaltime: diff_hours(req.body.wakeuptime, req.body.sleeptime),
        timeDiff: timeDifference,
        userId: req.user.id
    }, { where: { id: req.params.id } }).catch((err) => {
        console.log('Error:', err)
    });

    if (UpdateTime) {
        res.redirect('/dashboard');
    }
})


router.get('/delete/:id', ensureAuth, async(req, res) => {

    const deleteTime = await Time.destroy({ where: { id: req.params.id } }).catch((err) => {
        console.log('Error:', err)
    });

    if (deleteTime) {
        res.redirect('/dashboard');
    }
})


function diff_hours(valuestop, valuestart) {

    var timeStart = new Date("01/01/2020 " + valuestart).getHours();
    var timeEnd = new Date("01/01/2020 " + valuestop).getHours();
    var minStart = new Date("01/01/2020 " + valuestart).getMinutes();
    var minEnd = new Date("01/01/2020 " + valuestop).getMinutes();

    var hourDiff = timeEnd - timeStart;
    if (hourDiff < 0) {
        hourDiff = 24 + hourDiff;
    }
    var minDiff = minEnd - minStart;
    if (minDiff < 0) {
        hourDiff = hourDiff - 1;
        minDiff = 60 + minDiff;
    }

    timeDifference = hourDiff + minDiff / 100;
    difference = hourDiff + ' Hours and ' + minDiff + ' Minutes';

    return difference;
}

module.exports = router