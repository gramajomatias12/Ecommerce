import './App.css';
import { Layout } from './components/Layout/Layout';
import UserListContainer from './components/Nosotros/UserListContainer/UserListContainer';
import ProductListContainer from './components/Products/ProductListContainer/ProductListContainer';
import { FormularioContainer } from './components/FormularioProductos/FormularioContainer/FormularioContainer';
import { Routes, Route } from 'react-router-dom';
import ProductoDetalle from './components/Products/ProductoDetalle/ProductoDetalle';

function App() {
  // return (
  //   <Layout>
  //     {/* Todo lo que pongamos acá adentro irá donde estaba {children} */}
  //     <ProductListContainer Mensaje="Nuestros productos destacados" />
  //     <UserListContainer Mensaje="Conoce al equipo detrás de nuestro éxito" />
  //     <FormularioContainer />
  //   </Layout>
  // );
  return (
    <Routes>{/*envuelve a las demás para mostrar Header y Footer siempre */}
      <Route element={<Layout />}>
        <Route path="/" element={<h1>Página de Inicio</h1>} />

        <Route path="/productos" element={<ProductListContainer
          Mensaje={"Productos destacados"} />} />

        {/* <Route path="/destacados" element={<Productos
          Mensaje={"Todos los productos"} />} /> */}

        <Route path="/alta" element={<FormularioContainer />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Route>
    </Routes>);
}

export default App;
