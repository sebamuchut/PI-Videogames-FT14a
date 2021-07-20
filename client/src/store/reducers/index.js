import { GET_ALL_GAMES } from "../actions/get_games";
import { SEARCH_GAMES } from "../actions/search_games";
import { FILTER_GENRE } from "../actions/filter_genre"
import { ORDER_AZ } from "../actions/order.js"
import { CLEAR_FILTERED } from '../actions/clear_filtered'

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
        case CLEAR_FILTERED:
            return {
                ...state, games_filtered: undefined
            }
        case ORDER_AZ:
            return {
                ...state, games_all: state.games_all.sort((a,b) => a.name.localeCompare(b.name))
            }
        default:{
            return {...state}
        }
            
    }
}

export default reducers;