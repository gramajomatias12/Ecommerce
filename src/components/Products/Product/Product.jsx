import './Product.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Product({ id, imagen, nombre, precio, stock }) {

  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);

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
      <button className="tarjeta-producto__btn--agregar" onClick={agregarAlCarrito}>Agregar al Carrito</button>
      <Link className="tarjeta-producto__link-detalle" to={`/producto/${id}`}>Ver más info.</Link>
    </div>

  );
}

export default Product;
