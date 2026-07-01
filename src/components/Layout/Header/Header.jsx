import { useState } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        setIsAccountOpen(false);
    };

    const closePanels = () => {
        setIsMenuOpen(false);
        setIsAccountOpen(false);
    };


    return (
        <header className={styles.header}>
            <div className={styles.headerTop}>
                <p className={styles.kicker}>NexoTech</p>
                <div className={styles.mobileActions}>
                    <button
                        type="button"
                        className={styles.accountToggle}
                        onClick={() => {
                            setIsAccountOpen((prev) => !prev);
                            setIsMenuOpen(false);
                        }}
                        aria-expanded={isAccountOpen}
                        aria-label="Abrir o cerrar panel de cuenta"
                    >
                        Mi cuenta
                    </button>
                    <button
                        type="button"
                        className={styles.menuToggle}
                        onClick={() => {
                            setIsMenuOpen((prev) => !prev);
                            setIsAccountOpen(false);
                        }}
                        aria-expanded={isMenuOpen}
                        aria-label="Abrir o cerrar menú"
                    >
                        {isMenuOpen ? 'Cerrar' : 'Menú'}
                    </button>
                </div>
                <div className={`${styles.authDock} ${styles.authDockDesktop}`}>
                    {user ? (
                        <div className={styles.userPanel}>
                            <span className={styles.userGreeting} title={user.email}>¡Hola, {user.email}!</span>
                            
                            <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <div className={styles.authLinks}>
                            <NavLink to="/login" className={({ isActive }) => isActive ? styles.activeLink : ''}>
                                Ingresar
                            </NavLink>
                            <NavLink to="/registro" className={({ isActive }) => isActive ? styles.activeLink : ''}>
                                Registrarme
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.brandBlock}>
                <h1 className={styles.title}>Tecnologia y accesorios para tu setup ideal</h1>
            </div>

            <div className={`${styles.mobileAccountPanel} ${isAccountOpen ? styles.mobileAccountPanelOpen : ''}`}>
                <div className={`${styles.authDock} ${styles.authDockMobile}`}>
                    {user ? (
                        <div className={styles.userPanel}>
                            <span className={styles.userGreeting} title={user.email}>¡Hola, {user.email}!</span>
                            {user.rol === 'admin' && <span className={styles.adminBadge}>Admin</span>}
                            <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <div className={styles.authLinks}>
                            <NavLink to="/login" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closePanels}>
                                Ingresar
                            </NavLink>
                            <NavLink to="/registro" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closePanels}>
                                Registrarme
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>

            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                <ul className={styles.navList}>

                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closePanels}>
                            Inicio
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/productos" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closePanels}>
                            Productos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/nosotros" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closePanels}>
                            Nosotros
                        </NavLink>
                    </li>

                    {user?.rol === 'admin' && (
                        <li>
                            <NavLink to="/gestion-productos" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closePanels}>
                                Gestión de Productos
                            </NavLink>
                        </li>
                    )}

                    <li>
                        <NavLink to="/carrito" className={({ isActive }) => isActive ? styles.activeLink : ''} onClick={closePanels}>
                            Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </header>
    );
}


export default Header;