const Sequelize = require('sequelize');
const sequelize = require('../db');

const timedata = sequelize.define("timedata", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    sleeptime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    wakeup: {
        type: Sequelize.TIME,
        allowNull: false
    },
    totaltime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    timeDiff: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
});

module.exports = timedata