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

function CURSO5P25() {
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
      const response = await fetch(`${API_URL}/progreso/actualizar/${user.id}/5`, {
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
          cursoId: 5 // viejo
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
    navigate('/curso5-3')
    
  };

  const handleAnterior = () => {
    navigate("/curso5-2")
  }


  return (
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
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1n8C2h6zvcjMMfdQNfOhjFPfn9gpWLVtCg&s" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
        </div>

        <div className="curso-info-cards row my-4">
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 5: Aprender y Reconocer Phishing y Vishing
              </h3>
              <p>El phishing y el vishing son dos de las estafas más comunes que buscan engañarnos para que compartamos nuestros datos personales.
El phishing suele realizarse a través de correos electrónicos o mensajes que imitan a empresas o instituciones legítimas, como bancos o servicios de correo electrónico. Estos mensajes falsos a menudo incluyen enlaces a páginas que parecen auténticas, pero que en realidad son sitios falsos diseñados para robar nuestra información. Es común que estos mensajes contengan errores de ortografía, direcciones de correo inusuales, o incluso nombres de dominio que no corresponden con la empresa que dicen representar.
El vishing, por otro lado, ocurre mediante llamadas telefónicas. En una estafa de vishing, los estafadores se hacen pasar por representantes de bancos, empresas o instituciones públicas para obtener información como números de cuenta, datos de tarjetas de crédito o incluso claves personales. Estas llamadas suelen crear una sensación de urgencia, presionándonos para que revelemos información sin pensar. Es importante recordar que las instituciones confiables nunca solicitan información sensible por teléfono sin motivo claro.
</p>
            </div>
          </div>
        </div>
          <button onClick={handleAnterior} className='btn btn-primary mt-4'>Volver al paso anterior</button>
          <button onClick={actualizarProgreso} className="btn btn-primary mt-4">Ir al examen</button>
        </div>
      </div>
    </div>
  );
}

export default CURSO5P25;
