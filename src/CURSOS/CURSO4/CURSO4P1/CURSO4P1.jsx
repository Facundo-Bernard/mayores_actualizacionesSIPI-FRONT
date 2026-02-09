import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CURSOEJEMPLO.css';

function CURSO4P1() {
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
        const existingCourse = progressData.find((curso) => curso.cursoId === 4);

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
              cursoId: 4, // id del curso, en este caso 3
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
    navigate('/curso4-2');
  };

  const handleInicio = () => {
    navigate("/pagina-principal")
  }

  return (

    // reutilizar todos estos componentes de html a como sea necesario
    <div className="curso-outer-container">
    <div className="curso-inner-container">
      <header className="curso-header text-center">
        <h1 className="display-4 animate__animated animate__fadeIn">Bienvenido al Curso de Manejo de Tramites Digitales.</h1>
        <p className="lead animate__animated animate__fadeIn">
          Aprenda a manejarse virtualmente en lo que necesite!
        </p>
      </header>

      <div className="curso-content animate__animated animate__fadeIn">
        <div className="curso-image-container text-center">
          <img src="https://diarioelcentro.cl/wp-content/uploads/2023/05/brechadigital.jpeg" 
          alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
        </div>

        <div className="curso-info-cards row my-4">
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 1: Introducción a los Trámites Digitales.
              </h3>
              <p>En este primer módulo, aprenderemos qué son los trámites digitales y por qué son importantes en la vida cotidiana. Los trámites digitales son aquellos que realizamos a través de internet para completar o gestionar distintos procedimientos, sin necesidad de acudir personalmente a una oficina o establecimiento. En la actualidad, existen múltiples trámites que pueden hacerse en línea, desde solicitar un turno médico, gestionar el pago de servicios, hasta realizar transacciones bancarias. Los trámites digitales son útiles porque nos permiten ahorrar tiempo, reducir desplazamientos y completar procesos desde la comodidad de nuestro hogar, lo cual es especialmente conveniente para personas que pueden tener dificultades para moverse. Entender el alcance de estos trámites y cómo funcionan los portales de servicios digitales nos facilitará la vida y nos dará más independencia en la gestión de nuestras actividades diarias. A lo largo de este curso, iremos explorando las distintas áreas en las que los trámites digitales pueden ser de gran ayuda.</p>
            </div>
          </div>
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 2: Navegación Básica en Portales y Aplicaciones.</h3>
              <p>Para acceder a los trámites digitales, es necesario comprender primero cómo ingresar y navegar en los portales y aplicaciones donde se encuentran estos servicios. Empezaremos con los sitios web a los que podemos acceder usando un navegador de internet, como Google Chrome o Safari. Para comenzar, abrimos el navegador e ingresamos la dirección web del portal donde queremos hacer el trámite, como el sitio de un banco, un hospital o una entidad pública. Al escribir la dirección y presionar "Enter", nos llevará a la página principal del portal. Es común que estas páginas tengan un menú principal, generalmente en la parte superior o lateral de la pantalla, donde encontraremos distintas secciones como "Turnos", "Servicios", "Consultas" o "Trámites". Al hacer clic en la sección correspondiente, accederemos a los servicios o gestiones que podemos realizar en línea. Familiarizarse con el diseño de estos sitios y aprender a ubicarnos en las distintas secciones nos permitirá desplazarnos con más seguridad y facilidad.
              </p>
            </div>
          </div>
        </div>

        <div className="curso-extra-info my-5 p-4 bg-light text-center rounded shadow-sm animate__animated animate__fadeInUp">
          <h2>¿Por qué tomar este curso?</h2>
          <p className="mt-3">
          El curso de manejo de trámites digitales es esencial para capacitar a los adultos mayores en el uso de herramientas que les permitan realizar gestiones importantes de forma independiente, como sacar turnos médicos, pagar servicios, consultar cuentas bancarias o realizar trámites gubernamentales. En un mundo cada vez más digitalizado, este curso no solo les brinda habilidades prácticas, sino que también fomenta su confianza y autonomía al interactuar con plataformas en línea. Además, reduce la necesidad de desplazamientos, ahorrándoles tiempo y esfuerzo, mientras les asegura acceso a servicios clave desde la comodidad de su hogar.</p>
        </div>
          <div className="botoncurso text-center mt-3">
            <button onClick={handleInicio} className="btn btn-primary">Volver al inicio</button>
            <button onClick={handleNextStage} className="btn btn-primary">Siguiente Módulo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CURSO4P1;
