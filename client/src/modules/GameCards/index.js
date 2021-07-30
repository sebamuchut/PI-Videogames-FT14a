import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { search_games } from '../../store/actions/search_games';
import {} from './index.css'
import { NavLink, useHistory } from 'react-router-dom';
import { clear_filtered } from '../../store/actions/clear_filtered';
import { find_genre } from '../../store/actions/filter_genre';

function Getting_all_games () {
  const games = useSelector(state => state.games_all) //bring global state 'games_all' 
  const filtered = useSelector(state => state.games_filtered) //bring gloabal state 'games_filtered'. In this state a collect searched games
  const genres = useSelector(state => state.genres_all) //bring global state 'genres_all'
  const dispatch = useDispatch() //to trigger a state change
  const { push } = useHistory() //to redirect to another route

  useEffect(() => {
    dispatch(find_genre()) //to use the selector of genres
  }, [])


  if(!games) push('/')

  const [value, setValue] = useState('') //to handle search function
  const [filter, setFilter] = useState('') //filter by genre
  const [created, setCreated] = useState('') //to store created games

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const [buttons, setButtons] = useState(false)
  //pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  
  var currentGames; //it will render the games


  if(filter) {
    games.forEach(el=> el.genres.map(e => {if (Array.isArray(e.name)){
      e.name=e.name[0] //something that I should fix in the back-end
    }}))
    var filtered_games_bygenre = [] //to store the games filtered by genre
    games.map(el => el.genres.map(e => {if (e.name ===filter) filtered_games_bygenre.push(el)}))
      currentGames = filtered_games_bygenre.slice(indexOfFirstGame, indexOfLastGame)
  } else if(buttons) {
    //if no genre is selected, dispay all games
    currentGames = games.slice(indexOfFirstGame, indexOfLastGame)
    setButtons(false)
  } else {
    //if no genre is selected, dispay all games
    currentGames = games.slice(indexOfFirstGame, indexOfLastGame)
  }

  
  
  

//Change page
const paginate = (number) => {setCurrentPage(number)}
//pagination function
function pagination () {
  const pageNumbers = [];
  let number_of_cards;
  if(created){
    number_of_cards = created
  }else if(filtered){
    number_of_cards=filtered
  }else if(filtered_games_bygenre){
    number_of_cards=filtered_games_bygenre
  }else{
    number_of_cards=games
  }

  //create page numbers
  for(let i=1; i <= Math.ceil(number_of_cards.length / gamesPerPage); i++){
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
    if(e.target.value === ''){ //clear the state 'filtered' when noothing is written
      dispatch(clear_filtered())
    }
  }

  function handleOnSubmit (e) {
    e.preventDefault();
    dispatch(search_games(value)) //trigger search function when clicked
  }

  function handleRoute () {
    push('/post_game') //redirect to '/post_game' route when clicked
    dispatch(clear_filtered())
  }

  function handleSelect () {
    setCurrentPage(1)
    var select = document.getElementById("select");
    if(select.options[select.selectedIndex].value === 'none'){
      setFilter('') //clear filter of genre en 'All genres' is selected 
    } else {
      setFilter(select.options[select.selectedIndex].value) //add the selected genre into local state 'filter'
      dispatch(clear_filtered())
    }
    setCreated('')
    dispatch(clear_filtered())
    
  }

  function handleCreated () {
    var created_games = games.filter(el => el.id.length > 8) //I know created games own UUID as 'id'
    if(created_games.length>0){
      setCreated(created_games) //add created games to local state 'created'
      setFilter('')

    }
  }

  function handleA_Z () {
    dispatch(clear_filtered())
    setCreated('')
    setFilter('')
    games.sort((a,b) => a.name.localeCompare(b.name))
    setButtons(true)
    setCurrentPage(1)
  }
  function handleZ_A () {
    dispatch(clear_filtered())
    setCreated('')
    setFilter('')
    games.sort((a,b) => b.name.localeCompare(a.name))
    setButtons(true)
    setCurrentPage(1)
  }
  function handle_rating_down () {
    dispatch(clear_filtered())
    setCreated('')
    setFilter('')
    games.sort((a,b) => a.rating - b.rating)
    setButtons(true)
    setCurrentPage(1)
  }
  function handle_rating_up () {
    dispatch(clear_filtered())
    setCreated('')
    setFilter('')
    games.sort((a,b) => b.rating - a.rating)
    setButtons(true)
    setCurrentPage(1)
  }

    
    return (
        <div className='bar_mother'>
          <h3 className='title_main'>Videogames Database</h3>
          <div className='bar'>
            <form id='form_gamecard' onSubmit={handleOnSubmit}>
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
                  <option id='none' value='none'>All genres</option>
                  <option value="" disabled selected hidden>Filter by genre</option>
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
             filtered ? 
             <div className= 'cards'> 
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
          </div>
          : filtered === undefined && !filter ? 
            <div className='cards'>
              { 
              currentGames?.map((el) =>{
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
          <hr></hr>
          {pagination()}
        </div>
    )
   

}

export default Getting_all_games;

