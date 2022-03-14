import axios from "axios";

export function getVideogames() {
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function getId(id) {
    return async (dispatch) => {
        let json = await axios.get(`http://localhost:3001/videogames/${id}`);
        return dispatch({
            type: 'GET_ID',
            payload: json.data
        })
    }
}

export function getNameGames(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames?name=" + name);
            return dispatch({
                type: 'GET_NAME_GAMES',
                payload: json.data
            })
        }catch(error) {
            console.log(error)
        }
    }
}

export function filterCreated(payload) {
  
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function genreFiltered(payload) {
    console.log(payload)
    return {
        type: 'GENRE_FILTERED',
        payload
    }
}

export function getGenre() {
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/genre");
        return dispatch({
            type: 'GET_GENRE',
            payload: json.data  
        })
    }
}

export function getPlatforms() {
    return async function(dispatch) {
        var json = await axios.get("http://localhost:3001/platforms");
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: json.data  
        })
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function postGame(payload) {
    return async function() {
        const response = await axios.post("http://localhost:3001/videogame", payload);
        return response;
    }
}