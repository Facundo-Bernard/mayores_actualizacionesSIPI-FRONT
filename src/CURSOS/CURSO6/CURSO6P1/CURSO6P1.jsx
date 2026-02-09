import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CURSOEJEMPLO.css';

function CURSO6P1() {
  const user = useSelector((state) => state.user); //agarra variable usuario del estado global
  const navigate = useNavigate(); // necesario para usar navigate
  const [progressCreated, setProgressCreated] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL

  // codigo para moverse a la siguiente pagina y crear progreso
  const handleNextStage = async () => {
    if (!progressCreated && user && user.id) { // verifica si hay usuario
      try {
        // hace un fetch (agarra del back) para ver si  ya se creo progreso
        const response = await fetch(`${API_URL}/progreso/obtenerUsuario/${user.id}`);
        const progressData = await response.json();

        // revisa si el curso especifico ya se creo 
        //(recordar que todos los cursos tienen un id especifico que determina de que curso se trata)
        const existingCourse = progressData.find((curso) => curso.cursoId === 6);

        if (!existingCourse) {
          // Crea el progreso de un curso especifico para un usuario especifico
          await fetch(`${API_URL}/progreso/crear`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              usuario: user, // guarda user entero dentro de la tabla del progreso
              progreso: 1, // cuanto progresa, modificar en base a que pagina sea
              completado: false, // marcar como true cuando se complete
              examenPuntos: 0, // poner puntos cuando sea la pagina de examen
              cursoId: 6, // id del curso, en este caso 3
            }),
          });
          console.log('Progreso creado exitosamente');
          setProgressCreated(true); 
        } else {
          console.log('El usuario ya tiene progreso en este curso');
        }
      } catch (error) {
        console.error('Error al verificar o crear progreso', error);
      }
    }
    
    // Navega hacia la proxima pagina
    // recordar que para que esto funcione las paginas deben estar enrutadas en app
    navigate('/curso6-2');
  };

  const handleInicio = () => {
    navigate("/pagina-principal")
  }

  return (

    // reutilizar todos estos componentes de html a como sea necesario
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
            <img src="https://media.istockphoto.com/id/1217822780/es/foto/hombre-adulto-mayor-haciendo-compras-en-l%C3%ADnea-en-el-tel%C3%A9fono-inteligente-en-casa.jpg?s=170667a&w=0&k=20&c=XGaYdB5uuWRSN8DRMgAAKS1d_4BW8Ox2y0cvhSOt1K4=" alt="Curso de Desarrollo Web" className="curso-image img-fluid" />
          </div>

          <div className="curso-info-cards row my-4">
            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 1: ¿Qué es una Billetera Virtual?
                </h3>
                <p>Una billetera virtual es una aplicación o plataforma que almacena dinero de manera digital, permitiéndonos realizar pagos, transferencias y compras de forma rápida y segura. Las billeteras virtuales funcionan como un monedero en el que cargamos dinero desde nuestra cuenta bancaria y que podemos usar para pagar en tiendas en línea, transferir dinero a otras personas o incluso pagar en tiendas físicas mediante códigos QR.
El uso de billeteras virtuales tiene muchas ventajas. Nos permite realizar transacciones en cualquier momento y lugar, sin la necesidad de llevar efectivo. También son más seguras que las transacciones en efectivo, ya que muchas cuentan con sistemas de verificación y encriptación para proteger nuestro dinero y nuestras operaciones.
</p>
              </div>
            </div>
            <div className="">
              <div className="curso-card p-3 border rounded shadow-sm">
                <h3>Módulo 2: Realizar Pagos en Tiendas Físicas con Código QR</h3>
                <p>Los códigos QR se utilizan cada vez más para realizar pagos en tiendas físicas de forma rápida y segura. Para hacer un pago con código QR, primero debemos abrir nuestra aplicación de billetera virtual y seleccionar la opción de pago con código QR. Luego, simplemente escaneamos el código QR que nos muestre el vendedor, verificamos el monto de la transacción, y confirmamos el pago.
Es fundamental que verifiquemos el monto antes de confirmar la transacción, ya que esto nos ayudará a evitar errores. Este tipo de pago es rápido y conveniente, especialmente en lugares donde no se acepta efectivo o tarjetas.
</p>
              </div>
            </div>
            
          </div>

          <div className="curso-extra-info my-5 p-4 bg-light text-center rounded shadow-sm animate__animated animate__fadeInUp">
            <h2>¿Por qué tomar este curso?</h2>
            <p className="mt-3">
            El curso de billeteras virtuales y compras en línea es crucial para enseñar a los adultos mayores a gestionar su dinero y realizar transacciones de forma práctica y segura en el entorno digital. Este curso les permite familiarizarse con herramientas como aplicaciones de pagos, transferencias electrónicas y plataformas de comercio en línea, facilitándoles la compra de productos o servicios desde la comodidad de su hogar. Además, les brinda los conocimientos necesarios para proteger su información personal y evitar fraudes, promoviendo su autonomía financiera. Aprender estas habilidades no solo mejora su calidad de vida, sino que también les ayuda a integrarse en un mundo donde el comercio digital es cada vez más predominante. 
            </p>
          </div>

          <div className="botoncurso text-center mt-3">
            <button onClick={handleInicio} className='btn btn-primary'>Volver al inicio</button>
            <button onClick={handleNextStage} className="btn btn-primary">Siguiente Módulo</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CURSO6P1;
