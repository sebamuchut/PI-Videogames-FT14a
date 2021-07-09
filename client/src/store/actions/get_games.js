import { BASE_URL, GAMES_ALL_URL } from '../../constant'
import axios from 'axios'

export const GET_ALL_GAMES = 'GET_ALL_GAMES'

export function get_all_games () {
    return function(dispatch) {
        return axios.get(`${BASE_URL}${GAMES_ALL_URL}`)
        .then(response => {
            console.log('response.data: ', response.data)
            dispatch({ type: GET_ALL_GAMES, payload: response.data });
        });
    };
}