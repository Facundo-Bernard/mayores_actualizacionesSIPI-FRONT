import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import "./AI.css";

function AI() {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Oculta el mensaje después de 3 segundos
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, []);

  return (
    <>
      {/* Mensaje de bienvenida */}
      {showMessage && (
        <div className="fade-out-message">
          Hola, soy TATA tu asistente virtual!
        </div>
      )}

      {/* Integración de Dialogflow */}
      <link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"></link>
      <script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
      <df-messenger
  project-id="quantum-studio-441313-b0"
  agent-id="a9651606-eb55-4859-9ec8-4df45302c106"
  language-code="es"
  max-query-length="-1">
  <df-messenger-chat-bubble
    chat-title="TATA">
  </df-messenger-chat-bubble>
</df-messenger>
    </>
  );
}

export default AI;
