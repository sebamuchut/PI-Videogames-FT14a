import { GENRES_URL } from '../../constant'
import axios from 'axios'

export const GET_ALL_GENRES = 'GET_ALL_GENRES'

export function get_all_genres () {
    return function(dispatch) {
        return axios.get(`${GENRES_URL}`)
        .then(response => {
            dispatch({ type: GET_ALL_GENRES, payload: response.data });
        })
        .catch(error => {
            if(error.response?.status){
                if(error.response.status === 404){
                    dispatch({ type: GET_ALL_GENRES, payload: null });
                }
            }
        })
    };
}