const Sequelize = require('sequelize');
const sequelize = require('../db');

const timedata = sequelize.define("timedata", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = timedata