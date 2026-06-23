import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FormularioContainer } from "../FormularioProductos/FormularioContainer/FormularioContainer";
import "./GestionProductos.module.css";

const GestionProductos = () => {
    const [productos, setProductos] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null);

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
    };

    const cancelarEdicion = () => {
        setProductoAEditar(null);
    };

    // const manejarEnvio = async (e) => {
    //     e.preventDefault();
    //     let urlImagen = datosForm.imagen; // Mantenemos la imagen actual por defecto
    //     if (imagenFile) {
    //         const formData = new FormData();
    //         formData.append('image', imagenFile);
    //         const apiKey = '7f06b3c4076140cd42f85c76f23a6b76';
    //         try {
    //             const response = await
    //                 fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    //                     method: 'POST',
    //                     body: formData,
    //                 });
    //             const data = await response.json();
    //             if (data.success) {
    //                 urlImagen = data.data.url; // Obtenemos la nueva URL
    //             } else {
    //                 throw new Error('La subida de la imagen falló.');
    //             }
    //         } catch (error) {
    //             console.error("Error al subir la imagen:", error);
    //             alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
    //             return;
    //         }
    //     }
    //     const productoFinal = { ...datosForm, imagen: urlImagen };
    //     try {
    //         if (productoAEditar) {
    //             const docRef = doc(db, "Productos nacionales", productoAEditar.id);
    //             // update
    //             await updateDoc(docRef, productoFinal);
    //             alert("Producto actualizado con éxito.");
    //         } else {
    //             // create
    //             await addDoc(collection(db, "Productos nacionales"), productoFinal);
    //             alert("Producto guardado con éxito.");
    //         }
    //         // ... (reseteo de formulario) ...
    //         estadoInicialForm({
    //             nombre: '',
    //             precio: '',
    //             stock: '',
    //             categoria: '',
    //             id: '',
    //             imagen: ''
    //         });
    //         setImagenFile(null);

    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };

    return (
        <div>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormularioContainer
                modoEdicion={!!productoAEditar}
                productoAEditar={productoAEditar}
                onProductoGuardado={cargarProductos}
                onCancelarEdicion={cancelarEdicion}
            />
            <hr />
            <h3>Lista de Productos</h3>

            {productoAEditar && (
                <button onClick={cancelarEdicion} style={{ marginBottom: '10px' }}>
                    Cancelar Edición
                </button>
            )}

            <ul>
                {productos.map((prod) => (
                    <li key={prod.idFirebase} style={{ color: "white" }}>

                        {prod.nombre} - {prod.categoria} - Stock: {prod.stock} - Precio: $ {prod.precio}

                        {
                            /*acá agregaremos los botones de acción */
                            <button onClick={() => handleDelete(prod.idFirebase)} style={{
                                marginLeft: '10px'
                            }}>Eliminar</button>

                        }
                        <button onClick={() => handleEditClick(prod)} style={{
                            marginLeft: '10px'
                        }}>Editar</button>

                    </li>))
                }
            </ul>
        </div>);
};

export default GestionProductos;