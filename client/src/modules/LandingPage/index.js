import { NavLink } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_all_games } from '../../store/actions/get_games';
import { get_all_genres } from '../../store/actions/get_genres';
import {} from './Landing_page.css'
import game from './game.gif'


export default function LandingPage () {
    //with useSelector I can work with global state 'games_all' (store)
    const games = useSelector(state => state.games_all) 
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_all_games()); //Load 100 games from API into global state 'games_all'
        dispatch(get_all_genres()) //Load genres from API into database
        console.log('loading games and genres...')
        }, [])
    return (
        <div className = 'main_div'>
            <h1 className= 'title'>Videogames Database</h1>
            
                {
                    games.length > 0 ? //While state is empty, render the loading gif
                    (
                        <NavLink className='link' to= '/main'>
                            <h3>Enter website</h3>
                        </NavLink>
                    ) : 
                    (
                        <div>
                            <img className = 'gif' src = {game} alt='loading...'/>
                            <h3 className='link'>Loading games...</h3>
                         </div>
                         
                         )
                        }
           
        </div>
    )
}

