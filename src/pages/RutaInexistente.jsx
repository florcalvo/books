import Navbar from '../componentes/navbar/Navbar';
import NonExistentRoute from '../componentes/NonExistentRoute';
import Footer from '../componentes/footer/Footer';
import image from "../assets/pngwing.com.png"
import { Link } from "react-router-dom";
import  '../componentes/NonExistentRoute.css';

const RutaInexistente = () => {
    return (
        <div>
            <Navbar></Navbar>
            <NonExistentRoute></NonExistentRoute>
            <img src={image} className='imagen-error'style={{ width: '300px', display: 'block', margin: '0 auto'  }}></img>
            <Link to="/" className='botones-paginacion'>
            <button>Ir a la página principal</button>
            </Link>
            <Footer/>
        </div>
    )
}

export default RutaInexistente