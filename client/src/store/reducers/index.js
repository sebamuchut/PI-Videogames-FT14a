import { GET_ALL_GAMES } from "../actions/get_games";
import { SEARCH_GAMES } from "../actions/search_games";
import { FILTER_GENRE } from "../actions/filter_genre"

const initialState = {
    games_all: [],
    games_filtered: undefined,
    genres_all : []
}

function reducers (state = initialState, action) {
    switch(action.type){
        case GET_ALL_GAMES:
            return {
                ...state, games_all: action.payload
            }
        case SEARCH_GAMES:
            return {
                ...state, games_filtered: action.payload
            }
        case FILTER_GENRE:
            return {
                ...state, genres_all: action.payload
            }
        default:{
            return {...state}
        }
            
    }
}

export default reducers;