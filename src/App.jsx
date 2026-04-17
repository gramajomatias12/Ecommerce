import './App.css';
import { Layout } from './components/Layout/Layout';
import TarjetaProducto from './components/TarjetaProducto/TarjetaProducto';

function App() {
  return (
    <Layout>
      {/* Todo lo que pongamos acá adentro irá donde estaba {children} */}
      <h2>Productos destacados</h2>

      <div className="contenedor-tarjetas">
      <TarjetaProducto
        imagen="https://picsum.photos/200/300?random=1"
        nombre="Producto 1"
        precio={150000}
      />

      <TarjetaProducto
        imagen="https://picsum.photos/200/300?random=2"
        nombre="Producto 2"
        precio={40000}
      />

      <TarjetaProducto
        imagen="https://picsum.photos/200/300?random=3"
        nombre="Producto 3"
        precio={90000}
      />
      </div>
    </Layout>
  );
}
export default App;
