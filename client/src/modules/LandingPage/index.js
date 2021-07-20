import { NavLink } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_all_games } from '../../store/actions/get_games';
import { get_all_genres } from '../../store/actions/get_genres';
import {} from './Landing_page.css'


export default function LandingPage () {
    const games = useSelector(state => state.games_all) 
    const dispatch = useDispatch()

    var to_check = 1
    useEffect(() => {
        dispatch(get_all_games());
        dispatch(get_all_genres())
        console.log('loading games and genres...', to_check++)
        }, [])
    return (
        <div className = 'main_div'>
            <h1 className= 'title'>Videogames Database</h1>
            
                {
                    games.length > 0 ? 
                     (
                        <NavLink className='link' to= '/main'>
                            <h3>Enter website</h3>
                        </NavLink>
                    ) : 
                     (
                        <h3>Loading games...</h3>
                    )
                }
           
        </div>
    )
}

