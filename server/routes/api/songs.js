const router = require("express").Router();
const { Song, Artist, Album } = require("../../db/models");

// returns top 100 songs
router.get("/", async (req, res, next) => {
    try {

        const songs = await Song.findAll({
          include: [
            { model: Artist },
            { model: Album }
          ],
          order: [["rating", "DESC"], [Album, "year", "DESC"]],
          limit: 100
        });

        // create a separate artists, albums, genres list for easier access in UI side
        const artists = new Set(),
              albums = new Set(),
              genres = new Set();

        for (let i=0; i < songs.length; i++) {
            const song = songs[i];
            const songJSON = song.toJSON();

            songJSON.lengthStr = Math.floor(songJSON.length / 60) + ":" + (songJSON.length % 60);
            songJSON.isFavorite = false;
            songs[i] = songJSON;

            songJSON.artists.forEach((artist) => { artists.add(artist.name); });
            
            albums.add(songJSON.album.name);
            genres.add(songJSON.genre);
        }

        res.json({ songs, artists: Array.from(artists), albums: Array.from(albums), genres: Array.from(genres) });

  } catch (error) {
    next(error);
  }
});


module.exports = router;
