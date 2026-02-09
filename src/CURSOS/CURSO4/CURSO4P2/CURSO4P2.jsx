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

function CURSO4P2() {
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
      const response = await fetch(`${API_URL}/progreso/actualizar/${user.id}/4`, {
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
          cursoId: 4 // viejo
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
    navigate('/curso4-25')
    
  };

  const handleAnterior = () => {
    navigate("/curso4-1")
  }

  return (
    <div className="curso-outer-container">
    <div className="curso-inner-container">
      <header className="curso-header text-center">
        <h1 className="display-4 animate__animated animate__fadeIn">Bienvenido al Curso de Manejo de Tramites Digitales</h1>
        <p className="lead animate__animated animate__fadeIn">
          Aprenda a manejarse virtualmente en lo que necesite!
        </p>
      </header>

      <div className="curso-content animate__animated animate__fadeIn">
        <div className="curso-image-container text-center">
          <img src="https://addinformatica.com/wp-content/uploads/2024/02/algunas-iniciativas-buscan-superar-la-brecha-digital-en-personas-mayores.jpg" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
        </div>

        <div className="curso-info-cards row my-4">
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 3: Creación y Gestión de Cuentas de Usuario
              </h3>
              <p>Uno de los primeros pasos para realizar trámites en línea es crear una cuenta en el portal de servicios, ya que muchas plataformas requieren que tengamos una cuenta para acceder a sus servicios. Para registrarnos, es necesario localizar el botón de “Registrarse” o “Crear cuenta”, que suele aparecer en la pantalla principal de la página web. Al hacer clic, se abrirá un formulario donde debemos ingresar algunos datos personales, como nombre, correo electrónico y número de teléfono. También deberemos elegir una contraseña, que es una clave secreta que nos permitirá acceder a la cuenta. Para hacerla segura, se recomienda usar una combinación de letras mayúsculas y minúsculas, números y algún símbolo especial,( como un signo de exclamación (!)). Si alguna vez olvidamos la contraseña, la mayoría de los sitios ofrecen una opción para recuperarla, que suele aparecer junto al botón de inicio de sesión y se llama “Olvidé mi contraseña”. En este caso, el portal nos guiará para crear una nueva contraseña a través del correo electrónico o un mensaje de texto. 
              </p>
            </div>
          </div>
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 4: Trámites Médicos en Línea</h3>
              <p>Una de las aplicaciones más comunes de los trámites digitales es la gestión de turnos médicos. En este módulo, aprenderemos cómo solicitar y cancelar turnos a través de internet. Para hacerlo, accedemos al portal o aplicación de salud correspondiente y buscamos la sección de “Turnos” o “Citas Médicas”. Una vez allí, debemos seleccionar el tipo de especialidad o médico con el que deseamos consultar. Muchos portales médicos requieren que tengamos una cuenta, por lo que, de ser necesario, iniciamos sesión con nuestro usuario y contraseña. Al seleccionar la especialidad, aparecerán los horarios disponibles, y podremos elegir el que nos sea más conveniente. Confirmamos la cita, y el sistema nos enviará un mensaje de confirmación. En caso de que necesitemos cancelar la cita, regresamos a la sección de “Turnos” o “Mis Citas” en el portal, seleccionamos el turno y buscamos la opción de “Cancelar”. Así podemos gestionar nuestras consultas de manera rápida y sencilla.
              </p>
            </div>
          </div>
        </div>
          <button onClick={handleAnterior} className="btn btn-primary mt-4">Volver al paso anterior</button>
          <button onClick={actualizarProgreso} className="btn btn-primary mt-4">Siguiente Módulo</button>
        </div>
      </div>
    </div>
  );
}

export default CURSO4P2;
