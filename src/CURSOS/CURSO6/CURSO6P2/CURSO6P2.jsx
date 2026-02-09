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

function CURSO6P2() {
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
      const response = await fetch(`${API_URL}/progreso/actualizar/${user.id}/6`, {
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
          cursoId: 6 // viejo
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
    navigate('/curso6-3')
    
  };

  const handleAnterior = () => {
    navigate("/curso6-1")
  }

  return (
    <div className="curso-outer-container">
      <div className="curso-inner-container">
        <header className="curso-header text-center">
          <h1 className="display-4 animate__animated animate__fadeIn">Bienvenido al Curso de billeteras virtuales y compras en línea</h1>
          <p className="lead animate__animated animate__fadeIn">
          Entienda cómo funcionan las compras en línea y las formas de pago!
          </p>
        </header>

        <div className="curso-content animate__animated animate__fadeIn">
          <div className="curso-image-container text-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRflfii0rC_v-zwpY21s4RbYRfSf2relAqLrw&s" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
          </div>

          <div className="curso-info-cards row my-4">
            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 3: Transferencia de Dinero a otras Personas
                </h3>
                <p>La transferencia de dinero desde una billetera virtual es un proceso sencillo que permite enviar dinero a otros usuarios de la misma aplicación o incluso a cuentas bancarias de otras personas. Para realizar una transferencia, necesitamos ingresar el número de cuenta o el número de teléfono de la persona a la que deseamos enviar dinero. Antes de confirmar, es muy importante verificar que los datos del destinatario sean correctos para evitar que el dinero llegue a una cuenta equivocada.
</p>
              </div>
            </div>
            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 4: Pago de Servicios en Línea</h3>
                <p>Con una billetera virtual, es posible pagar servicios como agua, electricidad o internet sin tener que salir de casa. Para hacerlo, primero seleccionamos el servicio que queremos pagar dentro de la aplicación, ingresamos el número de referencia de nuestra cuenta de servicio y confirmamos el monto a pagar. Muchas billeteras virtuales permiten programar pagos automáticos, lo cual es muy útil para servicios recurrentes, ya que evita que olvidemos hacer el pago a tiempo.</p>
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

export default CURSO6P2;
