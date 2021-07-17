import { get_all_games } from '../../store/actions/get_games'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { search_games } from '../../store/actions/search_games';
import {} from './index.css'
import { NavLink, useHistory } from 'react-router-dom';
import {} from '../../'
import { get_all_genres } from '../../store/actions/get_genres';

function Getting_all_games () {
  const games = useSelector(state => state.games_all)
  const filtered = useSelector(state => state.games_filtered)
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [value, setValue] = useState('')
  
  var para_ver = 1

  useEffect(() => {
    dispatch(get_all_games());
    dispatch(get_all_genres())
    console.log('loading games and genre...', para_ver++)
  }, [dispatch, para_ver])

  function handleOnChange (e) {
    setValue(e.target.value)
  }

  function handleOnSubmit (e) {
    e.preventDefault();
    dispatch(search_games(value))
  }

  function handleRoute () {
    push('/post_game')
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
          <button className='button_post' onClick={handleRoute}>Post a game</button>
          <div>
            <p>Select by genre</p>
            <select name="nombre" size="3" multiple>
              <option value="valor 1">Texto de opción 1</option>
              <option value="valor 2" selected>Texto de opción 2</option>
              <option value="valor 3">Texto de opción 3</option>
              <option value="valor 4">Texto de opción 4</option>
            </select>
          </div>
          <hr></hr>
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

