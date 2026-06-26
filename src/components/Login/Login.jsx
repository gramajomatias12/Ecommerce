import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const auth = getAuth();
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario logueado:", user);
                alert("¡Inicio de sesión exitoso!");
                navigate('/'); // Redirige a la página principal después del inicio de sesión exitoso
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Error en el login:", errorCode, errorMessage);
                alert("Error: " + errorMessage);
            });
    };
    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Ingresar</button>
                <p>¿No tenés una cuenta? <Link to="/registro">Registrate aquí</Link></p>
            </form>
        </div>
    );
};

export default Login;