import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div>
                    <h2 className={styles.brand}>NexoTech</h2>
                    <p className={styles.subtitle}>Tecnologia seleccionada para trabajo, gaming y estudio.</p>
                </div>

                <div className={styles.meta}>
                    <p>Catalogo actualizado semanalmente</p>
                    <p>Soporte por correo en 24 hs</p>
                </div>
            </div>

            <p className={styles.copy}>&copy; 2026 - NexoTech. E-commerce de tecnologia</p>
        </footer>
    );
}

export default Footer;
