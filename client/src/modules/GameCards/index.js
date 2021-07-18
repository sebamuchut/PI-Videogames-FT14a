import { get_all_games } from '../../store/actions/get_games'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { search_games } from '../../store/actions/search_games';
import {} from './index.css'
import { NavLink, useHistory } from 'react-router-dom';
import { get_all_genres } from '../../store/actions/get_genres';
import { find_genre } from '../../store/actions/filter_genre';

function Getting_all_games () {
  const games = useSelector(state => state.games_all)
  const filtered = useSelector(state => state.games_filtered)
  const genres = useSelector(state => state.genres_all)
  const dispatch = useDispatch()
  const { push } = useHistory()

  const [value, setValue] = useState('')
  const [filter, setFilter] = useState('')
  
  var para_ver = 1
  
  useEffect(() => {
    dispatch(get_all_games());
    dispatch(get_all_genres())
    dispatch(find_genre())
    console.log('loading games and genre...', para_ver++)
  }, [dispatch, para_ver])
  
//  console.log('esto es genres: ', genres)
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

  function handleSelect () {
    var select = document.getElementById("select");
    setFilter(select.options[select.selectedIndex].value)
  }

  console.log('filter es: ', filter)
  console.log('games es: ', games)
  // console.log(typeof(games[0].genres[0].name))

  // console.log(Array.isArray(games))
  // console.log(Array.isArray(games[0].genres))
  var arr;
    
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
            <select id = 'select' name="select" size="4" onClick={handleSelect} simple>
              {genres.map(el => {
                return (
                  <option value={el.name[0]}>{el.name[0]}</option>
                )
              })}
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
            </> : filtered === undefined && !filter ? 
            <>
              {games.map((el) =>{
                return (
                  <>
                    <img src = {el.background_image} className = 'img' alt= '' />,
                    <NavLink to={ `./videogames/${el.id}`}>
                    <h4>{el.name}</h4>
                    </NavLink>
                    <p>Genres: {el.genres.map(el => ' - ' + el.name)} </p>
                  </>
                )
              })}
          </> :  filtered === undefined && filter ? 
          <>
          
          { games.map(el => el.genres.map(e => {
            if(e.name === filter){
              return (
                <>
                  <img src = {el.background_image} className = 'img' alt= '' />,
                  <NavLink to={ `./videogames/${el.id}`}>
                  <h4>{el.name}</h4>
                  </NavLink>
                  <p>Genres: {el.genres.map(el => ' - ' + el.name)} </p>
                </>
              )
          
          }}))
            
            
             
            
          }
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

