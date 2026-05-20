import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, clearCart, getCartTotal, getCartQuantity } = useCart();
    const total = getCartTotal();
    const totalProductos = getCartQuantity();

    if (cart.length === 0) {
        return (
            <section className="cart cart--empty">
                <div className="cart__empty-card">
                    <span className="cart__eyebrow">Tu tienda, lista para despegar</span>
                    <h1 className="cart__title">El carrito esta vacio</h1>
                    <p className="cart__description">
                        Todavia no agregaste productos. Explora el catalogo y arma una compra con tus favoritos.
                    </p>
                    <div className="cart__empty-actions">
                        <Link className="cart__primary-action" to="/productos">
                            Ver productos
                        </Link>
                        <Link className="cart__secondary-action" to="/ProductosDestacados">
                            Ir a destacados
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="cart">
            <header className="cart__hero">
                <div>
                    <span className="cart__eyebrow">Resumen de compra</span>
                    <h1 className="cart__title">Carrito de compras</h1>
                    <p className="cart__description">
                        Revisa tus productos, confirma cantidades y prepara el cierre de tu pedido.
                    </p>
                </div>

                <div className="cart__hero-stats">
                    <article className="cart__stat-card">
                        <span className="cart__stat-label">Productos</span>
                        <strong className="cart__stat-value">{totalProductos}</strong>
                    </article>
                    <article className="cart__stat-card cart__stat-card--accent">
                        <span className="cart__stat-label">Total</span>
                        <strong className="cart__stat-value">${total}</strong>
                    </article>
                </div>
            </header>

            <div className="cart__content">
                <div className="cart__items">
                    {cart.map(item => (
                        <article key={item.id} className="cart__item-card">
                            <div className="cart__item-main">
                                <span className="cart__item-badge">Producto #{item.id}</span>
                                <h2 className="cart__item-title">{item.nombre}</h2>
                                <p className="cart__item-meta">Precio unitario: ${item.precio}</p>
                            </div>

                            <div className="cart__item-grid">
                                <div className="cart__item-box">
                                    <span className="cart__item-label">Cantidad</span>
                                    <strong>{item.quantity}</strong>
                                </div>
                                <div className="cart__item-box">
                                    <span className="cart__item-label">Subtotal</span>
                                    <strong>${item.precio * item.quantity}</strong>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <aside className="cart__summary">
                    <div className="cart__summary-card">
                        <h2 className="cart__summary-title">Detalle final</h2>

                        <div className="cart__summary-row">
                            <span>Items cargados</span>
                            <strong>{totalProductos}</strong>
                        </div>
                        <div className="cart__summary-row">
                            <span>Envio</span>
                            <strong>Gratis</strong>
                        </div>
                        <div className="cart__summary-row cart__summary-row--total">
                            <span>Total a pagar</span>
                            <strong>${total}</strong>
                        </div>

                        <div className="cart__actions">
                            <Link className="cart__primary-action" to="/productos">
                                Seguir comprando
                            </Link>
                            <button className="cart__secondary-button" onClick={clearCart}>
                                Vaciar carrito
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Cart;