import './ProductListContainer.css';
import { ProductList } from "../ProductList/ProductList";

import React, { useState, useEffect } from 'react';
export function ProductListContainer({ Mensaje, destacados }) {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        fetch('/data/Products.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la información de los productos');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setProductos(datos);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <p>Cargando productos, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    const productoAMostrar = destacados ? productos.filter(p => p.destacado) : productos;
   
    return (
        <div >
            <h2>{Mensaje}</h2>
            <ProductList productos={productoAMostrar} />
        </div>
    );
}

export default ProductListContainer;