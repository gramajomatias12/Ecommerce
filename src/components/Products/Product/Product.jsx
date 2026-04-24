import './Product.css';
import { useState } from 'react';

function Product({ imagen, nombre, precio, stock }) {

  const [cantidad, setCantidad] = useState(0);
  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };
  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };
  const agregarAlCarrito = () => {
    alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
  }

  return (
    <div className="tarjeta-producto">
      <img className="tarjeta-producto__imagen" src={imagen} alt={nombre} />
      <h3 className="tarjeta-producto__nombre">{nombre}</h3>

      <p className="tarjeta-producto__precio">${precio}</p>

      <p className="tarjeta-producto__stock">Stock Disponible: {stock}</p>

      <div className="tarjeta-producto__contador">
        <button className="tarjeta-producto__btn" onClick={decrementar}>-</button>
        <p className="tarjeta-producto__cantidad">{cantidad}</p>
        <button className="tarjeta-producto__btn" onClick={incrementar}>+</button>
      </div>
      <button className="tarjeta-producto__btn--agregar" onClick={agregarAlCarrito}>Agregar al Carrito</button>
    </div>

  );
}

export default Product;
