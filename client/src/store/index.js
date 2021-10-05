import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import { filterByALL, setFavorite, setInitialState } from "./utils/reducerFunctions";

// ACTIONS
const GET_SONGS = "GET_SONGS",
        FILTER = "FILTER",
        SET_FAVORITE = "SET_FAVORITE";

// ACTION CREATORS
export const gotSongs = (data, favorites) => {

    return {
        type: GET_SONGS,
        payload: { data, favorites }
    };
};

export const filter = (change) => {

    return {
        type: FILTER,
        payload: change,
    };
};


export const setAsFavorite = (songId, isFavorite) => {

    return {
        type: SET_FAVORITE,
        payload: { songId, isFavorite},
    };
};

// REDUCER
const reducer = (state = [], action) => {
    switch (action.type) {
        case GET_SONGS:
            return setInitialState(state, action.payload);
        case FILTER:
            return filterByALL(state, action.payload);
        case SET_FAVORITE:
            return setFavorite(state, action.payload);
        default:
            return state;
    }
};

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
