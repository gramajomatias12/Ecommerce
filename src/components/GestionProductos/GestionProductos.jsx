import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import styles from "./GestionProductos.module.css";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";

const GestionProductos = () => {
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null);

    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: "",
        id: 0
    };

    const [datosForm, setDatosForm] = useState({ ...estadoInicialForm });

    const [imagenFile, setImagenFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarLoading = (estado) => {
        setLoading(estado);
    };

    const cargarProductos = async () => {
        const productosRef = collection(db, "productos nacionales");
        const resp = await getDocs(productosRef);

        setProductos(resp.docs.map((documento) => ({
            ...documento.data(),
            idFirebase: documento.id
        })));
    };

    useEffect(() => {
        cargarProductos();
    }, []);


    const handleDelete = async (idFirebase) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto ? ");
        if (confirmacion) {
            const docRef = doc(db, "productos nacionales", idFirebase);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter((prod) => prod.idFirebase !== idFirebase));
            alert("Producto eliminado.");
        }
    };

    const handleEditClick = (producto) => {
        setProductoAEditar(producto);
        setDatosForm(producto);
    };

    const modoEdicion = productoAEditar !== null;

    const cancelarEdicion = () => {
        setProductoAEditar(null);
        setDatosForm({ ...estadoInicialForm });
    };


    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        if (datosForm.nombre.trim() === "" || datosForm.precio <= 0 || datosForm.stock < 0) {
            alert("Por favor, complete todos los campos y asegúrese de que el precio sea mayor a cero.");
            return;
        }// Detiene la ejecución de la función 
        
        try {
            manejarLoading(true);
            let urlImagen = datosForm.imagen;

            if (imagenFile) {
                const apiKey = '7f06b3c4076140cd42f85c76f23a6b76';
                const formData = new FormData();
                formData.append('image', imagenFile);

                const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });

                const datosImgbb = await respuestaImgbb.json();

                if (!datosImgbb.success) {
                    throw new Error('La subida de la imagen a Imgbb falló.');
                }

                urlImagen = datosImgbb.data.url;
            } else if (!modoEdicion && !datosForm.imagen) {
                alert("Por favor, selecciona una imagen para el producto.");
                return;
            }

            const productoCompleto = {
                ...datosForm,
                id: Number(datosForm.id),
                precio: Number(datosForm.precio),
                stock: Number(datosForm.stock),
                imagen: urlImagen
            };

            const productosCollection = collection(db, "productos nacionales");

            if (modoEdicion && productoAEditar) {
                const docRef = doc(db, "productos nacionales", productoAEditar.idFirebase);
                await updateDoc(docRef, productoCompleto);
                alert("Producto actualizado con éxito.");
            } else {
                await addDoc(productosCollection, productoCompleto);
                alert("Producto agregado con éxito a la base de datos.");
            }

            await cargarProductos();

            setDatosForm(estadoInicialForm);
            setImagenFile(null);
            setProductoAEditar(null);
            
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        } finally {
            manejarLoading(false);
        }
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Gestión de Productos</h2>
            <p className={styles.subtitle}>Administrá altas, ediciones y bajas del catálogo.</p>

            <FormularioProducto
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarEnvio={manejarEnvio}
                manejarCambioImagen={manejarCambioImagen}
                loading={loading}
                modoEdicion={modoEdicion}
            />

            <div className={styles.listHeader}>
                <h3 className={styles.listTitle}>Lista de Productos</h3>

            </div>

            {productoAEditar && (
                <button onClick={cancelarEdicion} className={styles.cancelButton}>
                    Cancelar Edición
                </button>
            )}

            <ul className={styles.list}>
                {productos.map((prod) => (
                    <li key={prod.idFirebase} className={styles.item}>
                        <div className={styles.itemInfo}>
                            <p className={styles.itemName}>{prod.nombre}</p>
                            <p className={styles.itemMeta}>
                                {prod.categoria} · Stock: {prod.stock} · Precio: $ {prod.precio}
                            </p>
                        </div>

                        <div className={styles.itemActions}>
                            <button className={styles.editButton} onClick={() => handleEditClick(prod)}>Editar</button>
                            <button className={styles.deleteButton} onClick={() => handleDelete(prod.idFirebase)}>Eliminar</button>
                        </div>
                    </li>))
                }
            </ul>

            {productos.length === 0 && (
                <p className={styles.emptyState}>Aún no hay productos cargados.</p>
            )}
        </section>);
};

export default GestionProductos;