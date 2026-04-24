import './App.css';
import { Layout } from './components/Layout/Layout';
import ProductListContainer from './components/Products/ProductListContainer/ProductListContainer';

function App() {
  return (
    <Layout>
      {/* Todo lo que pongamos acá adentro irá donde estaba {children} */}
      <ProductListContainer Mensaje="Nuestros productos destacados" />
    </Layout>
  );
}
export default App;
