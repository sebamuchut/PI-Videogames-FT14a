import { get_all_games } from '../../store/actions/get_games'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { search_games } from '../../store/actions/search_games';
import {} from './index.css'
import { NavLink } from 'react-router-dom';

function Getting_all_games () {
  const games = useSelector(state => state.games_all)
  const filtered = useSelector(state => state.games_filtered)
  const dispatch = useDispatch()

  const [value, setValue] = useState('')
  
  var para_ver = 1

  useEffect(() => {
    dispatch(get_all_games());
    console.log('pasa por useEffect', para_ver++)
  }, [dispatch, para_ver])

  function handleOnChange (e) {
    setValue(e.target.value)
  }
  function handleOnSubmit (e) {
    e.preventDefault();
    dispatch(search_games(value))
  }

    
    return (
        <div>
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              placeholder="Game..."
              value={value}    
              onChange={handleOnChange}
            />
            <input type="submit" value="Search" />
          </form>
          {
            filtered ? <> 
              {filtered.map(el => {
                return (
                  <div className='card'>
                  <img src = {el.background_image} className = 'img' alt= '' />,
                  <NavLink to={ `./videogames/${el.id}`}>
                  <h4>{el.name}</h4>
                  </NavLink>,
                  <p>{'Genres: ' + el.genres.map(el => ' ' + el.name)}</p>
                  <p>{'Platforms: ' + el.platforms.join(', ')}</p>
                  <p>key: {el.id}</p>
                  
                  </div>
                )
              })}
            </> : filtered === undefined ? 
            <>
            {games.map((el) =>{
              return (
                <>
                  <img src = {el.background_image} className = 'img' alt= '' />,
                  <NavLink to={ `./videogames/${el.id}`}>
                  <h4>{el.name}</h4>
                  </NavLink>
                  <p>key: {el.id}</p>
                </>
              )
            })}
          </> : ( 
            <div>
              <h4>Sorry, game not found...</h4>,
              <button onClick={()=> window.location.reload()}>Go back</button>
            </div>
          )
          }
        </div>
    )
   

}

export default Getting_all_games;

