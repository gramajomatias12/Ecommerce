import Header from './Header/Header'; 
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children".
export function Layout() {
    return (
        <div className={styles.page}>
            <Header/>
            
            <main className={styles.main}>
                <Outlet />
            </main>
            
            <Footer />
        </div>);
}

export default Layout;