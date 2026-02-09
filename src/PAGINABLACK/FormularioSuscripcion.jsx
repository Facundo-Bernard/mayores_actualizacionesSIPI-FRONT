import '@mercadopago/sdk-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './FormularioSuscripcion.css';

function FormularioSuscripcion() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  // Manejo de cambio en los campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log("Campo actualizado:", name, value);  // Log para verificar los cambios en los campos
  };

  // Validación simple del formulario
  useEffect(() => {
    const isValid = formData.nombre.trim() && formData.email.includes('@');
    setIsFormValid(isValid);
    console.log("Formulario válido:", isValid);  // Log para ver si el formulario es válido
  }, [formData]);

  // Configuración de Mercado Pago para crear el botón de pago
  const handleMercadoPago = async () => {
    try {
      const response = await axios.post('http://localhost:3000/payment/new', {
        name: 'Producto',
        price: 100,
        unit: 1,
        img: 'image_url',
      });
  
      const { pref_id } = response.data;
      // Redirigimos al usuario a la URL de MercadoPago
      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${pref_id}`;
    } catch (error) {
      console.error("Error creando la preferencia:", error);
    }
  };
  

  return (
    <div className="form-container d-flex flex-column align-items-center justify-content-center">
      <h2>Suscripción</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="form-control mb-3"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={formData.email}
        onChange={handleChange}
        className="form-control mb-3"
      />
      <button
        className="btn btn-primary"
        onClick={handleMercadoPago}
        disabled={!isFormValid}
      >
        Generar botón de pago
      </button>
      <div className="payment-button mt-3"></div>
    </div>
  );
}

export default FormularioSuscripcion;
