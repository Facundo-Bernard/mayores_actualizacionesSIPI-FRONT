import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import NAVBAR from "../PAGINAPRINCIPAL/NAVBAR";
import './SuscripcionBlack.css';

function SuscripcionBlack() {
    return (
        <div>
            <NAVBAR />
            <div className="subscription-container d-flex align-items-center justify-content-center">
                <div className="card cardblack subscription-card text-center">
                    <h1 className="subscription-title mb-4">Servicio Black</h1>
                    <p className="subscription-price mb-4">$3 <span>USD/mes</span></p>
                    <p className="subscription-description">
                        ¡Disfruta de beneficios exclusivos con Servicio Black! Accede a contenido premium, soporte personalizado, y mucho más.
                    </p>
                    <div className="feature-list mt-5 mb-5">
                        <ul>
                            <li>🌟 Acceso ilimitado a cursos premium</li>
                            <li>🛠 Soporte 24/7 con atención prioritaria</li>
                            <li>🔒 Actualizaciones exclusivas y contenido nuevo</li>
                            <li>💸 Descuentos en futuras suscripciones</li>
                        </ul>
                    </div>

                    {/* Usa un elemento <a> para abrir el enlace en una nueva pestaña */}
                    <a
                        href="https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=bafa116d9c0e42bda5ece8a10bbaddab"
                        className="btn subscribe-button mt-4"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Suscribirme Ahora
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SuscripcionBlack;
