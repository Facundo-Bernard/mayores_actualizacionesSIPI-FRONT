import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CURSOEJEMPLO.css';

function CURSO5P1() {
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
        const existingCourse = progressData.find((curso) => curso.cursoId === 5);

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
              cursoId: 5, // id del curso, en este caso 3
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
    navigate('/curso5-2');
  };

  const handleInicio = () => {
    navigate("/pagina-principal")
  }

  return (

    // reutilizar todos estos componentes de html a como sea necesario
    <div className="curso-outer-container">
    <div className="curso-inner-container">
      <header className="curso-header text-center">
        <h1 className="display-4 animate__animated animate__fadeIn">Bienvenido al Curso de Seguridad en Línea</h1>
        <p className="lead animate__animated animate__fadeIn">
          Aprenda a visualizar las posibles amenazas digitales!
        </p>
      </header>

      <div className="curso-content animate__animated animate__fadeIn">
        <div className="curso-image-container text-center">
          <img src="https://nordvpn.com/wp-content/uploads/featured-internet-safety-tips-for-seniors.svg" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
        </div>

        <div className="curso-info-cards row my-4">
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 1: Navegación Segura, Evitar Fraudes y Spam
              </h3>
              <p>La navegación segura en internet es crucial para proteger nuestra información personal y nuestra seguridad en línea. Al navegar, debemos evitar hacer clic en enlaces desconocidos, especialmente si se encuentran en correos electrónicos o mensajes de remitentes no reconocidos. Estos enlaces pueden redirigirnos a sitios peligrosos o descargar programas maliciosos en nuestro dispositivo, que podrían comprometer nuestra privacidad y seguridad.
Es importante comprender que no todos los correos no deseados (spam) son peligrosos, pero algunos pueden incluir mensajes engañosos diseñados para robar nuestra información. Estos correos de spam a menudo intentan captar nuestra atención con ofertas o premios demasiado buenos para ser ciertos, o con mensajes alarmistas que nos urgen a actuar de inmediato. Para identificar un correo sospechoso, debemos prestar atención a detalles como errores ortográficos, direcciones de correo inusuales, y promesas de recompensas sin razón aparente.
</p>
            </div>
          </div>
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 2: Configuración de Contraseñas Seguras</h3>
              <p>Las contraseñas son las llaves de nuestras cuentas en internet, y crear una contraseña segura es esencial para proteger nuestra información personal. Una contraseña segura debe tener al menos ocho caracteres y combinar letras en mayúscula, letras en minúscula, números y símbolos, de modo que sea difícil de adivinar. Evitar el uso de datos obvios, como nuestro nombre, fecha de nacimiento o palabras comunes, también es importante, ya que estos datos pueden ser conocidos o adivinados fácilmente.
Para recordar contraseñas complejas sin anotarlas, podemos utilizar frases clave que sean fáciles de recordar para nosotros pero difíciles para otros. También es recomendable no utilizar la misma contraseña en diferentes sitios o aplicaciones; de esta manera, si una de nuestras contraseñas es descubierta, las demás cuentas permanecerán seguras. Cambiar nuestras contraseñas regularmente es otra práctica que contribuye a nuestra seguridad, ya que dificulta aún más que alguien pueda acceder a nuestras cuentas sin permiso.
</p>
            </div>
          </div>
        </div>

        <div className="curso-extra-info my-5 p-4 bg-light text-center rounded shadow-sm animate__animated animate__fadeInUp">
          <h2>¿Por qué tomar este curso?</h2>
          <p className="mt-3">
          El curso de seguridad en línea es crucial para proteger a los adultos mayores en su interacción con el mundo digital, donde los riesgos como estafas, fraudes y robo de información son cada vez más frecuentes. Este curso les enseña a identificar sitios web seguros, reconocer correos electrónicos fraudulentos y crear contraseñas robustas para proteger su información personal. Además, les brinda herramientas para navegar con confianza y realizar transacciones digitales de manera segura. Al aprender estas habilidades, los adultos mayores no solo protegen su privacidad, sino que también ganan confianza para aprovechar las ventajas del entorno digital sin temor a ser víctimas de ciberataques. </p>
        </div>
          <div className="botoncurso text-center mt-3">
            <button onClick={handleInicio} className='btn btn-primary'>Volver al inicio</button>
            <button onClick={handleNextStage} className="btn btn-primary">Siguiente Módulo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CURSO5P1;
