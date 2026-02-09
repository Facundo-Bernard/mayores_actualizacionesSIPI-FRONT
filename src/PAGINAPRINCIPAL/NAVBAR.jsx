import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.jpg";

function NAVBAR({ scrollToLogin }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const progreso = useSelector(state => state.progreso);

    // Calcular la suma de puntos
    const totalPuntos = progreso.reduce((acc, curr) => acc + curr.examenPuntos, 0);

    useEffect(() => {
        const fetchProgreso = async () => {
            if (user?.id) {
                try {
                    const response = await fetch(`http://localhost:8080/progreso/obtenerUsuario/${user.id}`);
                    const data = await response.json();
                    // Despachar la acción directamente desde el componente
                    dispatch({
                        type: 'LOAD_PROGRESO',
                        payload: data,
                    });
                } catch (error) {
                    console.error('Error al cargar el progreso:', error);
                }
            }
        };
        
        fetchProgreso();
    }, [dispatch, user]);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img height="110" src={logo} alt="Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {user?.name ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Bienvenido {user.name} !!</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">Total de puntos: {totalPuntos}</span>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn nav-link">
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <span className="nav-link">Inicia sesión para ver tus puntos</span>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NAVBAR;
