import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './BANNER.css';
import NAVBAR from "../../PAGINAPRINCIPAL/NAVBAR"
import { useRef } from 'react';
function BANNER() {
  const loginButtonRef = useRef(null);
  return (
    <>
        <NAVBAR scrollToLogin={loginButtonRef}></NAVBAR>
        <div class="banner-container">
            <div class="banner-content">
                <h1>Bienvenido a Mayores actualizaciones</h1>
                <p>Actualizando Mayores con cursos y educacion desde 2024</p>
            </div>
        </div>

    </>
  );
}
export default BANNER;
