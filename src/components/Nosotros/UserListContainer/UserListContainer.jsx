import React, { useEffect, useState } from 'react';
import UserList from '../UserList/UserList';
import './UserListContainer.css';
import { db } from '../../../firebase/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export function UserListContainer({ Mensaje }) {
    const [nosotros, setNosotros] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
            const nosotrosCollection = collection(db, 'nosotros');
            getDocs(nosotrosCollection).then((resp) => {
                setNosotros(
                    resp.docs.map((doc) => {
                        return {  ...doc.data() , idFirebase: doc.id };
                    })
                );
            }).catch((error) => {
                setError(error.message);
            }).finally(() => {
                setCargando(false);
            });
        }, []);


    if (cargando) {
        return <p className="users-section__status">Cargando información de nosotros, por favor espere...</p>;
    }

    if (error) {
        return <p className="users-section__status users-section__status--error">Error de carga: {error}</p>;
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

            <UserList usuarios={nosotros} />
        </section>
    );
}

export default UserListContainer;