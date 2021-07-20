import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import axios from 'axios'
import { GAMES_ALL_URL } from '../../constant'
import { } from './DetailPage.css'
import { NavLink } from "react-router-dom"
/**[ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
[ ] Descripción
[ ] Fecha de lanzamiento
[ ] Rating
[ ] Plataformas */

function Show_detail({id}) {


    const [detail, setDetail] = useState({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: '',
        genres: [],
        platforms: ''
    })
    const dispatch = useDispatch()
    
    function get_detail(id){
       

        return function(){


            axios.get(GAMES_ALL_URL + '/' + id)
            .then(response =>{
                if(!response.data.genre) {
                    response.data.genre = response.data.genres
                }
                if(!response.data.platform) {
                    response.data.platform = response.data.platforms
                }
                setDetail({
                    name: response.data.name,
                    image: response.data.background_image,
                    description: response.data.description,
                    released: response.data.released,
                    rating: response.data.rating,
                    genres: response.data.genre.map(el=> ' - ' + el.name),
                    platforms: response.data.platform.map(el=> ' - ' + el)
                    
                })
            })
        }
    }
    
    
    useEffect (() =>{
        dispatch(get_detail(id))
    }, []) 
    
    if(!id) return <div>no game detail! something went wrong!</div>
    return (
        <div className='main_div'>
            <h1 >{detail.name}</h1>
            <img src={detail.image} className='img' alt='game'/>
            <div className='detail_div'>
                <p>{detail.description}</p>
                <p>Released: {detail.released}</p>
                <p>Rating: {detail.rating}</p>
                <p>Genres: {detail.genres}</p>
                <p>Platforms: {detail.platforms}</p>
            </div>
            <NavLink to='/main' className='link'>Go back!</NavLink>
        </div>

    )
}

export default Show_detail