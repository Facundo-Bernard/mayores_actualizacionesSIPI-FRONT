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

function CURSO1P2() {
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
      const response = await fetch(`http://localhost:8080/progreso/actualizar/${user.id}/1`, {
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
    navigate('/curso1-3')
    
  };

  const handleAnterior = () => {
    navigate('/curso1-25')
  }

  return (
    <div className="curso-outer-container">
      <div className="curso-inner-container">
        <header className="curso-header text-center">
          <h1 className="display-4 animate__animated animate__fadeIn">Bienvenido al curso de manejo de correos electrónicos.</h1>
          <p className="lead animate__animated animate__fadeIn">¡Aprenda a acceder y navegar dentro de su correo electrónico, reconociendo las diferentes secciones!</p>
        </header>

        <div className="curso-content animate__animated animate__fadeIn">
          <div className="curso-image-container text-center">
            <img src="https://assets.easymailing.com/cms/2023/04/28163427/partes-de-un-email-detalle.jpg" alt="Curso Interactivo" className="curso-image img-fluid" />
          </div>

          <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 4: Leer y responder correos electrónicos.</h3>
                <p>Este módulo está enfocado en cómo leer, responder y reenviar correos. Para leer un correo recibido, solo necesita hacer clic en el mensaje en su bandeja de entrada. Esto abrirá el correo en una ventana, permitiéndole ver el contenido.
                Si desea responder a un correo, puede utilizar la opción "Responder", que aparece en la parte inferior o superior de la ventana del mensaje. Esta opción abrirá una nueva ventana de mensaje con el campo "Para" ya completado con la dirección del remitente. Escriba su respuesta en el cuadro de mensaje y luego haga clic en "Enviar".
                Si, en lugar de responder, quiere reenviar el correo a otra persona, puede utilizar la opción "Reenviar", que aparece en la misma sección de respuesta. Al seleccionar "Reenviar", podrá agregar la dirección de otra persona en el campo "Para" para enviarle una copia del correo original. Finalmente, haga clic en "Enviar"</p>
              </div>
              <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 5: Eliminación y organización de correos.</h3>
                <p>Este módulo le ayudará a mantener su bandeja de entrada organizada, eliminando correos innecesarios y clasificando los importantes. Para eliminar un correo, vaya a su bandeja de entrada y seleccione el mensaje que desea eliminar. Luego, haga clic en el ícono de “Eliminar” (normalmente representado por un tacho de basura). El correo se moverá a la carpeta de Eliminados o Papelera.
                Además, puede organizar sus correos importantes creando carpetas o etiquetas. En la barra lateral izquierda, encontrará la opción para crear una “Nueva carpeta” o “Crear etiqueta”. Asigne un nombre a la carpeta, como “Familia” o “Trabajo”. Luego, para mover un correo a esa carpeta, ábralo y seleccione la opción “Mover a” o “Etiquetar”, eligiendo la carpeta creada. Esto le ayudará a clasificar sus correos y encontrarlos más fácilmente.
                Si accidentalmente elimina un correo, puede recuperarlo de la papelera. Para esto, solo tiene que ir a la carpeta de Papelera o Eliminados, buscar el correo y seleccionarlo. Luego, elija la opción de “Mover a” o “Recuperar” y envíelo a la carpeta deseada, como “Recibidos”.
                </p>
              </div>
          <button onClick={handleAnterior} className="btn btn-primary mt-4">Volver al paso anterior</button>
          <button onClick={actualizarProgreso} className="btn btn-primary mt-4">Ir al examen</button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default CURSO1P2;
