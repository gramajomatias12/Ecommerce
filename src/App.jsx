import './App.css';
import { Layout } from './components/Layout/Layout';
import UserListContainer from './components/Nosotros/UserListContainer/UserListContainer';
import ProductListContainer from './components/Products/ProductListContainer/ProductListContainer';
import { Routes, Route } from 'react-router-dom';
import ProductoDetalle from './components/Products/ProductoDetalle/ProductoDetalle';
import Inicio from './components/Inicio/inicio';
import Cart from './components/Cart/Cart';
import GestionProductos from './components/GestionProductos/GestionProductos';
import Login from './components/Login/Login';
import Registro from './components/Registro/Registro';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import GestionCupones from './components/GestionCupones/GestionCupones';

function App() {
  return (
    <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />

        <Route path="/productos" element={<ProductListContainer Mensaje={"Productos"} />} />

        <Route path="/gestion-productos" element={<ProtectedRoute><GestionProductos /></ProtectedRoute>} />

        <Route path="/gestion-cupones" element={<ProtectedRoute><GestionCupones /></ProtectedRoute>} />

        <Route path="/producto/:id" element={<ProductoDetalle />} />

        <Route path="/nosotros" element={<UserListContainer />} />

        <Route path="/ProductosDestacados" element={<ProductListContainer Mensaje={"Productos Destacados"} destacados={true} />} />

        <Route path="/carrito" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Route>
    </Routes>);
}

export default App;
