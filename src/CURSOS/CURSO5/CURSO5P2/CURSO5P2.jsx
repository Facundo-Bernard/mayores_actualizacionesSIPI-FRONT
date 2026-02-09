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

function CURSO5P2() {
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
      const response = await fetch(`http://localhost:8080/progreso/actualizar/${user.id}/5`, {
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
      console.error("Error en actualizar Progreso:", error);
    }
    navigate('/curso5-25')
    
  };

  const handleAnterior = () => {
    navigate("/curso5-1")
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
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOqmlKtbArwsHNH5EEAhRVjCJRNHwnf3pZ4w&s" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
        </div>

        <div className="curso-info-cards row my-4">
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 3: Reconocer Sitios Confiables
              </h3>
              <p>Al realizar cualquier actividad en línea, es fundamental saber distinguir entre sitios web confiables y no confiables para proteger nuestra información. Un sitio web seguro suele tener una dirección que empieza con “https” en lugar de “http”, lo que indica que nuestra conexión con el sitio es privada y que la información que enviamos y recibimos está protegida. Además, en la barra de direcciones suele aparecer un pequeño ícono de candado, que también es una señal de que el sitio es seguro.
Antes de ingresar información personal o financiera en un sitio web, podemos investigar su autenticidad y observar si existen señales de alerta. Por ejemplo, los sitios confiables rara vez solicitan información personal de manera urgente o mediante anuncios emergentes. Los sitios web poco seguros suelen estar llenos de estos anuncios y, a menudo, intentan captar nuestra atención con mensajes de urgencia o promesas irreales. Al reconocer estas señales, podemos protegernos mejor y evitar caer en sitios engañosos.
</p>
            </div>
          </div>
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 4: Seguridad Financiera en Línea</h3>
              <p>Al manejar nuestras finanzas en línea, ya sea para realizar pagos o consultar nuestro saldo, es importante tomar medidas de seguridad para proteger nuestras cuentas. Una de las prácticas más seguras es utilizar solamente aplicaciones o sitios web oficiales de nuestro banco o de la institución financiera que nos brinde el servicio. Estas plataformas oficiales están diseñadas con protecciones avanzadas para nuestras transacciones y datos.
La autenticación en dos pasos es otra medida de seguridad que nos permite proteger nuestras cuentas de accesos no autorizados. Consiste en recibir un código de verificación en nuestro teléfono o correo cada vez que intentamos ingresar desde un dispositivo nuevo, asegurando que solo nosotros tengamos acceso a la cuenta. Además, monitorear regularmente nuestras cuentas nos permite detectar movimientos sospechosos y actuar rápidamente en caso de posibles fraudes. Aprender a reconocer movimientos extraños o cargos inesperados es clave para evitar pérdidas.
</p>
            </div>
          </div>
        </div>
          <button onClick={handleAnterior} className='btn btn-primary mt-4'>Volver al paso anterior</button>
          <button onClick={actualizarProgreso} className="btn btn-primary mt-4">Siguiente Modulo</button>
        </div>
      </div>
    </div>
  );
}

export default CURSO5P2;
