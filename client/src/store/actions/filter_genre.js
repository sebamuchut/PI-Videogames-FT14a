import { FIND_GENRES_URL } from '../../constant'
import axios from 'axios'

export const FILTER_GENRE = 'FILTER_GENRE'

export function find_genre () {
    return function(dispatch) {
        return axios.get(`${FIND_GENRES_URL}`)
        .then(response => {
            dispatch({ type: FILTER_GENRE, payload: response.data });
        })
        .catch(error => {
            if(error.response?.status){
                if(error.response.status === 404){
                    dispatch({ type: FILTER_GENRE, payload: null });
                }
            }
        })
    };
}