const Sequelize = require("sequelize");
const db = require("../db");

const Song = db.define("song", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    length: {
        type: Sequelize.INTEGER,    // in secs
        allowNull: false,
    },
    rating: {
        type: Sequelize.FLOAT(3,1),
        validate: {
            min: 0,
            max: 5
        },
    },
    genre: {
        type: Sequelize.ENUM('romantic', 'sad', 'hiphop', 'rock'),   // TODO: could be a separate table
        allowNull: false
    }
});


module.exports = Song;