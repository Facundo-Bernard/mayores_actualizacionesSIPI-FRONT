import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CursoInteractivo.css';

// componentes tipo props reutilizables
// componente carta
function EduCard({ title, text, imgUrl }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={imgUrl} alt={title} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
}
// componente seccion video
function ExampleSection({ title, description, videoUrl }) {
  return (
    <div className="example-section my-5 p-4 bg-light rounded shadow-sm">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="video-container text-center">
        <iframe 
          width="560" 
          height="315" 
          src={videoUrl} 
          title="Example video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

function CURSO2P25() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL

  // al cargar el componente guarda en data el progreso actual del usuario
  // esto actualmente no se esta utilizando para nada especifico pero podria servir a futuro
  useEffect(() => {
    const agarrarProgresoUsuario = async () => {
      try {
        const response = await fetch(`${API_URL}/progreso/obtenerUsuario/${user.id}`);
        if (response.ok) {
          const result = await response.json();
          setData(result.content);
        } else {
          console.error("Error fetching user progress");
        }
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    agarrarProgresoUsuario();
  }, [user.id]);

  // al tocar el boton actualiza el progreso
  const actualizarProgreso = async () => {
    try {
      const response = await fetch(`${API_URL}/progreso/actualizar/${user.id}/2`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        // se deben cargar todos los datos en la forma nueva o vieja si necesitamos que se mantengan como antes
        body: JSON.stringify({
          usuario: user, //user viejo
          progreso: 3, // progreso nuevo (cambiar dependiendo de la pagina)
          completado: false, // viejo
          examenPuntos: 0, // viejo
          cursoId: 2 // viejo
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
    navigate('/curso2-3')
    
  };

  const handleAnterior = () => {
    navigate("/curso2-2");
  }

  return (
    <div className="curso-outer-container">
    <div className="curso-inner-container">
      <header className="curso-header text-center">
        <h1 className="display-4 animate__animated animate__fadeIn">Bienvenido al Curso de Uso basico del Celular.</h1>
        <p className="lead animate__animated animate__fadeIn">
        Familiarizate con los conceptos basicos de la tecnologia digital y su impacto en la vida cotidiana.
        </p>
      </header>

      <div className="curso-content animate__animated animate__fadeIn">
        <div className="curso-image-container text-center">
          <img src="https://www.amia.org.ar/wp-content/uploads/2020/11/shutterstock_1212903190.jpg" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
        </div>

        <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 5: Uso de Funciones Básicas del Teléfono y la Tablet.</h3>
                <p>En este módulo, aprenderá a realizar funciones básicas, como hacer llamadas, enviar mensajes y usar accesos rápidos. Para hacer una llamada, abra la aplicación de teléfono (con el ícono de un teléfono verde), escriba el número que desea llamar o seleccione un contacto de su lista, y toque el botón de llamada. Para terminar la llamada, toque el botón rojo de finalizar.
Para enviar un mensaje de texto, abra la aplicación de mensajes (generalmente marcada con un ícono de sobre). Seleccione “Nuevo mensaje” o “Escribir”, elija un contacto o ingrese un número, y escriba su mensaje. Al terminar, toque “Enviar”.
También puede acceder a funciones como la linterna o la cámara desde el menú de accesos rápidos. En Android, deslice el dedo desde la parte superior de la pantalla hacia abajo; en iOS, deslice desde la esquina superior derecha. Verá íconos para funciones como la linterna, el modo avión y la cámara, que puede activar tocándolos.
</p>
              </div>
            </div>
            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 6: Utilización de la Función de “Grabar Pantalla”.</h3>
                <p>Por último, aprenderá a grabar la pantalla de su dispositivo, lo cual es útil para capturar lo que está haciendo y compartirlo con alguien si necesita mostrar cómo se usa alguna aplicación o función.
Para activar la grabación de pantalla en Android, abra el menú de accesos rápidos deslizando desde la parte superior de la pantalla. Busque el ícono de “Grabar pantalla” y tóquelo. El teléfono dará una cuenta regresiva y comenzará a grabar. Para detener la grabación, toque nuevamente el ícono, y el video se guardará en la galería de su dispositivo.
En iOS, abra el Centro de Control deslizando desde la esquina superior derecha y seleccione el ícono de grabación de pantalla. La grabación comenzará tras la cuenta regresiva y, para detenerla, toque la barra roja en la parte superior y seleccione "Detener".
</p>
              </div>
            </div>
          <button onClick={handleAnterior} className="btn btn-primary mt-4">Volver al anterior</button>
          <button onClick={actualizarProgreso} className="btn btn-primary mt-4">Ir al examen</button>
        </div>
      </div>
    </div>
  );
}

export default CURSO2P25;
