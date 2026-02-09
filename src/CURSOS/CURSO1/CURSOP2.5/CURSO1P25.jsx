import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CURSOEJEMPLO.css';

function CURSO1P25() {
  const user = useSelector((state) => state.user); //agarra variable usuario del estado global
  const navigate = useNavigate(); // necesario para usar navigate
  const [progressCreated, setProgressCreated] = useState(false);
  const [data, setData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL

  // codigo para moverse a la siguiente pagina y crear progreso
  const actualizarProgreso = async () => {
    try {
      const response = await fetch(`${API_URL}/progreso/actualizar/${user.id}/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        // se deben cargar todos los datos en la forma nueva o vieja si necesitamos que se mantengan como antes
        body: JSON.stringify({
          usuario: user, //user viejo
          progreso: 2, // progreso nuevo (cambiar dependiendo de la pagina)
          completado: false, // viejo
          examenPuntos: 0, // viejo
          cursoId: 1 // viejo
        })
      });
      
      if (response.ok) {
        const updatedData = await response.json();
        setData(updatedData);
        console.log("Progreso actualizado:", updatedData);
      } else {
        console.error("Error al actualizar el progreso");
      }
    } catch (error) {
      console.error("Error en actualizarProgreso:", error);
    }
    navigate('/curso1-2')
    
  };

  const handleAnterior = () => {
    navigate('/curso1-1')
  }
  

  return (

    // reutilizar todos estos componentes de html a como sea necesario
    <div className="curso-outer-container">
      <div className="curso-inner-container">
        <header className="curso-header text-center">
          <h1 className="display-4 animate__animated animate__fadeIn">Bienvenido al curso de manejo de correos electrónicos.</h1>
          <p className="lead animate__animated animate__fadeIn">
          ¡Aprenda a acceder y navegar dentro de su correo electrónico, reconociendo las diferentes secciones!
          </p>
        </header>

        <div className="curso-content animate__animated animate__fadeIn">
          <div className="curso-image-container text-center">
            <img src="https://c.files.bbci.co.uk/46C8/production/_106202181_ggm1598.jpg" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
          </div>

            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 3: Adjuntar archivos en un correo electrónico.</h3>
                <p>En este módulo, aprenderá a adjuntar archivos, como fotos o documentos, a sus correos. Primero, inicie un nuevo correo haciendo clic en "Redactar" o "Nuevo". Luego, busque el ícono de un clip o la opción de “Adjuntar archivo”, que generalmente se encuentra en la parte inferior de la ventana de redacción. Al hacer clic en este ícono, se abrirá una ventana donde podrá buscar archivos en su computadora o dispositivo.
                Para adjuntar un archivo, simplemente búsquelo en la carpeta correspondiente y selecciónelo. Luego, haga clic en “Abrir” o “Adjuntar” para agregarlo a su correo. Una vez adjuntado, el archivo aparecerá en la ventana del mensaje. Asegúrese de escribir un mensaje en el cuadro de texto principal y revise que el archivo esté correctamente adjunto antes de hacer clic en "Enviar".
                </p>
              </div>
            </div>
          </div>
          <div className="botoncurso text-center mt-3">
          <button onClick={handleAnterior} className="btn btn-primary">Volver al paso anterior</button>
            <button onClick={actualizarProgreso} className="btn btn-primary">Siguiente módulo</button>
          </div>
        </div>
      </div>
  );
}

export default CURSO1P25;
