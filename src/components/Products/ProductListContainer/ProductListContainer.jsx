import './ProductListContainer.css';
import { ProductList } from "../ProductList/ProductList";
import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export function ProductListContainer({ Mensaje, destacados }) {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const productos= collection(db, 'productos');
        getDocs(productos).then((resp) => {
            setProductos(
                resp.docs.map((doc) => {
                    return {  ...doc.data() , idFirebase: doc.id };
                })
            );
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
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
