import { GAMES_ALL_URL } from '../../constant'
import axios from 'axios'

export const GET_ALL_GAMES = 'GET_ALL_GAMES'

export function get_all_games () {
    return function(dispatch) {
        return axios.get(`${GAMES_ALL_URL}`)
        .then(response => {
            dispatch({ type: GET_ALL_GAMES, payload: response.data });
        })
        .catch(error => {
            if(error.response?.status){
                if(error.response.status === 404){
                    dispatch({ type: GET_ALL_GAMES, payload: null });
                }
            }
        })
    };
}