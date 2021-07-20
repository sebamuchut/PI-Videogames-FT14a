import { get_all_games } from '../../store/actions/get_games'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { search_games } from '../../store/actions/search_games';
import {} from './index.css'
import { NavLink, useHistory } from 'react-router-dom';
import { clear_filtered } from '../../store/actions/clear_filtered';
import { find_genre } from '../../store/actions/filter_genre';
import { order_AZ } from '../../store/actions/order';

function Getting_all_games () {
  const games = useSelector(state => state.games_all)
  const filtered = useSelector(state => state.games_filtered)
  const genres = useSelector(state => state.genres_all)
  const dispatch = useDispatch()
  const { push } = useHistory()


  const [value, setValue] = useState('')
  const [filter, setFilter] = useState('')
  const [created, setCreated] = useState('')
  const [games_local, setGames_local] = useState()

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  //pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  var currentGames 
  if(filter) {
    games.forEach(el=> el.genres.map(e => {if (Array.isArray(e.name)){
      e.name=e.name[0]
    }}))
    let filtered_games_bygenre = []
    games.map(el => el.genres.map(e => {if (e.name ===filter) filtered_games_bygenre.push(el)}))
        currentGames = filtered_games_bygenre.slice(indexOfFirstGame, indexOfLastGame)
  } else {
    currentGames = games.slice(indexOfFirstGame, indexOfLastGame)
  }
  
  var para_ver = 1
  useEffect(() => {
    // dispatch(get_all_games());
    // dispatch(get_all_genres())
    dispatch(find_genre())
    console.log('genres filter...', para_ver++)
  }, [])

//Change page
const paginate = (number) => {setCurrentPage(number)}
//pagination function
function pagination () {
  const pageNumbers = [];
  for(let i=1; i <= Math.ceil(games.length / gamesPerPage); i++){
    pageNumbers.push(i)
  }
  return(
  <nav>
    <ul className = 'paginate_list'>
      {pageNumbers.map(number=> {
        return(
        <li key={number} className='page_number'>
          <a onClick={() => paginate(number)} href = '#' className='button_paginate' >
          {number}
          </a>
        </li>)
      })}
    </ul>
 </nav>
  )
}
  
  function handleOnChange (e) {
    setValue(e.target.value)
    if(e.target.value === ''){
      dispatch(clear_filtered())
    }
  }

  function handleOnSubmit (e) {
    e.preventDefault();
    dispatch(search_games(value))
  }

  function handleRoute () {
    push('/post_game')
    dispatch(clear_filtered())
  }

  function handleSelect () {
    var select = document.getElementById("select");
    dispatch(clear_filtered())
    setCreated('')
    if(select.options[select.selectedIndex].value === 'none'){
      setFilter('')
    } else {
      setFilter(select.options[select.selectedIndex].value)
      dispatch(clear_filtered())
    }
    setCurrentPage(1)
    
  }

  function handleCreated () {
    var created_games = games.filter(el => el.id.length > 8)
    setCreated(created_games)
    // setFilter('')
  }

  function handleA_Z () {
    games.sort((a,b) => a.name.localeCompare(b.name))
  }
  function handleZ_A () {
    games.sort((a,b) => b.name.localeCompare(a.name))
  }
  function handle_rating_down () {
    games.sort((a,b) => a.rating - b.rating)
  }
  function handle_rating_up () {
    games.sort((a,b) => b.rating - a.rating)
  }
    
    return (
        <div className='bar_mother'>
          <h3 className='title_main'>Videogames Database</h3>
          <div className='bar'>
            <form  onSubmit={handleOnSubmit}>
              <input
                type="text"
                placeholder="Game..."
                value={value}    
                onChange={handleOnChange}
              />
              <input type="submit" value="Search" />
            </form>
            <div>
            <button className='button' onClick={handleRoute}>Post a game</button>
            </div>
            <div>
              <button className = 'button' onClick = {handleCreated}>My posted games!</button>
            </div>
            <div className = 'select_div'>
              <select  id = "select" name="select" size="1" onClick={handleSelect} >
                {genres.map(el => {
                  return (
                    <option id={el.id} value={el.name[0]}>{el.name[0]}</option>
                    )
                  })}
                  <option id='none' value='none'>All games</option>
              </select>
            </div>
            <div>
              <button className = 'button' onClick = {handleA_Z}>A-Z</button>
              <button className = 'button' onClick = {handleZ_A}>Z-A</button>
              <button className = 'button' onClick = {handle_rating_down}>Rating &#8593;</button>
              <button className = 'button' onClick = {handle_rating_up}>Rating &#8595;</button>
            </div>
          </div>
          {pagination()}

          <hr></hr>
          
          {
             filtered ? <div className= 'cards'> 
              {filtered.map(el => {
                return (
                  <div key = {el.id}className= 'card'>
                    <img src = {el.background_image} className = 'game_pic' alt= 'game pic' />,
                    <NavLink  to={ `./videogames/${el.id}`} className='link'>
                      <h4>{el.name}</h4>
                    </NavLink>
                    <p>{'Genres: ' + el.genres.map(el => ' ' + el.name)}</p>
                    {/* <p>{'Platforms: ' + el.platforms.join(', ')}</p> */}
                  
                  </div>
                )
              })}
              </div> :  filtered === undefined && filter ? 
              
          <div className= 'cards'>
          
          { 
            currentGames.map(el => {
              return (
                      <ul key = {el.id} className = 'card'>
                        <img src = {el.background_image} className = 'game_pic' alt= 'game pic' />,
                        <NavLink to={ `./videogames/${el.id}`} className='link'>
                        <h4>{el.name}</h4>
                        </NavLink>
                        <p>Genres: {el.genres.map(el => ' - ' + el.name)} </p>
                      </ul>
                    )
            })
      
          }
                    
          </div> : created ?
          <div className = 'cards'>
            {
              created.map(el => {
                return (
                  <ul className = 'card' key = {el.id}>
                    <img src = {el.background_image} className = 'game_pic' alt= 'game pic' />,
                    <NavLink to={ `./videogames/${el.id}`} className='link'>
                    <h4>{el.name}</h4>
                    </NavLink>
                    <p>Genres: {el.genres.map(el => ' - ' + el.name)} </p>
                  </ul>
                )
              })
            }
          
          </div> : filtered === undefined && !filter ? 
            <div className='cards'>
              {currentGames.map((el) =>{
                return (
                  <ul className = 'card' key = {el.id}>
                    <img src = {el.background_image} className = 'game_pic' alt= 'game pic' />,
                    <NavLink to={ `./videogames/${el.id}`} className='link'>
                    <h4>{el.name}</h4>
                    </NavLink>
                    <p>Genres: {el.genres.map(el => ' - ' + el.name)} </p>
                  </ul>
                )
              })
              }
          </div>  : ( 
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

