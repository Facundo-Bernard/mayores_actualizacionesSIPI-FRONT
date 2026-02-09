import 'animate.css/animate.min.css'; // Importación de animaciones 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FOOTER from '../PAGINAPRINCIPAL/FOOTER';
import BANNER from './BANNERLOGIN/BANNER';
import "./LOGIN.css";

function LOGIN({ loginButtonRef }) {
  const [username, setUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [userType, setUserType] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLoginUsernameChange = (e) => setUsername(e.target.value);
  const handleLoginPasswordChange = (e) => setLoginPassword(e.target.value);
  const handleRegisterNameChange = (e) => setName(e.target.value);
  const handleRegisterEmailChange = (e) => setEmail(e.target.value);
  const handleRegisterPasswordChange = (e) => setRegisterPassword(e.target.value);
  const handleUserTypeChange = (e) => setUserType(parseInt(e.target.value));

  const crearUsuario = async () => {
    // Verifica si los campos están llenos y tienen el formato adecuado
    if (name === "") {
      alert("El nombre de usuario es obligatorio.");
      return;
    }
    if (!email.includes("@")) {
      alert("El correo debe contener un '@'.");
      return;
    }
    if (registerPassword.length < 5) {
      alert("La contraseña debe tener al menos 5 caracteres.");
      return;
    }

    try {
      // Fetch de los usuarios existentes para verificar duplicados
      const response = await fetch(`${API_URL}/usuario`);
      if (!response.ok) {
        alert("Error en el servidor al verificar usuarios.");
        return;
      }

      const usuarios = await response.json();
      
      // Verificar si el nombre de usuario ya existe
      const userExists = usuarios.some((user) => user.name === name);
      if (userExists) {
        alert("El nombre de usuario ya está registrado.");
        return;
      }

      // Crear el usuario si pasa todas las validaciones
      const registerResponse = await fetch(`${API_URL}/usuario/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: registerPassword,
          tipoUsuario: userType
        }),
      });

      if (registerResponse.ok) {
        alert("Usuario registrado exitosamente.");
        // Resetear los campos del formulario
        setName("");
        setEmail("");
        setRegisterPassword("");
        setUserType(1);
      } else {
        alert("Error al registrar el usuario.");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Hubo un error al intentar registrar el usuario.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/usuario`);

      if (!response.ok) {
        console.error(`Error fetching users: ${response.status} ${response.statusText}`);
        alert("Error en el servidor al intentar iniciar sesión.");
        return;
      }

      const usuarios = await response.json();

      if (!Array.isArray(usuarios)) {
        console.error("La respuesta del servidor no es un arreglo:", usuarios);
        alert("Formato de respuesta inesperado del servidor.");
        return;
      }

      const user = usuarios.find((u) => u.name === username && u.password === loginPassword);

      if (user) {
        dispatch({
          type: 'LOGIN',
          payload: {
            name: user.name,
            tipoUsuario: user.tipoUsuario,
            id: user.id,
            black:user.black
          }
        });
        navigate('/pagina-principal');
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al intentar iniciar sesión.");
    }
  };

  return (
    <div>
      <BANNER />
      <section className="container my-5 animate__animated animate__fadeIn">
        <div className="row">
          <div className="col-md-6">
            <div className="blurred-section">
              <h2>¿Qué es Mayores Actualizaciones?</h2>
              <p>Mayores Actualizaciones es un servicio orientado a ayudar a gente mayor a manejarse mejor en el mundo digital.</p>
              <p>Aquí puedes encontrar cursos para ayudarte a aprender a usar diversas tecnologías y a existir en un mundo digital.</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <h2>Login</h2>
                <form className="animate__animated animate__fadeInLeft">
                  <div className="form-group mb-3">
                    <label>Nombre:</label>
                    <input type="text" className="form-control" value={username} onChange={handleLoginUsernameChange} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Contraseña:</label>
                    <input type="password" className="form-control" value={loginPassword} onChange={handleLoginPasswordChange} />
                  </div>
                  <button type="button" ref={loginButtonRef} className="btn btn-primary btn-block" onClick={handleLogin}>
                    Login
                  </button>
                </form>
              </div>

              <div className="col-md-6">
                <h2>Registro</h2>
                <form className="animate__animated animate__fadeInRight">
                  <div className="form-group mb-3">
                    <label>Nombre:</label>
                    <input type="text" className="form-control" value={name} onChange={handleRegisterNameChange} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={handleRegisterEmailChange} />
                  </div>
                  <div className="form-group mb-3">
                    <label>Contraseña:</label>
                    <input type="password" className="form-control" value={registerPassword} onChange={handleRegisterPasswordChange} />
                  </div>
                  <button type="button" className="btn btn-success btn-block" onClick={crearUsuario}>
                    Registrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FOOTER />
    </div>
  );
}

export default LOGIN;
