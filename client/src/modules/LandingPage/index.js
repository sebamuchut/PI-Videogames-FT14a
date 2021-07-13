import { NavLink } from 'react-router-dom';


export default function LandingPage () {
    return (
        <div>
            <h1>Pagina inicial: deben armar una landing page con</h1>
            <h3>Alguna imagen de fondo representativa al proyecto</h3>
            <NavLink to= '/main'>
            <h3>Botón para ingresar al home (Ruta principal)</h3>
            </NavLink>
        </div>
    )
}

