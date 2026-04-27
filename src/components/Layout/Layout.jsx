import Header from './Header/Header'; 
import Footer from './Footer/Footer';

// Todo lo que pongamos dentro de <Layout> en App.jsx será el "children".
export function Layout({ children }) {
    return (
        <div>
            <Header/>
            
            <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
                {children}
            </main>
            
            <Footer />
        </div>);
}
