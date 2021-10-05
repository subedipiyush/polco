const db = require("./db");
const { Song, Artist, Album } = require("./models");


// random seed data for testing purposes
async function seed() {

    await db.sync({ force: true });

    console.log("db synced!");

    // 100 songs, 50 artists, 50 albums

    function getRandomIntInRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const artists = await Promise.all(
        Array(50).fill(0).map((val, idx) => {
            return Artist.create({
                name: `Artist ${idx}`,
            });
        })
    );

    const albums = await Promise.all(
        Array(50).fill(0).map((val, idx) => {
            return Album.create({
                name: `Album ${idx}`,
                year: getRandomIntInRange(1980, 2022),
                artistId: artists[getRandomIntInRange(0, artists.length)].id
            });
        })
    );


    const genres = ["romantic", "sad", "hiphop", "rock"];

    
    const songs = await Promise.all(
        Array(50).fill(0).map((val, idx) => {
            const randomAlbum = albums[getRandomIntInRange(0, albums.length)];
            return Song.create({
                title: `Song ${idx}`,
                length: getRandomIntInRange(180, 601),
                albumId: randomAlbum.id,
                rating: getRandomIntInRange(2,6),
                genre: genres[getRandomIntInRange(0, genres.length)]
            });
        })
    );


    await Promise.all(
        songs.map((song) => {
            if (Math.random() >= 0.5) {
                const album = albums.find((album) => album.id === song.albumId);
                let randomArtist = artists[getRandomIntInRange(0, artists.length)]
                while (randomArtist.id === album.artistId) {
                    randomArtist = artists[getRandomIntInRange(0, artists.length)]
                }
                return song.addArtist(randomArtist);
            }
        })
    );


    console.log(`seed complete`);
}

async function runSeed() {
    console.log("seeding...");
    try {
        await seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    } finally {
        console.log("closing db connection");
        await db.close();
        console.log("db connection closed");
    }
}

if (module === require.main) {
    runSeed();
}
