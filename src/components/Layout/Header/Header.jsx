import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

function Header() {
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();

    return (
        <header className={styles.header}>
            <div className={styles.brandBlock}>
                <p className={styles.kicker}>NexoTech</p>
                <h1 className={styles.title}>Tecnologia y accesorios para tu setup ideal</h1>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : ''}>
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/productos" className={({ isActive }) => isActive ? styles.activeLink : ''}>
                            Productos
                        </NavLink>
                    </li>
                    {/* <li><Link to="/destacados">Destacados</Link></li> */}
                    <li>
                        <NavLink to="/gestion-productos" className={({ isActive }) => isActive ? styles.activeLink : ''}>
                            Gestión de Productos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/nosotros" className={({ isActive }) => isActive ? styles.activeLink : ''}>
                            Nosotros
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/carrito" className={({ isActive }) => isActive ? styles.activeLink : ''}>
                            Carrito 🛒 {totalItems > 0 &&<span>{totalItems}</span>}
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </header>
    );
}


export default Header;