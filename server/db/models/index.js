const Song = require("./song");
const Artist = require("./artist");
const Album = require("./album");

// associations

Song.hasMany(Artist, { constraints: false });
Song.belongsTo(Album);
Album.belongsTo(Artist);


module.exports = {
  Song,
  Artist,
  Album,
};