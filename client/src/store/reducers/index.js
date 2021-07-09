import { GET_ALL_GAMES } from "../actions/get_games";

const initialState = {
    games_all: [],
    games_filtered: []
}

function reducers (state = initialState, action) {
    switch(action.type){
        case GET_ALL_GAMES:
            return {
                ...state, games_all: action.payload
            }
        default:{
            return {...state}
        }
            
    }
}

export default reducers;