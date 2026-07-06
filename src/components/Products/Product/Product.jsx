import './Product.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

function Product({ id, imagen, nombre, precio, stock, idFirebase }) {
  const producto = { id, nombre, precio, stock, imagen };
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);

  //const { addToCart } = useCart(); 
  // Traemos la función del contexto
  const { addToCart, getCantidadActual } = useCart();
  // Obtenemos la cantidad YA existente en el carrito desde el contexto
  const cantidadActual = getCantidadActual(producto.id);
  const stockNumerico = Number(stock) || 0;
  const stockRestante = Math.max(stockNumerico - cantidadActual, 0);

  useEffect(() => {
    if (stockRestante === 0) {
      setCantidad(0);
      return;
    }

    if (cantidad > stockRestante) {
      setCantidad(stockRestante);
    }
  }, [cantidad, stockRestante]);

  const incrementar = () => {
    if (cantidad < stockRestante) {
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

    if (cantidad > stockRestante) {
      alert(`⚠️ Solo quedan ${stockRestante} ${stockRestante === 1 ? 'unidad' : 'unidades'} disponibles`);
      return;
    }

    addToCart(producto, cantidad);
    alert(`✅ Agregaste ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de ${nombre} al carrito`);
    setCantidad(0);
  };

  const marcarComoFavorito = () => {
    setEsFavorito(!esFavorito);
  };

  return (
    <div className="tarjeta-producto">
      <img className="tarjeta-producto__imagen" src={imagen} alt={nombre} />
      <div className="tarjeta-producto__cabecera">
        <h3 className="tarjeta-producto__nombre" title={nombre}>{nombre}</h3>
        <button
          type="button"
          className={`tarjeta-producto__btn--favorito ${esFavorito ? 'favorito-activo' : 'favorito-inactivo'}`}
          onClick={marcarComoFavorito}
          aria-label={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          ★
        </button>
      </div>

      <p className="tarjeta-producto__precio">${precio}</p>

      <div className="tarjeta-producto__resumen">
        <p className="tarjeta-producto__stock">
          <span>Stock</span>
          <strong>{stockRestante}</strong>
        </p>
        <p className="tarjeta-producto__en-carrito">
          <span>En carrito</span>
          <strong>{cantidadActual} {cantidadActual === 1 ? 'unidad' : 'unidades'}</strong>
        </p>
      </div>

      <div className="tarjeta-producto__contador">
        <button className="tarjeta-producto__btn" onClick={decrementar} disabled={cantidad === 0}>-</button>
        <p className="tarjeta-producto__cantidad">{cantidad}</p>
        <button className="tarjeta-producto__btn" onClick={incrementar} disabled={stockRestante === 0 || cantidad >= stockRestante}>+</button>
      </div>

      <div className="tarjeta-producto__acciones">
        <button className="tarjeta-producto__btn--agregar" onClick={agregarAlCarrito} disabled={stockRestante === 0 || cantidad === 0}>Agregar al Carrito</button>
        <Link className="tarjeta-producto__link-detalle" to={`/producto/${id}`}>Ver más info.</Link>
      </div>
    </div>

  );
}

export default Product;
