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

function CURSO2P2() {
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
          progreso: 2, // progreso nuevo (cambiar dependiendo de la pagina)
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
    navigate('/curso2-25')
    
  };

  const handleAnterior = () => {
    navigate("/curso2-1")
  }

  return (
    <div className="curso-outer-container">
      <div className="curso-inner-container">
        <header className="curso-header text-center">
          <h1 className="display-4 animate__animated animate__fadeIn">Curso de uso básico del celular.</h1>
          <p className="lead animate__animated animate__fadeIn">Familiarízate con los conceptos básicos de la tecnología digital y su impacto en la vida cotidiana.
          </p>
        </header>

        <div className="curso-content animate__animated animate__fadeIn">
          <div className="curso-image-container text-center">
            <img src="https://www.marthadebayle.com/wp-content/uploads/2021/12/Tramites-cdmx.jpg" alt="Curso Interactivo" className="curso-image img-fluid" />
          </div>
          <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 3: Navegación en Dispositivos Móviles.</h3>
                <p>Ahora que conoce las partes básicas de su dispositivo, aprenderemos a movernos entre aplicaciones. En la pantalla principal de su teléfono verá varias aplicaciones. Para abrir una, simplemente toque el ícono correspondiente.
                  Si quiere cambiar de una aplicación a otra, deslice el dedo hacia arriba desde la parte inferior de la pantalla y manténgalo presionado unos segundos; verá todas las aplicaciones abiertas en miniatura. Deslícese hacia la izquierda o derecha para encontrar la que desea abrir. Esto le permite, por ejemplo, pasar de la cámara a los mensajes sin necesidad de cerrar ninguna aplicación.
                </p>
              </div>
            </div>
          <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 4: Instalación y Eliminación de Aplicaciones.</h3>
                <p>En este módulo, aprenderemos a instalar y eliminar aplicaciones. La tienda de aplicaciones, Google Play en dispositivos Android o App Store en dispositivos iOS, es el lugar donde puede buscar y descargar aplicaciones útiles.
                    Para instalar una aplicación, abra la tienda de aplicaciones. En la barra de búsqueda, escriba el nombre de la aplicación que desea, por ejemplo, “WhatsApp”. Cuando aparezca en los resultados, toque su nombre y seleccione “Instalar” o “Obtener”. La descarga comenzará y la aplicación se instalará automáticamente. Una vez instalada, podrá verla en la pantalla principal y abrirla tocando su ícono.
                    Si desea eliminar una aplicación, mantenga presionado su ícono en la pantalla principal. Aparecerá la opción de “Eliminar” o “Desinstalar”. Esto borrará la aplicación de su dispositivo y liberará espacio.
                </p>
              </div>
            </div>

          <button onClick={handleAnterior} className="btn btn-primary mt-4">Volver al paso anterior</button>
          <button onClick={actualizarProgreso} className="btn btn-primary mt-4">Siguiente Módulo.</button>
        </div>
      </div>
    </div>
  );
}

export default CURSO2P2;
