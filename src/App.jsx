import './App.css';
import { Layout } from './components/Layout/Layout';
import UserListContainer from './components/Nosotros/UserListContainer/UserListContainer';
import ProductListContainer from './components/Products/ProductListContainer/ProductListContainer';
import { FormularioContainer } from './components/FormularioProductos/FormularioContainer/FormularioContainer';
import { Routes, Route } from 'react-router-dom';
import ProductoDetalle from './components/Products/ProductoDetalle/ProductoDetalle';
import Inicio from './components/Inicio/inicio';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />

        <Route path="/productos" element={<ProductListContainer Mensaje={"Productos"} />} />

        <Route path="/alta" element={<FormularioContainer />} />

        <Route path="/producto/:id" element={<ProductoDetalle />} />

        <Route path="/nosotros" element={<UserListContainer />} />

        <Route path="/ProductosDestacados" element={<ProductListContainer Mensaje={"Productos Destacados"} destacados={true} />} />

        <Route path="/carrito" element={<Cart />} />

        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Route>
    </Routes>);
}

export default App;
