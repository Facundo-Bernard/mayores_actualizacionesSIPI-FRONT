import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import billetera from "../../assets/billetera.png";
import imagencurso2 from "../../assets/mayorcelular.jpg";
import seguridad from "../../assets/seguridad.jpg";
import tramite from "../../assets/tramite.jpg";
import imagencurso1 from "../../assets/tramites-dgt-mayores-65.jpg";
import './CURSOS_CARDS.css';
import CursoCard from './CURSO_CARD';

function CURSOS_CARDS() {
    const user = useSelector(state => state.user);
    const [progresoCurso1, setprogresoCurso1] = useState(0);
    const [progresoCurso2, setprogresoCurso2] = useState(0);
    const [progresoCurso3, setprogresoCurso3] = useState(0);
    const [progresoCurso4, setprogresoCurso4] = useState(0);
    const [progresoCurso5, setprogresoCurso5] = useState(0);
    const [progresoCurso6, setprogresoCurso6] = useState(0);

      const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProgreso = async () => {
            try {
                if (!user || !user.id) {
                    console.error("Usuario no definido o sin ID");
                    return;
                }

                const response = await fetch(`${API_URL}/progreso/obtenerUsuario/${user.id}`);
                if (!response.ok) throw new Error("Error en la respuesta del servidor");

                const data = await response.json();
                data.forEach(item => {
                    switch (item.cursoId) {
                        case 1:
                            setprogresoCurso1(item.progreso);
                            break;
                        case 2:
                            setprogresoCurso2(item.progreso);
                            break;
                        case 3:
                            setprogresoCurso3(item.progreso);
                            break;
                        case 4:
                            setprogresoCurso4(item.progreso);
                            break;
                        case 5:
                            setprogresoCurso5(item.progreso);
                            break;
                        case 6:
                            setprogresoCurso6(item.progreso);
                            break;
                        default:
                            break;
                    }
                });
            } catch (error) {
                console.error("Error al obtener progreso:", error);
            }
        };

        fetchProgreso();
    }, [user]);

    const cursos = [
        {
            title: 'Manejo de Mails',
            company: 'Mayores Actualizaciones',
            applied: progresoCurso1,
            capacity: 4,
            daysAgo: 1,
            category: 'Comunicación',
            image: imagencurso1,
            hoverText: 'Curso para aprender manejo básico de emails!',
            url: '/curso1-1'
        },
        {
            title: 'Uso Básico del Celular',
            company: 'Mayores Actualizaciones',
            applied: progresoCurso2,
            capacity: 4,
            daysAgo: 4,
            category: 'Dispositivos',
            image: imagencurso2,
            hoverText: "Curso para entender el funcionamiento básico del celular",
            url: '/curso2-1'
        },
        {
            title: 'Billeteras Virtuales y Compras en Línea',
            company: 'Mayores Actualizaciones',
            applied: progresoCurso6,
            capacity: 3,
            daysAgo: 2,
            category: 'Seguridad',
            hoverText: "Curso para manejar dinero más seguro",
            url: '/curso6-1',
            image: billetera
        },
        {
            title: 'Trámites Digitales',
            company: 'Mayores Actualizaciones',
            applied: progresoCurso4,
            capacity: 4,
            daysAgo: 2,
            category: 'Trámites',
            hoverText: "Curso para realizar trámites digitales",
            url: '/curso4-1',
            image: tramite
        },
        {
            title: 'Seguridad en Línea',
            company: 'Mayores Actualizaciones',
            applied: progresoCurso5,
            capacity: 4,
            daysAgo: 2,
            category: 'Seguridad',
            hoverText: "Curso para sentirse seguro",
            url: '/curso5-1',
            image: seguridad
        },
        
    ];

    const filteredCursos = user.black ? cursos : cursos.slice(0, -2);

    return (
        <div className="m-5 mb-3">
            <div className="row">
                {filteredCursos.map((curso, index) => (
                    <CursoCard
                        key={index}
                        hoverText={curso.hoverText}
                        title={curso.title}
                        company={curso.company}
                        applied={curso.applied}
                        capacity={curso.capacity}
                        daysAgo={curso.daysAgo}
                        category={curso.category}
                        image={curso.image}
                        url={curso.url}
                    />
                ))}
            </div>
        </div>
    );
}

export default CURSOS_CARDS;
