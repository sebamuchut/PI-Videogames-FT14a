import { useState } from 'react';
import axios from 'axios'
import { GAME_POST_URL } from '../../constant.js'
import { useDispatch } from 'react-redux';
import { get_all_games } from '../../store/actions/get_games'
import { useHistory } from 'react-router-dom';
import {} from './post_game.css'
import { NavLink } from "react-router-dom"

function Post_game (){
    const dispatch = useDispatch()
    const { push } = useHistory()


    const [form, setForm] = useState({
        name: '',
        description: '',
        released: '',
        rating: ''
    })
    const [newGenre, setNewGenre] = useState([]) //to add new genres
    const [newplatform, setNewPlatform] = useState() //to add new platforms

    const [post, setPost] = useState([
        {id: 1, value: "Adventure", isChecked: false},
        {id: 2, value: "Shooter", isChecked: false},
        {id: 3, value: "Casual", isChecked: false},
        {id: 4, value: "Puzzle", isChecked: false},
        {id: 5, value: "Platformer", isChecked: false},
        {id: 6, value: "Family", isChecked: false},
        {id: 7, value: "RPG", isChecked: false},
        {id: 8, value: "Arcade", isChecked: false},
        {id: 9, value: "Racing", isChecked: false},
        {id: 10, value: "Board Games", isChecked: false},
        {id: 11, value: "Strategy", isChecked: false},
        {id: 12, value: "Massively Multiplayer", isChecked: false},
        {id: 13, value: "Educational", isChecked: false},
        {id: 14, value: "Indie", isChecked: false},
        {id: 15, value: "Fighting", isChecked: false},
        {id: 16, value: "Action", isChecked: false},
        {id: 17, value: "Simulation", isChecked: false},
        {id: 18, value: "Sports", isChecked: false},
        {id: 19, value: "Card", isChecked: false},
    ])
    const [plat, setPlat] = useState([
        {id: 1, value: "PlayStation 1", isChecked: false},
        {id: 2, value: "PlayStation 2", isChecked: false},
        {id: 3, value: "PlayStation 3", isChecked: false},
        {id: 4, value: "PlayStation 4", isChecked: false},
        {id: 5, value: "PlayStation 5", isChecked: false},
        {id: 6, value: "Xbox 360", isChecked: false},
        {id: 7, value: "Xbox One", isChecked: false},
        {id: 8, value: "Xbox Series S/X", isChecked: false},
        {id: 9, value: "Nintendo Switch", isChecked: false},
        {id: 10, value: "PC", isChecked: false},
        {id: 11, value: "macOS", isChecked: false},
        {id: 12, value: "Linux", isChecked: false},
        {id: 13, value: "Android", isChecked: false},
        {id: 14, value: "iOS", isChecked: false}
    ])
    
    function handleAllChecked (event) {
        let newpost = post
        newpost.forEach(el => el.isChecked = event.target.checked) 
        //change every 'isChecked' prop to true
        setPost([...newpost])
      }

   
    function handleCheck (event) {
        let newpost = post
        newpost.forEach(el => {
           if (el.value === event.target.value)
              el.isChecked =  event.target.checked // change to true only selected
        })
        setPost([...newpost])
      }
      function handleAllPlat(event) {
        let newplat = plat
        newplat.forEach(el => el.isChecked = event.target.checked) 
        setPlat([...newplat])
      }

   
    function handlePlat (event) {
        let newplat = plat
        newplat.forEach(el => {
           if (el.value === event.target.value)
              el.isChecked =  event.target.checked
        })
        setPlat([...newplat])
      }

    function HandleinputChange (e) {
        setForm(values => ({
            ...values, [e.target.name]: e.target.value //add name, released, rating, and description
        }))
    }
    

    function handleSubmit (e) {
        //handling genres
        var genre_body = post.filter(el => el.isChecked).map(el => el.value)
        genre_body = genre_body.map(e => [e])
        if(newGenre.length>0) { //if a new genre is typed
            let newGenre_array = newGenre[0].split(',')
            newGenre_array.map(el => [el]).forEach(el => genre_body.push(el))
        }
        //handling platforms
        const platforms = plat.filter(el => el.isChecked).map(el => el.value)
        if(newplatform) { // if a new platform is typed
            let newplatform_array = newplatform.split(',')
            newplatform_array.forEach(el => platforms.push(el))
        }

        const name = form.name;
        var rating = form.rating;
        rating = parseFloat(rating) //typed a string, but I need a floating number
        const released = form.released;
        const description = form.description
        const values = {name, rating, description, released, genre_body, platforms}
        e.preventDefault()
        if(!name){
            alert('You must enter a NAME')
        } else if (!description) {
            alert('You must enter a DESCRIPTION')
        } else if (platforms.length===0) {
            alert('You must enter a PLATFORM')
        } else {
            axios.post(`${GAME_POST_URL}`, values) //do the post passing all the values 
                .then(res => {dispatch(get_all_games());})
                .then(res =>{
                    alert('You submitted a game!')
                    push('/main')
                })
                .catch(error => {
                    alert('Oops! An error has occurred. Maybe that game already exists!')
                })
        }
    }
    function handleNewGenre (e) {
        setNewGenre([e.target.value])
    }
    function handleNewPlatform (e) {
        setNewPlatform(e.target.value)
    }

    return (
        <div className='div_main'>
            <NavLink to='/main' id='linkback_detail' onClick={()=>dispatch(get_all_games())}>Go back!</NavLink>
            <h2>Post a game</h2>
            <p>Complete the form and add a game</p>
            <form id='form_post'autoComplete="off">
                <div className='div_input'>
                    <div >
                        <label>Name: </label>
                            <input
                                type="text" 
                                name="name" 
                                placeholder=' enter name...' 
                                onChange={HandleinputChange}
                            />
                    </div>
                
                    <div>
                        <label>Released: </label>
                            <input
                                type="text" 
                                name="released" 
                                placeholder=' enter released date...' 
                                onChange={HandleinputChange}
                            />
                    </div>
                    <div>
                        <label>Rating: </label>
                            <input
                                type="text" 
                                name="rating" 
                                placeholder=' enter rating...' 
                                onChange={HandleinputChange}
                            />
                    </div>
                <div className='div_description'>
                    <label>Description: </label>
                        <textarea
                            className = 'input_description'
                            type="text" 
                            name="description" 
                            placeholder=' enter description...' 
                            onChange={HandleinputChange}>
                        </textarea>
                </div>
                </div>
                
            </form>
            <div className='check'>
                <h3> Check Genre/s of the game</h3>
                <input type="checkbox"  className='checkbox' onClick={handleAllChecked} value="checkedall" /> Check / Uncheck All
                    <ul>
                         { 
                            post.map((el) => {
                              return ( 
                                <li className='check_list'>
                                    <input 
                                    key={el.id} 
                                    onClick={(event)=>handleCheck(event)} 
                                    type="checkbox" 
                                    checked={el.isChecked} 
                                    value={el.value} /> {el.value}
                                </li>)
                            }) 
                          }
                    </ul>
                    <div>
                        <label>Add new genre/s:</label>
                        <input type='text' autoComplete="off" id='new_item' name='newGenre' placeholder='genre1, genre2...' onChange={handleNewGenre}/>
                    </div>
            </div>
            <div className='check'>
                <h3> Check Platform/s of the game</h3>
                <input type="checkbox"  onClick={handleAllPlat} value="checkedall" /> Check / Uncheck All
                    <ul>
                         { 
                            plat.map((el) => {
                              return ( 
                                <li className='check_list'>
                                    <input 
                                    key={el.id} 
                                    onClick={(event)=>handlePlat(event)} 
                                    type="checkbox" 
                                    checked={el.isChecked} 
                                    value={el.value} /> {el.value}
                                </li>)
                            }) 
                          }
                    </ul>
                    <div>
                        <label>Add new platform/s:</label>
                        <input type='text' autoComplete="off" id='new_item' name='newPlatform' placeholder='platform1, platform2...' onChange={handleNewPlatform}/>
                    </div>
            </div>
            <br></br>
            <div className='div_button'>
              <button type="submit" className='button_add' onClick={handleSubmit}>Add Game!</button>
            </div>
        </div>
)
}

export default Post_game