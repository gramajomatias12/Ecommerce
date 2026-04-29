import React, { useEffect, useState } from 'react';
import UserList from '../UserList/UserList';
import './UserListContainer.css';

export function UserListContainer({ Mensaje }) {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/Nosotros.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de nosotros');
                }

                return respuesta.json();
            })
            .then((datos) => {
                setUsuarios(datos);
            })
            .catch((detalleError) => {
                setError(detalleError.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p className="users-section__status">Cargando información de nosotros, por favor espere...</p>;
    }

    if (error) {
        return <p className="users-section__status users-section__status--error">Error: {error}</p>;
    }

    return (
        <section className="users-section">
            <div className="users-section__heading">
                <span className="users-section__kicker">Nuestro equipo</span>
                <h2 className="users-section__title">{Mensaje}</h2>
                <p className="users-section__description">
                    Personas que combinan desarrollo, diseño, pruebas y estrategia para que la experiencia de compra sea clara, rápida y confiable.
                </p>
            </div>

            <UserList usuarios={usuarios} />
        </section>
    );
}

export default UserListContainer;