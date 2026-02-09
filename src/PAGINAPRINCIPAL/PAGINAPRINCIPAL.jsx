import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AI from '../AI/AI';
import BANNER from "./BANNER/BANNER";
import CURSOS_CARDS from "./CURSOS_CARDS/CURSOS_CARDS";
import FOOTER from './FOOTER';
import NAVBAR from './NAVBAR';

function PAGINAPRINCIPAL() {
  const user = useSelector(state => state.user); // Obtiene directamente los datos del usuario desde Redux
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Oculta el mensaje después de 3 segundos
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    console.log(user);
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <NAVBAR />
      <BANNER />
      <h2>Cursos</h2>
      <CURSOS_CARDS />

      {/* Mostrar el componente AI habilitado o deshabilitado */}
      <div className="mt-5 text-center">
        {!user.black && ( // Muestra el mensaje solo si el usuario no tiene Black
          <p className="text-danger">
            Más cursos y acceso al asistente virtual disponibles con suscripción <strong>Black</strong>
          </p>
        )}
        <div
          style={{
            pointerEvents: user.black ? 'auto' : 'none', // Deshabilita interacciones si no es Black
            opacity: user.black ? 1 : 0.5, // Reduce la opacidad si no es Black
          }}
        >
          <AI />
        </div>
      </div>

      <FOOTER />
    </div>
  );
}

export default PAGINAPRINCIPAL;
