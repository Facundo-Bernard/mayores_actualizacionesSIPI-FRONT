import 'animate.css/animate.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import React, { useState } from 'react'; 
import { useSelector } from 'react-redux'; 
import './ExamenFinal.css'; 

// Define las preguntas del examen en un array
const preguntas = [
  {
    tipo: 'multiple-choice', // Tipo de pregunta (opción múltiple)
    pregunta: "¿Qué es HTML?", // Texto de la pregunta
    opciones: [ // Opciones de respuesta
      "Un lenguaje de programación",
      "Un lenguaje de marcado",
      "Un sistema operativo",
      "Ninguna de las anteriores"
    ],
    respuestaCorrecta: 1 // Índice de la respuesta correcta
  },
  {
    tipo: 'multiple-choice',
    pregunta: "¿Qué se utiliza para dar estilo a un sitio web?",
    opciones: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP"
    ],
    respuestaCorrecta: 1
  },
  {
    tipo: 'true-false', // Tipo de pregunta (verdadero o falso)
    pregunta: "JavaScript es un lenguaje de programación. (V/F)",
    respuestaCorrecta: true // Respuesta correcta (true para Verdadero)
  },
  {
    tipo: 'open-ended', // Tipo de pregunta de respuesta abierta
    pregunta: "Describe brevemente qué es CSS.",
    respuestaCorrecta: "CSS es un lenguaje utilizado para dar estilo y diseño a documentos HTML."
  }
];

// Define el componente principal del examen
function ExamenFinal() {
  const user = useSelector((state) => state.user); // Obtiene la información del usuario desde el estado global (Redux)
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null)); // Estado para almacenar las respuestas del usuario
  const [puntaje, setPuntaje] = useState(0); // Estado para almacenar el puntaje del examen
  const [completado, setCompletado] = useState(false); // Estado para indicar si el examen ha sido completado

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
      if (preguntas[index].tipo === 'multiple-choice') { // Verifica si es de opción múltiple
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

    // Envía el progreso del usuario al backend (servidor)
    try {
      const response = await fetch(`http://localhost:8080/progreso/actualizar/${user.id}/3`, {
        method: "PUT", // Método HTTP para actualizar datos
        headers: {
          "Content-Type": "application/json" // Indica que el contenido es JSON
        },
        body: JSON.stringify({ // Cuerpo de la petición con datos a enviar
          usuario: user, // Usuario que completó el examen
          progreso: 3, // Ejemplo de valor de progreso
          completado: true, // Marca el progreso como completado
          examenPuntos: nuevoPuntaje, // Puntaje obtenido
          cursoId: 3 // ID del curso (en este caso 3)
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

  // Renderiza la interfaz del examen
  return (
    <div className="examen-final-container animate__animated animate__fadeIn">
      <h1 className="text-center my-4">Examen Final</h1> {/* Título del examen */}
      <div className="preguntas-container">
        {preguntas.map((pregunta, index) => ( // Itera sobre cada pregunta
          <div key={index} className="pregunta mb-4">
            <h5>{pregunta.pregunta}</h5> {/* Muestra la pregunta */}
            {pregunta.tipo === 'multiple-choice' && pregunta.opciones.map((opcion, opcionIndex) => (
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
                  <label className="form-check-label">Verdadero</label>
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
                  <label className="form-check-label">Falso</label>
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

      <button onClick={enviarRespuestas} className="btn btn-primary mt-4">Enviar Respuestas</button> {/* Botón para enviar respuestas */}

      {completado && ( // Muestra resultados si el examen está completo
        <div className="resultado mt-4">
          <h4>Resultados del Examen</h4>
          <p>Puntaje Final: {puntaje} de {preguntas.length}</p> {/* Puntaje obtenido */}
          <p>{puntaje >= preguntas.length / 2 ? "¡Aprobado!" : "Reprobado."}</p> {/* Mensaje de aprobado o reprobado */}
        </div>
      )}
    </div>
  );
}

// Exporta el componente para usarlo en otros archivos
export default ExamenFinal;
