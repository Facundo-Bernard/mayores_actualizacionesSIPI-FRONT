import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CURSOEJEMPLO.css';

function CURSOEJEMPLO() {
  const user = useSelector((state) => state.user); //agarra variable usuario del estado global
  const navigate = useNavigate(); // necesario para usar navigate
  const [progressCreated, setProgressCreated] = useState(false);

  // codigo para moverse a la siguiente pagina y crear progreso
  const handleNextStage = async () => {
    if (!progressCreated && user && user.id) { // verifica si hay usuario
      try {
        // hace un fetch (agarra del back) para ver si  ya se creo progreso
        const response = await fetch(`http://localhost:8080/progreso/obtenerUsuario/${user.id}`);
        const progressData = await response.json();

        // revisa si el curso especifico ya se creo 
        //(recordar que todos los cursos tienen un id especifico que determina de que curso se trata)
        const existingCourse = progressData.find((curso) => curso.cursoId === 3);

        if (!existingCourse) {
          // Crea el progreso de un curso especifico para un usuario especifico
          await fetch('http://localhost:8080/progreso/crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              usuario: user, // guarda user entero dentro de la tabla del progreso
              progreso: 1, // cuanto progresa, modificar en base a que pagina sea
              completado: false, // marcar como true cuando se complete
              examenPuntos: 0, // poner puntos cuando sea la pagina de examen
              cursoId: 3, // id del curso, en este caso 3
            }),
          });
          console.log('Progreso creado exitosamente');
          setProgressCreated(true); 
        } else {
          console.log('El usuario ya tiene progreso en este curso');
        }
      } catch (error) {
        console.error('Error al verificar o crear progreso', error);
      }
    }
    
    // Navega hacia la proxima pagina
    // recordar que para que esto funcione las paginas deben estar enrutadas en app
    navigate('/curso3-2');
  };

  return (

    // reutilizar todos estos componentes de html a como sea necesario
    <div className="curso-outer-container">
      <div className="curso-inner-container">
        <header className="curso-header text-center">
          <h1 className="display-4 animate__animated animate__fadeIn">Bienvenido al Curso de Desarrollo Web</h1>
          <p className="lead animate__animated animate__fadeIn">
            Aprende a crear sitios web modernos y atractivos con HTML, CSS y JavaScript
          </p>
        </header>

        <div className="curso-content animate__animated animate__fadeIn">
          <div className="curso-image-container text-center">
            <img src="https://diarioelcentro.cl/wp-content/uploads/2023/05/brechadigital.jpeg" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
          </div>

          <div className="curso-info-cards row my-4">
            <div className="col-md-4">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>HTML</h3>
                <p>Aprende los fundamentos del marcado y estructura de páginas web.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>CSS</h3>
                <p>Domina el arte de estilizar tus sitios web con CSS3 y diseño responsivo.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>JavaScript</h3>
                <p>Agrega interactividad y funcionalidad avanzada a tus páginas web.</p>
              </div>
            </div>
          </div>

          <div className="curso-extra-info my-5 p-4 bg-light text-center rounded shadow-sm animate__animated animate__fadeInUp">
            <h2>¿Por qué tomar este curso?</h2>
            <p className="mt-3">
              Este curso está diseñado para cualquier persona interesada en aprender a construir sitios web desde cero. 
            </p>
          </div>

          <div className="curso-texto-educativo my-5 p-4 bg-light rounded shadow-sm">
            <h3>Profundizando en HTML y CSS</h3>
            <p>
              HTML y CSS son los pilares de la web. Aprenderás desde cómo estructurar un documento HTML hasta técnicas avanzadas de diseño con CSS.
            </p>
          </div>

          <div className="curso-resources my-5 text-center">
            <h3>Recursos adicionales</h3>
            <p>Estos recursos complementarán tu aprendizaje:</p>
            <ul className="list-unstyled">
              <li><a href="#" className="text-primary">Documentación oficial de HTML5</a></li>
              <li><a href="#" className="text-primary">Guía completa de CSS3</a></li>
              <li><a href="#" className="text-primary">Introducción a JavaScript</a></li>
            </ul>
          </div>

          <div className="botoncurso text-center mt-3">
            <button onClick={handleNextStage} className="btn btn-primary">Siguiente módulo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CURSOEJEMPLO;
