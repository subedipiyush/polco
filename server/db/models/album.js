const Sequelize = require("sequelize");
const db = require("../db");

const Album = db.define("album", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,    // may add validation (TODO)
    },
    photoUrl: {
        type: Sequelize.STRING,
    },
});


module.exports = Album;