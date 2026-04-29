import React from 'react';
import User from '../User/User';
import './UserList.css';

export function UserList({ usuarios }) {
    return (
        <ul className="user-list">
            {usuarios.map((persona) => (
                <User key={persona.id} persona={persona} />
            ))}
        </ul>
    );
}

export default UserList;