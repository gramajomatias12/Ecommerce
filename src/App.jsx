import './App.css';
import { Layout } from './components/Layout/Layout';
import UserListContainer from './components/Nosotros/UserListContainer/UserListContainer';
import ProductListContainer from './components/Products/ProductListContainer/ProductListContainer';

function App() {
  return (
    <Layout>
      {/* Todo lo que pongamos acá adentro irá donde estaba {children} */}
      <ProductListContainer Mensaje="Nuestros productos destacados" />
      <UserListContainer Mensaje="Conoce al equipo detrás de nuestro éxito" />
    </Layout>
  );
}

export default App;
