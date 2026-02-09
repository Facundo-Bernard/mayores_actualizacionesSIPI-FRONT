import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import './BANNER.css';

function BANNER() {
  

  return (
    <>
        <div className="banner-container">
            <div className="banner-content">
                <h1>Bienvenido a la sección de cursos</h1>
                <p>Tu camino de aprendizaje comienza acá, en esta página vas a poder encontrár multiples cursos en los que puedes participar gratuitamente para aprender paso a paso del mundo digital con una perspectiva orientada a gente mayor. Selecciona un curso y comienza a aprender (tu progreso se guardará)!</p>
                <p> ¿Quieres subscribirte a nuestro servicio Black y disfrutar de todos los cursos y otros beneficios? Haz click abajo</p>
                <p>(multiples cursos son gratuitos)</p>
                <div className="text-center mt-3">
                        <Link to={"/paginablack"} className="btn btn-primary">
                            Ver subscripcion Black
                        </Link>
                    </div>
            </div>
        </div>

    </>
  );
}
export default BANNER;
