import { GAMES_SEARCH_URL } from '../../constant'
import axios from 'axios'

export const SEARCH_GAMES = 'SEARCH_GAMES'

export function search_games (name) {
    return (dispatch) => {
        return axios.get(GAMES_SEARCH_URL + name)
        .then(response => {
            console.log(response.data)
            dispatch({ type: SEARCH_GAMES, payload: response.data });
        })
        .catch(error => {
            if(error.response?.status){
                if(error.response.status === 404){
                    dispatch({ type: SEARCH_GAMES, payload: null });
                }
            }
        })
    };
}