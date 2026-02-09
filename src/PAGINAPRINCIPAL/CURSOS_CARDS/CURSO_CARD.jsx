import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CURSOS_CARDS.css';

function CursoCard({ title, company, applied, capacity, daysAgo, category, image, hoverText, url }) {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        const calculatedPercentage = (applied / capacity) * 100;
        setPercentage(calculatedPercentage);
    }, [applied, capacity]);

    return (
        <div className="col-md-4">
            <div className="card p-3 mb-2">
                <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex flex-row align-items-center">
                        <div className="ms-2 c-details">
                            <h6 className="mb-0">{company}</h6> 
                            <span>publicado hace {daysAgo} días</span>
                        </div>
                    </div>
                    <div className="badge">
                        <span>{category}</span>
                    </div>
                </div>
                <div className="image-container mt-3">
                    <img src={image} alt={title} className="card-image" />
                    <div className="hover-text">
                        {hoverText}
                    </div>
                </div>
                <div className="mt-5">
                    <h3 className="heading">{title}</h3>
                    <div className="mt-5">
                        <div className="progress">
                            <div className="progress-bar" style={{ width: `${percentage}%` }} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="mt-3">
                            <span className="text1">{applied} pasos 
                                <span className="text2"> de {capacity}</span>
                            </span>
                        </div>
                    </div>
                    {/* Usamos la URL pasada como prop */}
                    <div className="text-center mt-3">
                        <Link to={url} className="btn btn-primary">
                            Ver Curso
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CursoCard;
