import axios from "axios";
import {
  gotSongs,
  setAsFavorite
} from "../index";

export const fetchSongs = () => async (dispatch) => {

    try {

        const { data } = await axios.get("/api/songs");

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        dispatch(gotSongs(data, favorites));

    } catch (error) {
        console.error(error);
    } finally {

    }

};

export const setFavoriteStatus = (songId, isFavorite, favorites) => async (dispatch) => {

    try {

        if (isFavorite && favorites.indexOf(songId) === -1) {
            localStorage.setItem('favorites', JSON.stringify(favorites.concat([songId])));
        } else if (!isFavorite && favorites.indexOf(songId) !== -1) {
            localStorage.setItem('favorites', JSON.stringify(favorites.filter((fav) => { return fav !== songId })));
        }

        dispatch(setAsFavorite(songId, isFavorite));

    } catch (error) {
        console.error(error);
    } finally {

    }

};