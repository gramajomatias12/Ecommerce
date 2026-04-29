import React from 'react';
import './User.css';

export function User({ persona }) {
    return (
        <li className="user-card">
            <div className="user-card__image-wrap">
                <img className="user-card__image" src={persona.foto} alt={`${persona.nombre} ${persona.apellido}`} />
            </div>
            <div className="user-card__content">
                <h3 className="user-card__name">{persona.nombre} {persona.apellido}</h3>
                <p className="user-card__role">{persona.puesto}</p>
                <a className="user-card__email" href={`mailto:${persona.email}`}>{persona.email}</a>
            </div>
        </li>
    );
}

export default User;