import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ExamenFinal.css';

// Define las preguntas del examen en un array
const preguntas = [
  {
    tipo: 'Multiple-choice', // Tipo de pregunta (opción múltiple)
    pregunta: "¿Qué se debe hacer para iniciar sesión en su cuenta de correo electrónico?", // Texto de la pregunta
    opciones: [ // Opciones de respuesta
    "Hacer clic en Recibidos y escribir su nombre completo",
    "Ingresar su dirección de correo electrónico y su contraseña, y hacer clic en Iniciar sesión",
    "Escribir el asunto del correo en la barra de búsqueda",
    "Ninguna de las anteriores"
    ],
    respuestaCorrecta: 1 // Índice de la respuesta correcta
  },
  {
    tipo: 'Multiple-choice',
    pregunta: "¿Qué significa la carpeta de Spam en su bandeja de entrada?",
    opciones: [
      "Una carpeta para correos importantes",
      "Una carpeta para correos que podrían ser no deseados o sospechosos",
      "Una carpeta que guarda los correos eliminados",
      "Ninguna de las anteriores"
    ],
    respuestaCorrecta: 1
  },
  {
    tipo: 'Multiple-choice',
    pregunta: "¿Cuál es el ícono más común para adjuntar un archivo a un correo?",
    opciones: [
    "Un ícono de una cámara",
    "Un ícono de un clip",
    "Un ícono de un lápiz",
    "Ninguna de las anteriores"
    ],
    respuestaCorrecta: 1
  },
  {
    tipo: 'true-false', // Tipo de pregunta (verdadero o falso)
    pregunta: "Si quiero responder a un correo, ¿puedo hacer clic en la opción de Reenviar? (V/F)",
    respuestaCorrecta: true // Respuesta correcta (true para Verdadero)
  },
  {
    tipo: 'true-false', // Tipo de pregunta (verdadero o falso)
    pregunta: "Los correos no leídos aparecen en negrita, mientras que los correos leídos tienen texto normal. (V/F)",
    respuestaCorrecta: false // Respuesta correcta (true para Verdadero)
  },
  {
    tipo: 'open-ended', // Tipo de pregunta de respuesta abierta
    pregunta: "¿Cómo puede organizar sus correos importantes para encontrarlos más fácilmente?",
    respuestaCorrecta: "Para organizar correos importantes, puede crear carpetas o etiquetas, asignarles un nombre (como 'Familia' o 'Trabajo') y mover los correos a esas carpetas para encontrarlos más fácilmente."
  }
];

// Define el componente principal del examen
function ExamenFinal1() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user); // Obtiene la información del usuario desde el estado global (Redux)
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null)); // Estado para almacenar las respuestas del usuario
  const [puntaje, setPuntaje] = useState(0); // Estado para almacenar el puntaje del examen
  const [completado, setCompletado] = useState(false); // Estado para indicar si el examen ha sido completado
  const API_URL = import.meta.env.VITE_API_URL
  // Función para manejar el cambio de respuesta en cada pregunta
  const manejarCambioRespuesta = (index, valor) => {
    const nuevasRespuestas = [...respuestas]; // Copia las respuestas actuales
    nuevasRespuestas[index] = valor; // Actualiza la respuesta de la pregunta correspondiente
    setRespuestas(nuevasRespuestas); // Guarda las nuevas respuestas en el estado
  };

  // Función para enviar y evaluar las respuestas
  const enviarRespuestas = async () => {
    // Calcula el puntaje sumando 1 punto por cada respuesta correcta
    const nuevoPuntaje = respuestas.reduce((total, respuesta, index) => {
      if (preguntas[index].tipo === 'Multiple-choice') { // Verifica si es de opción múltiple
        return respuesta === preguntas[index].respuestaCorrecta ? total + 1 : total;
      } else if (preguntas[index].tipo === 'true-false') { // Verifica si es verdadero o falso
        return respuesta === preguntas[index].respuestaCorrecta ? total + 1 : total;
      } else if (preguntas[index].tipo === 'open-ended') { // Verifica si es de respuesta abierta
        return respuesta?.toLowerCase() === preguntas[index].respuestaCorrecta.toLowerCase() ? total + 1 : total;
      }
      return total; // Devuelve el total acumulado
    }, 0);

    setPuntaje(nuevoPuntaje); // Actualiza el puntaje en el estado
    setCompletado(true); // Marca el examen como completado
    console.log(nuevoPuntaje)
    // Envía el progreso del usuario al backend (servidor)
    try {
      const response = await fetch(`${API_URL}/progreso/actualizar/${user.id}/1`, {
        method: "PUT", // Método HTTP para actualizar datos
        headers: {
          "Content-Type": "application/json" // Indica que el contenido es JSON
        },
        body: JSON.stringify({ // Cuerpo de la petición con datos a enviar
          usuario: user, // Usuario que completó el examen
          progreso: 4, // Ejemplo de valor de progreso
          completado: true, // Marca el progreso como completado
          examenPuntos: nuevoPuntaje, // Puntaje obtenido
          cursoId: 1 // ID del curso (en este caso 3)
        })
      });

      if (response.ok) { // Verifica si la respuesta del servidor es exitosa
        console.log("Progreso actualizado con éxito"); // Muestra mensaje de éxito
      } else {
        console.error("Error al actualizar el progreso"); // Muestra error si falla
      }
    } catch (error) {
      console.error("Error en enviarRespuestas:", error); // Muestra error si hay problemas de conexión
    }
  };

  const handleInicio = () => {
    navigate("/pagina-principal")
  }

  // Renderiza la interfaz del examen
  return (
    <div className="examen-final-container animate__animated animate__fadeIn">
      <h1 className="text-center my-4">Evaluación de conocimientos sobre el manejo de correos electrónicos</h1> {/* Título del examen */}
      <div className="preguntas-container">
        {preguntas.map((pregunta, index) => ( // Itera sobre cada pregunta
          <div key={index} className="pregunta mb-4">
            <h5>{pregunta.pregunta}</h5> {/* Muestra la pregunta */}
            {pregunta.tipo === 'Multiple-choice' && pregunta.opciones.map((opcion, opcionIndex) => (
              <div key={opcionIndex} className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name={`pregunta-${index}`} // Agrupa opciones de la misma pregunta
                  value={opcionIndex} // Valor de la opción seleccionada
                  onChange={() => manejarCambioRespuesta(index, opcionIndex)} // Llama a la función para guardar respuesta
                  checked={respuestas[index] === opcionIndex} // Verifica si está seleccionada
                />
                <label className="form-check-label">{opcion}</label> {/* Texto de la opción */}
              </div>
            ))}
            {pregunta.tipo === 'true-false' && ( // Muestra opciones para preguntas de verdadero/falso
              <>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`pregunta-${index}`}
                    value={true}
                    onChange={() => manejarCambioRespuesta(index, true)}
                    checked={respuestas[index] === true}
                  />
                  <label className="form-check-label">Verdadero.</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`pregunta-${index}`}
                    value={false}
                    onChange={() => manejarCambioRespuesta(index, false)}
                    checked={respuestas[index] === false}
                  />
                  <label className="form-check-label">Falso.</label>
                </div>
              </>
            )}
            {pregunta.tipo === 'open-ended' && ( // Muestra un campo de texto para preguntas abiertas
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={(e) => manejarCambioRespuesta(index, e.target.value)} // Guarda respuesta abierta
                  value={respuestas[index] || ""} // Valor del campo de texto
                  placeholder="Escribe tu respuesta aquí..." // Texto de guía en el campo
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button onClick={enviarRespuestas} className="btn btn-primary mt-4">Enviar Respuestas.</button> {/* Botón para enviar respuestas */}

      {completado && ( // Muestra resultados si el examen está completo
        <div className="resultado mt-4">
          <h4>Resultados del examen.</h4>
          <p>Puntaje Final: {puntaje} de {preguntas.length}</p> {/* Puntaje obtenido */}
          <p>{puntaje >= preguntas.length / 2 ? "¡Aprobado!" : "Reprobado."}</p> {/* Mensaje de aprobado o reprobado */}
          <button onClick={handleInicio} className='btn btn-primary'>Volver al inicio</button>
        </div>
      )}
    </div>
  );
}

// Exporta el componente para usarlo en otros archivos
export default ExamenFinal1;
