import './TarjetaProducto.css';

function TarjetaProducto({ imagen, nombre, precio }) {
  return (
    <div className="tarjeta-producto">
      <img className="tarjeta-producto__imagen" src={imagen} alt={nombre} />
      <h3 className="tarjeta-producto__nombre">{nombre}</h3>
      <p className="tarjeta-producto__precio">${precio}</p>
    </div>
  );
}

export default TarjetaProducto;
