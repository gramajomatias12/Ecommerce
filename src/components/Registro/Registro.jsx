import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './Registro.module.css';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (authError) {
            if (authError.code === 'auth/email-already-in-use') {
                const quiereLoguearse = window.confirm(
                    'Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión ? '
                );
                if (quiereLoguearse) {
                    navigate('/login');
                } else {
                    navigate('/');
                }
            } else {
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error('Error en el registro:', authError.message);
            }
        }
    };

    return (
        <section className={styles.authSection}>
            <div className={styles.card}>
                <p className={styles.kicker}>Nuevo usuario</p>
                <h2 className={styles.title}>Crear una cuenta</h2>
                <p className={styles.subtitle}>Registrate para comprar más rápido y seguir tus pedidos.</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="registro-email">Correo electrónico</label>
                        <input
                            id="registro-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="tuemail@ejemplo.com"
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="registro-password">Contraseña</label>
                        <input
                            id="registro-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Mínimo 6 caracteres"
                        />
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button type="submit" className={styles.submitButton}>Registrarme</button>

                    <p className={styles.helperText}>
                        ¿Ya tenés cuenta? <Link to="/login">Ingresá aquí</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};
export default Registro;