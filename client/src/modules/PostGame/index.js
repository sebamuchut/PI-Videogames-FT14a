import { useState } from 'react';
import axios from 'axios'
import { GAME_POST_URL } from '../../constant.js'
import { useDispatch } from 'react-redux';
import { get_all_games } from '../../store/actions/get_games'
import { useHistory } from 'react-router-dom';
import {} from './post_game.css'
import { NavLink } from "react-router-dom"

// import CheckBox from './checkbox';

/**[ ] Un formulario controlado con los siguientes campos
Nombre
Descripción
Fecha de lanzamiento
Rating
[ ] Posibilidad de seleccionar/agregar varios géneros
[ ] Posibilidad de seleccionar/agregar varias plataformas
[ ] Botón/Opción para crear un nuevo videojuego */

function Post_game (){
    const dispatch = useDispatch()
    const { push } = useHistory()


    const [form, setForm] = useState({
        name: '',
        description: '',
        released: '',
        rating: ''
    })
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
        setPost([...newpost])
      }

   
    function handleCheck (event) {
        let newpost = post
        newpost.forEach(el => {
           if (el.value === event.target.value)
              el.isChecked =  event.target.checked
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
            ...values, [e.target.name]: e.target.value
        }))
    }
    
    
    function handleSubmit (e) {
        var genre_body = post.filter(el => el.isChecked).map(el => el.value)
        genre_body = genre_body.map(e => [e])
        const platforms = plat.filter(el => el.isChecked).map(el => el.value)
        const name = form.name;
        var rating = form.rating;
        console.log(typeof(rating))
        rating = parseInt(rating);
        console.log(typeof(rating))
        const released = form.released;
        const description = form.description
        const values = {name, rating, description, released, genre_body, platforms}
        e.preventDefault()
        
        // const arr = []
        // axios.post(`${GAME_POST_URL}`, values)

        axios.post(`${GAME_POST_URL}`, values)
                            .then(res => {dispatch(get_all_games());})
                            .then(res =>{
                                alert('You submitted a game!')
                                push('/main')
                            })
                            .catch(error => {
                                alert('Oops! An error has occurred')
                            })

    }


    return (
        <div className='div_main'>
            <NavLink to='/main' className='link'>Go back!</NavLink>
            <form className='form'>
                <div className='div_input'>
                    <div >
                        <label>Name: </label>
                            <input
                                type="text" 
                                name="name" 
                                placeholder='enter name...' 
                                onChange={HandleinputChange}
                            />
                    </div>
                
                    <div>
                        <label>Released: </label>
                            <input
                                type="text" 
                                name="released" 
                                placeholder='enter released date...' 
                                onChange={HandleinputChange}
                            />
                    </div>
                    <div>
                        <label>Rating: </label>
                            <input
                                type="number" 
                                name="rating" 
                                placeholder='enter rating...' 
                                // value={input.username}  
                                // onChange={}
                                // className=
                            />
                    </div>
                </div>
                <br></br>
                <div className='div_description'>
                    <label>Description: </label>
                        <input
                            className = 'input_description'
                            type="text" 
                            name="description" 
                            placeholder='enter description...' 
                            onChange={HandleinputChange}
                        />
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
            </div>
            <div className='div_button'>
              <button type="submit" className='button_add' onClick={handleSubmit}>ADD GAME</button>
            </div>
        </div>
)
}

export default Post_game