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

function CURSO4P25() {
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
          progreso: 3, // progreso nuevo (cambiar dependiendo de la pagina)
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
    navigate('/curso4-3')
    
  };

  const handleAnterior = () => {
    navigate("/curso4-2")
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
          <img src="https://enfoquenoticias.com.mx/wp-content/uploads/2023/08/imss-1.jpg" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
        </div>

        <div className="curso-info-cards row my-4">
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 5: Trámites Bancarios Básicos
              </h3>
              <p>La banca en línea es otra herramienta importante que facilita realizar tareas como transferencias y pagos sin necesidad de visitar una sucursal. Para comenzar, accedemos al portal del banco o a su aplicación móvil, ingresamos a nuestra cuenta con usuario y contraseña, y navegamos hasta la sección de “Transferencias” o “Pagos”. Para realizar una transferencia, necesitamos conocer el número de cuenta de la persona a la que vamos a enviar dinero. Introducimos la cantidad y confirmamos la operación. Para pagar un servicio, seleccionamos el tipo de servicio a pagar (por ejemplo, electricidad, agua o internet) e ingresamos los datos del servicio, como el número de referencia o identificación del pago. Tras verificar que los datos son correctos, confirmamos el pago. Estas operaciones son seguras y, al finalizar, el sistema nos muestra un comprobante que podemos guardar como respaldo. 
              </p>
            </div>
          </div>
          <div className="">
            <div className="curso-card p-3 border rounded shadow-sm">
              <h3>Módulo 6: Gestión de Tarjetas de Débito y Crédito</h3>
              <p>Además de realizar pagos y transferencias, la banca en línea permite la gestión de nuestras tarjetas de débito y crédito. Desde el portal o la aplicación del banco, buscamos una sección llamada “Tarjetas” o “Mis Tarjetas”. Aquí, podemos ver nuestras tarjetas activas y revisar información importante, como el límite de crédito y los movimientos recientes. Para agregar una nueva tarjeta, buscamos el botón de “Agregar tarjeta” e ingresamos los datos solicitados, como el número de tarjeta y la fecha de vencimiento. Si deseamos eliminar una tarjeta que ya no usamos, seleccionamos la tarjeta en cuestión y encontramos la opción “Eliminar”, la cual suele requerir que confirmemos nuestra decisión para completar la acción. En esta misma sección, podemos revisar los movimientos recientes de cada tarjeta, que aparecerán ordenados por fecha. Esta información nos permite estar al tanto de nuestros gastos y gestionar nuestras tarjetas de manera adecuada.
              </p>
            </div>
          </div>
        </div>
        <button onClick={handleAnterior} className="btn btn-primary mt-4">Volver al paso anterior</button>
          <button onClick={actualizarProgreso} className="btn btn-primary mt-4">Ir al examen</button>
        </div>
      </div>
    </div>
  );
}

export default CURSO4P25;
