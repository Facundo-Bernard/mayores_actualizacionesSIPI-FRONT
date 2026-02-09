import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CURSOEJEMPLO.css';

function CURSO1P1() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [progressCreated, setProgressCreated] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const canCreateProgress = useMemo(() => {
    return Boolean(user && user.id && !progressCreated);
  }, [user, progressCreated]);

  const createProgressIfNeeded = async () => {
    if (!canCreateProgress) return;

    try {
      const response = await fetch(`${API_URL}/progreso/obtenerUsuario/${user.id}`);
      if (!response.ok) throw new Error(`Error obtener progreso: ${response.status}`);

      const progressData = await response.json();
      const existingCourse = Array.isArray(progressData)
        ? progressData.find((curso) => curso.cursoId === 1)
        : null;

      if (!existingCourse) {
        const createRes = await fetch(`${API_URL}/progreso/crear`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuario: user,
            progreso: 1,
            completado: false,
            examenPuntos: 0,
            cursoId: 1,
          }),
        });

        if (!createRes.ok) throw new Error(`Error crear progreso: ${createRes.status}`);

        setProgressCreated(true);
      }
    } catch (error) {
      console.error('Error al verificar o crear progreso', error);
      // No frenamos la navegación: el usuario igual puede avanzar
    }
  };

  const handleNextStage = async () => {
    await createProgressIfNeeded();
    navigate('/curso1-25');
  };

  const handleInicio = () => {
    navigate('/pagina-principal');
  };

  return (
    <div className="c1-page">
      <div className="c1-shell animate__animated animate__fadeIn">
        {/* Header */}
        <header className="c1-header">
          <div className="c1-badge">Curso 1 · Módulo 1</div>

          <h1 className="c1-title">
            Bienvenido al curso de manejo de correos electrónicos
          </h1>

          <p className="c1-subtitle">
            Aprendé a acceder y navegar dentro de tu correo, reconociendo las secciones principales.
          </p>
        </header>

        {/* Hero */}
        <section className="c1-hero">
          <div className="c1-hero-imgWrap">
            <img
              src="https://gestion.pe/resizer/8yvfXTwsDf6YMP-7GZBXJ0yJ9nk=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/6C7QFZTXMBBURMD2PNDE3HVHW4.jpg"
              alt="Persona usando correo electrónico"
              className="c1-hero-img"
              loading="lazy"
            />
          </div>

          <div className="c1-hero-card">
            <h2 className="c1-hero-title">Objetivo del módulo</h2>
            <p className="c1-hero-text">
              Que puedas entrar a tu correo, identificar carpetas (Recibidos, Enviados, Papelera, Spam)
              y entender cómo se muestran los mensajes leídos y no leídos.
            </p>
          </div>
        </section>

        {/* Content cards */}
        <section className="c1-grid">
          <article className="c1-card">
            <h3 className="c1-card-title">Módulo 1: Navegación básica en la bandeja de entrada</h3>
            <p className="c1-card-text">
              Para ingresar a tu cuenta de correo, abrí un navegador (por ejemplo Google Chrome o Safari)
              y entrá al servicio que uses (Gmail u Outlook). Ingresá tu dirección de correo y contraseña,
              y luego tocá “Iniciar sesión”.
              <br /><br />
              Dentro de la bandeja de entrada vas a ver:
              <strong> Recibidos</strong> (correos nuevos), <strong>Enviados</strong> (copia de lo enviado),
              <strong> Papelera/Eliminados</strong> (lo borrado) y <strong>Spam</strong> (sospechosos).
              Los mensajes no leídos suelen aparecer en negrita.
            </p>
          </article>

          <article className="c1-card">
            <h3 className="c1-card-title">Módulo 2: Cómo escribir y enviar un correo</h3>
            <p className="c1-card-text">
              Buscá el botón <strong>“Redactar”</strong> o <strong>“Nuevo”</strong>. Se abre una ventana
              con el campo <strong>“Para”</strong> (destinatario) y el campo <strong>“Asunto”</strong>
              (tema del mensaje).
              <br /><br />
              Escribí el contenido en el área grande, revisá si hay errores y presioná <strong>“Enviar”</strong>.
              Si querés mandar a varias personas, separá correos con comas.
            </p>
          </article>
        </section>

        {/* Why */}
        <section className="c1-callout animate__animated animate__fadeInUp">
          <h2 className="c1-callout-title">¿Por qué tomar este curso?</h2>
          <p className="c1-callout-text">
            Dominar el correo electrónico te ayuda a comunicarte, recibir avisos importantes, hacer trámites
            y ganar independencia digital. También vas a poder organizar mensajes y adjuntar documentos con confianza.
          </p>
        </section>

        {/* Actions */}
        <footer className="c1-actions">
          <button onClick={handleInicio} className="btn btn-outline-dark c1-btn">
            Volver al inicio
          </button>

          <button onClick={handleNextStage} className="btn btn-dark c1-btn">
            Siguiente módulo
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CURSO1P1;
