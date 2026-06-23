import './Product.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { setIndexConfiguration } from 'firebase/firestore';

function Product({ id, imagen, nombre, precio, stock, idFirebase }) {
  const producto = { id, nombre, precio, stock, imagen };
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);

  //const { addToCart } = useCart(); 
  // Traemos la función del contexto
  const { addToCart, getCantidadActual } = useCart();
  // Obtenemos la cantidad YA existente en el carrito desde el contexto
  const cantidadActual = getCantidadActual(producto.id);

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  const agregarAlCarrito = () => {
    if (cantidad === 0) {
      return;
    }

    addToCart(producto, cantidad);
    alert(`✅ Agregaste ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de ${nombre} al carrito`);
  }

  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className="tarjeta-producto">
      <img className="tarjeta-producto__imagen" src={imagen} alt={nombre} />
      <div className="tarjeta-producto__nombre-favorito">
        <h3 className="tarjeta-producto__nombre">{nombre}</h3>
        <span
          className={`tarjeta-producto__btn--favorito ${esFavorito ? 'favorito-activo' : 'favorito-inactivo'}`}
          onClick={marcarComoFavorito}
        >
          ★
        </span>
      </div>

      <p className="tarjeta-producto__precio">${precio}</p>

      <p className="tarjeta-producto__stock">Stock Disponible: {stock}</p>

      <div className="tarjeta-producto__contador">
        <button className="tarjeta-producto__btn" onClick={decrementar}>-</button>
        <p className="tarjeta-producto__cantidad">{cantidad}</p>
        <button className="tarjeta-producto__btn" onClick={incrementar}>+</button>
      </div>
      <p>Tenes {cantidadActual} {cantidadActual === 1 ? 'unidad' : 'unidades'} en el carrito</p>
      <button className="tarjeta-producto__btn--agregar" onClick={agregarAlCarrito}>Agregar al Carrito</button>
      <Link className="tarjeta-producto__link-detalle" to={`/producto/${id}`}>Ver más info.</Link>
    </div>

  );
}

export default Product;
