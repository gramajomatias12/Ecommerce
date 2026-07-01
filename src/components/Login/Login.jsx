import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuario logueado:', user);
                alert('¡Inicio de sesión exitoso!');
                navigate('/');
            })
            .catch((authError) => {
                const errorCode = authError.code;
                const errorMessage = authError.message;
                console.error('Error en el login:', errorCode, errorMessage);
                alert('Error: ' + errorMessage);
            });
    };

    return (
        <section className={styles.authSection}>
            <div className={styles.card}>
                <p className={styles.kicker}>Acceso</p>
                <h2 className={styles.title}>Iniciar sesión</h2>
                <p className={styles.subtitle}>Entrá a tu cuenta para gestionar tu carrito y pedidos.</p>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="login-email">Correo electrónico</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="tuemail@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="login-password">Contraseña</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>Ingresar</button>

                    <p className={styles.helperText}>
                        ¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;