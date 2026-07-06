import React, { useState, useContext, createContext } from 'react';

// useState → para guardar y actualizar el carrito.
// useContext → para poder consumir el contexto desde los componentes.
// createContext → para crear el contexto.

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        if (quantity <= 0) return;

        setCart(prevCart => {
            const itemInCart = prevCart.find(item => item.id === product.id);
            const cantidadActual = itemInCart ? itemInCart.quantity : 0;
            const stockProducto = Number(product.stock) || 0;
            const cantidadDisponible = Math.max(stockProducto - cantidadActual, 0);
            const cantidadAAgregar = Math.min(quantity, cantidadDisponible);

            if (cantidadAAgregar === 0) return prevCart;

            if (itemInCart) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + cantidadAAgregar }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity: cantidadAAgregar }];
        });
    };
    
    const clearCart = () => {
        setCart([]);
    };
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };
    // NUEVA FUNCIÓN: Obtener la cantidad de un item específico
    const getCantidadActual = (productId) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };
    // NUEVA FUNCIÓN: Eliminar un producto del carrito
    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    };
    // NUEVA FUNCIÓN: Verificar si un producto ya está en el carrito
    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    };

    return (
        <CartContext.Provider value={{
            cart, addToCart, clearCart, removeItem, isInCart,
            getCartQuantity, getCartTotal, getCantidadActual
        }}>
            {children}
        </CartContext.Provider>
    );
};

