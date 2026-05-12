import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Bienvenidos a Digital Store</h1>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    {/* <li><Link to="/destacados">Destacados</Link></li> */}
                    <li><Link to="/alta">Alta de Productos</Link></li>
                </ul>
            </nav>
        </header>
    );
}


export default Header;