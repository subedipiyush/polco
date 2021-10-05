
const FILTER_ARTISTS = "Artists", FILTER_ALBUMS = "Albums", FILTER_GENRES = "Genres";


export const setInitialState = (state, payload) => {

    const { data, favorites } = payload;
    const { songs, artists, albums, genres } = data;

    return  {
                songs: songs,
                filteredSongs: songs,
                filters: { artists, albums, genres },
                appliedFilters: {[FILTER_ARTISTS]: artists, [FILTER_ALBUMS]: albums, [FILTER_GENRES]: genres},
                favorites: favorites,
            };
}


export const filterByALL = (state, change) => {
    let newState = { ...state };

    let appliedFilters = state.appliedFilters;

    Object.entries(change).map((entry) => appliedFilters[entry[0]] = entry[1]);

    newState.filteredSongs = state.songs.filter((song) => {

        if (song.artists.find((artist) => appliedFilters[FILTER_ARTISTS].indexOf(artist.name) !== -1) === undefined) {
            return false
        }

        if (appliedFilters[FILTER_ALBUMS].indexOf(song.album.name) === -1) {
            return false
        }

        if (appliedFilters[FILTER_GENRES].indexOf(song.genre) === -1) {
            return false
        }

        return true
    });

    newState.appliedFilters = appliedFilters;

    return newState;
};


export const setFavorite = (state, payload) => {
    const { songId, isFavorite } = payload;

    let newState = { ...state };

    let favorites = [ ...newState.favorites ];

    if (isFavorite && favorites.indexOf(songId) === -1) {
        favorites = favorites.concat(songId);
    } else if (!isFavorite && favorites.indexOf(songId) !== -1) {
        favorites.splice(favorites.indexOf(songId), 1);
    }

    newState.favorites = favorites;

    return newState;
};