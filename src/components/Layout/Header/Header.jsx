import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Bienvenidos a Digital Store</h1>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Productos</a></li>
                    <li><a href="#">Contacto</a></li>
                    <li><a href="#">Carrito</a></li>
                </ul>
                
            </nav>
        </header>
    );
}

export default Header;