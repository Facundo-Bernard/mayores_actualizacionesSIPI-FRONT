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

function CURSOEJEMPLOP2() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState(null);

  // al cargar el componente guarda en data el progreso actual del usuario
  // esto actualmente no se esta utilizando para nada especifico pero podria servir a futuro
  useEffect(() => {
    const agarrarProgresoUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:8080/progreso/obtenerUsuario/${user.id}`);
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
      const response = await fetch(`http://localhost:8080/progreso/actualizar/${user.id}/3`, {
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
          cursoId: 3 // viejo
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
    navigate('/curso3-3')
    
  };

  return (
    <div className="curso-outer-container">
      <div className="curso-inner-container">
        <header className="curso-header text-center">
          <h1 className="display-4 animate__animated animate__fadeIn">Curso Interactivo de Desarrollo Web</h1>
          <p className="lead animate__animated animate__fadeIn">Experimenta con ejemplos visuales, interactivos y educativos para aprender HTML, CSS y JavaScript.</p>
        </header>

        <div className="curso-content animate__animated animate__fadeIn">
          <div className="curso-image-container text-center">
            <img src="https://www.amia.org.ar/wp-content/uploads/2020/11/shutterstock_1212903190.jpg" alt="Curso Interactivo" className="curso-image img-fluid" />
          </div>

          <div className="edu-cards-container row my-4">
            <EduCard
              title="HTML Interactivo"
              text="Crea tu primera página web interactiva aprendiendo HTML."
              imgUrl="https://via.placeholder.com/300x200"
            />
            <EduCard
              title="CSS Animaciones"
              text="Aprende a animar tus elementos con transiciones y transformaciones CSS."
              imgUrl="https://via.placeholder.com/300x200"
            />
            <EduCard
              title="JavaScript en Acción"
              text="Escribe código JavaScript y observa los resultados en tiempo real."
              imgUrl="https://via.placeholder.com/300x200"
            />
          </div>

          <ExampleSection
            title="Ejemplo: Creando un botón interactivo con CSS"
            description="En este ejemplo, aprenderás a crear un botón que cambia de color y tamaño cuando el usuario pasa el mouse sobre él."
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />

          <button onClick={actualizarProgreso} className="btn btn-primary mt-4">Actualizar Progreso</button>
        </div>
      </div>
    </div>
  );
}

export default CURSOEJEMPLOP2;
