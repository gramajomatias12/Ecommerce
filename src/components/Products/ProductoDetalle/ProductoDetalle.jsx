import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductoDetalle.css';

const ProductoDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [esFavorito, setEsFavorito] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/data/Products.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id));
                if (!productoEncontrado) {
                    setError('Producto no encontrado');
                } else {
                    setProducto(productoEncontrado);
                }
                setCargando(false);
            })
            .catch(error => {
                console.error("Error al cargar el producto:", error);
                setError('Error al cargar el producto');
                setCargando(false);
            });
    }, [id]);

    const incrementar = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const agregarAlCarrito = () => {
        alert(`✅ Agregaste ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de ${producto.nombre} al carrito`);
    };

    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito);
    };

    if (cargando) {
        return (
            <div className="producto-detalle-container">
                <div className="skeleton-loader">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-price"></div>
                        <div className="skeleton-description"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !producto) {
        return (
            <div className="producto-detalle-container error-state">
                <div className="error-content">
                    <h2>❌ {error || 'Producto no encontrado'}</h2>
                    <button className="volver-btn" onClick={() => navigate('/productos')}>
                        Volver a Productos
                    </button>
                </div>
            </div>
        );
    }

    const precioTotal = producto.precio * cantidad;

    return (
        <div className="producto-detalle-container">
            <button className="volver-btn-top" onClick={() => navigate(-1)}>← Volver</button>

            <div className="detalle-grid">
                {/* Imagen */}
                <div className="imagen-section">
                    <div className="imagen-principal">
                        <img src={producto.imagen} alt={producto.nombre} />
                    </div>
                </div>

                {/* Info del producto */}
                <div className="info-section">
                    <div className="encabezado">
                        <h1 className="nombre-producto">{producto.nombre}</h1>
                        <button className="favorito-btn" onClick={marcarComoFavorito}>
                            <span className={esFavorito ? 'activo' : ''}>{esFavorito ? '★' : '☆'}</span>
                        </button>
                    </div>

                    {/* Calificación */}
                    <div className="rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating-text">(127 reseñas)</span>
                    </div>

                    {/* Precio */}
                    <div className="seccion-precio">
                        <div className="precio-info">
                            <span className="precio-actual">${precioTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Stock */}
                    <div className="stock-info">
                        {producto.stock > 0 ? (
                            <>
                                <span className="stock-disponible">✓ En Stock</span>
                                <span className="stock-cantidad">({producto.stock} disponibles)</span>
                            </>
                        ) : (
                            <span className="sin-stock">✗ Agotado</span>
                        )}
                    </div>

                    {/* Contador de cantidad */}
                    <div className="cantidad-section">
                        <label>Cantidad:</label>
                        <div className="contador">
                            <button className="btn-cantidad" onClick={decrementar} disabled={cantidad <= 1}>−</button>
                            <input type="number" value={cantidad} readOnly className="cantidad-input" />
                            <button className="btn-cantidad" onClick={incrementar} disabled={cantidad >= producto.stock}>+</button>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="acciones">
                        <button className="btn-comprar" onClick={agregarAlCarrito} disabled={producto.stock === 0}>
                            🛒 Agregar al Carrito
                        </button>
                    </div>

                    {/* Descripción */}
                    <div className="descripcion-section">
                        <h3>Descripción del Producto</h3>
                        <p>{producto.descripcion || 'Producto de tecnología de alta calidad. Disfruta de la mejor experiencia en tu hogar u oficina.'}</p>
                    </div>

                    {/* Características */}
                    <div className="caracteristicas-section">
                        <h3>Características</h3>
                        <ul className="caracteristicas-list">
                            <li>✓ Garantía de 1 año</li>
                            <li>✓ Envío gratis a todo el país</li>
                            <li>✓ Devolución en 30 días</li>
                            <li>✓ Soporte técnico 24/7</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductoDetalle;