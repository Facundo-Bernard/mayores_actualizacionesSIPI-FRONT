import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CURSOEJEMPLO.css';

function CURSO2P1() {
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
        const existingCourse = progressData.find((curso) => curso.cursoId === 2);

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
              cursoId: 2, // id del curso, en este caso 3
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
    navigate('/curso2-2');
  };

  const handleInicio = () => {
    navigate("/pagina-principal")
  }
  
  return (

    // reutilizar todos estos componentes de html a como sea necesario
    <div className="curso-outer-container">
      <div className="curso-inner-container">
        <header className="curso-header text-center">
          <h1 className="display-4 animate__animated animate__fadeIn">Bienvenido al curso de uso básico del celular.</h1>
          <p className="lead animate__animated animate__fadeIn">
          Familiarízate con los conceptos básicos de la tecnología digital y su impacto en la vida cotidiana.
          </p>
        </header>

        <div className="curso-content animate__animated animate__fadeIn">
          <div className="curso-image-container text-center">
            <img src="https://elceo.com/wp-content/uploads/2022/12/tramites-gob-fotoartecl.jpg" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
          </div>

          <div className="curso-info-cards row my-4">
            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 1: Introducción a la Tecnología Moderna.</h3>
                <p>En este primer módulo, explicaremos qué es la tecnología digital y cómo está presente en nuestra vida cotidiana. La tecnología digital incluye dispositivos y herramientas que funcionan con datos electrónicos, como teléfonos móviles, tablets y computadoras. Estos dispositivos nos permiten realizar actividades diarias, como comunicarnos mediante mensajes o videollamadas, ver contenido en línea y organizar nuestras tareas.
                  Piense en los dispositivos que ya usa en su día a día: el teléfono para hablar con amigos o familiares o la televisión para informarse sobre lo que sucede en la actualidad. Con esta idea en mente, queremos que aprendan sobre las nuevas tecnologías que se utilizan ahora, las cuales facilitarán tareas, trámites o hasta pagos. De esta manera, pasaremos al siguiente módulo, donde aprenderemos sobre los componentes básicos de estos dispositivos.
                </p>
              </div>
            </div>
            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 2: Componentes Básicos de un Dispositivo.</h3>
                <p>Para utilizar un dispositivo móvil, como un teléfono o una tablet, primero es útil conocer sus partes principales y entender su funcionamiento. Comencemos con la pantalla táctil, que es la superficie donde verá y tocará todo lo que quiera abrir o seleccionar. Para abrir una aplicación o función, simplemente toque la pantalla suavemente con el dedo.
                  A continuación, fíjese en los botones físicos de su dispositivo. Al costado del teléfono o tablet, verá un botón que enciende o apaga la pantalla; al presionarlo, la pantalla se activa o entra en reposo. También encontrará otros dos botones, generalmente marcados con “+” y “-”, que sirven para aumentar o disminuir el volumen del sonido. Puede usarlos, por ejemplo, mientras ve un video o recibe una llamada.
                  Su dispositivo también cuenta con una cámara y un micrófono. La cámara suele estar en la parte superior del dispositivo, tanto en el frente como en la parte trasera, y permite tomar fotos o grabar videos. El micrófono graba el sonido, útil para enviar notas de voz o grabar videos.
                </p>
              </div>
            </div>
          </div>
          <div className="curso-extra-info my-5 p-4 bg-light text-center rounded shadow-sm animate__animated animate__fadeInUp">
            <h2>¿Por qué tomar este curso?</h2>
            <p className="mt-3">
            El curso de uso básico del celular es esencial para ayudar a los adultos mayores a familiarizarse con una herramienta que se ha vuelto indispensable en la vida diaria. Este curso les brinda las habilidades fundamentales para utilizar el teléfono de manera autónoma, permitiéndoles comunicarse fácilmente con familiares y amigos, acceder a servicios en línea y realizar tareas prácticas, como enviar mensajes y hacer llamadas. Aprender a manejar el celular también les ayuda a mantenerse informados, realizar trámites y, en general, mejorar su calidad de vida, ya que los conecta con el mundo digital de una manera accesible y comprensible.
            </p>
          </div>

          <div className="botoncurso text-center mt-3">
          <button onClick={handleInicio} className='btn btn-primary'>Volver al inicio</button>
            <button onClick={handleNextStage} className="btn btn-primary">Siguiente módulo.</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CURSO2P1;
