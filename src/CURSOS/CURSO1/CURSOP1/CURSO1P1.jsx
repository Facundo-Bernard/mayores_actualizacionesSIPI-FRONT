import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CURSOEJEMPLO.css';

function CURSO1P1() {
  const user = useSelector((state) => state.user); //agarra variable usuario del estado global
  const navigate = useNavigate(); // necesario para usar navigate
  const [progressCreated, setProgressCreated] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL

  // codigo para moverse a la siguiente pagina y crear progreso
  const handleNextStage = async () => {
    if (!progressCreated && user && user.id) { // verifica si hay usuario
      try {
        // hace un fetch (agarra del back) para ver si  ya se creo progreso
        const response = await fetch(`${API_URL}/progreso/obtenerUsuario/${user.id}`);
        const progressData = await response.json();

        // revisa si el curso especifico ya se creo 
        //(recordar que todos los cursos tienen un id especifico que determina de que curso se trata)
        const existingCourse = progressData.find((curso) => curso.cursoId === 1);

        if (!existingCourse) {
          // Crea el progreso de un curso especifico para un usuario especifico
          await fetch(`${API_URL}/progreso/crear`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              usuario: user, // guarda user entero dentro de la tabla del progreso
              progreso: 1, // cuanto progresa, modificar en base a que pagina sea
              completado: false, // marcar como true cuando se complete
              examenPuntos: 0, // poner puntos cuando sea la pagina de examen
              cursoId: 1, // id del curso, en este caso 3
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
    navigate('/curso1-25');
  };

  const handleInicio = () => {
    navigate("/pagina-principal")
  }

  return (

    // reutilizar todos estos componentes de html a como sea necesario
    <div className="curso-outer-container">
      <div className="curso-inner-container">
        <header className="curso-header text-center">
          <h1 className="display-4 animate__animated animate__fadeIn">
          Bienvenido al curso de manejo de correos electrónicos.</h1>
          <p className="lead animate__animated animate__fadeIn">
          ¡Aprenda a acceder y navegar dentro de su correo electrónico, reconociendo las diferentes secciones!
          </p>
        </header>

        <div className="curso-content animate__animated animate__fadeIn">
          <div className="curso-image-container text-center">
            <img src="https://gestion.pe/resizer/8yvfXTwsDf6YMP-7GZBXJ0yJ9nk=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/6C7QFZTXMBBURMD2PNDE3HVHW4.jpg" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
          </div>

          <div className="curso-info-cards row my-4">
            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 1: Navegación básica en la bandeja de entrada.</h3>
                <p>En este módulo, aprenderemos los primeros pasos para acceder al correo electrónico y familiarizarnos con el entorno de la bandeja de entrada. Para ingresar a su cuenta de correo, abra el navegador de internet, como Google Chrome o Safari, y escriba la dirección web de su servicio de correo, como Gmail o Outlook. Una vez en la página, debe ingresar su dirección de correo electrónico y su contraseña. Al hacer clic en “Iniciar sesión” o “Entrar”, podrá acceder a su bandeja de entrada, donde se almacenan los correos recibidos.
                Dentro de la bandeja de entrada, encontrará varias secciones que lo ayudarán a organizar y gestionar sus correos. La sección Recibidos muestra los correos nuevos y no leídos, mientras que la carpeta Enviados guarda una copia de los correos que usted ha enviado. Si borra algún correo, este se moverá a la carpeta de Eliminados o Papelera. También verá una carpeta de Spam, donde se guardan los correos sospechosos, para protegerlo de mensajes no deseados. Es importante explorar cada una de estas carpetas para familiarizarse y reconocer la manera en que se organizan sus correos. Los correos no leídos aparecerán en negrita, mientras que los correos ya leídos se verán en texto normal.</p>
              </div>
            </div>
            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 2: Cómo escribir y enviar un correo.</h3>
                <p>Este módulo se enfoca en los pasos básicos para redactar y enviar un correo electrónico. Para comenzar a escribir un nuevo correo, debe buscar el botón "Redactar" o "Nuevo", que normalmente se encuentra en la parte superior izquierda de su pantalla. Al hacer clic en este botón, se abrirá una ventana de redacción de mensajes donde podrá escribir el contenido de su correo.
                En la parte superior de esta ventana, verá el campo "Para", en el cual debe ingresar la dirección de correo electrónico del destinatario, es decir, el correo de la persona a quien va dirigido el mensaje. Puede escribir varias direcciones separadas por comas si desea enviar el correo a múltiples personas. Justo debajo de este campo se encuentra el campo "Asunto", donde se escribe una breve descripción del tema del mensaje, como por ejemplo: "Fotos de la reunión familiar".
                En el cuadro de mensaje más grande, podrá escribir el contenido del correo. Una vez finalizada la redacción, revise su mensaje para corregir cualquier error. Cuando esté listo, solo debe hacer clic en "Enviar". Esto enviará el correo a las direcciones ingresadas en el campo "Para".
                </p>
              </div>
            </div>
            
          </div>

          <div className="curso-extra-info my-5 p-4 bg-light text-center rounded shadow-sm animate__animated animate__fadeInUp">
            <h2>¿Por qué tomar este curso?</h2>
            <p className="mt-3">
            El curso de manejo de correos electrónicos es fundamental para que los adultos mayores se integren plenamente en el mundo digital, facilitando la comunicación y el acceso a servicios en línea. Aprender a enviar y recibir correos permite mantenerse en contacto con familiares, amigos y profesionales, así como realizar trámites y recibir notificaciones importantes de manera rápida y directa. Además, dominar las funciones básicas del correo electrónico, como organizar mensajes y adjuntar documentos, ayuda a ganar independencia en las gestiones cotidianas y a fortalecer la confianza en el uso de tecnologías.
            </p>
          </div>
          <div className="botoncurso text-center mt-3">
          <button onClick={handleInicio} className="btn btn-primary">Volver al inicio</button>
            <button onClick={handleNextStage} className="btn btn-primary">Siguiente módulo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CURSO1P1;
