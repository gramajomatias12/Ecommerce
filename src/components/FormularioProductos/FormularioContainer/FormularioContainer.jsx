import React, { useEffect, useState } from 'react';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto';
import { getFirestore, collection, addDoc, doc, updateDoc } from 'firebase/firestore';

export function FormularioContainer({ modoEdicion, productoAEditar, onProductoGuardado, onCancelarEdicion }) {

      const estadoInicialForm = {
            nombre: "",
            categoria: "",
            precio: 0,
            stock: 0,
            imagen: "",
            id: 0
        };

    const [datosForm, setDatosForm] = useState({
          ...estadoInicialForm
    });

    useEffect(() => {
        if (productoAEditar) {
            const { idFirebase, ...productoSinIdFirebase } = productoAEditar;
            setDatosForm({
                ...estadoInicialForm,
                ...productoSinIdFirebase
            });
            setImagenFile(null);
        } else {
            setDatosForm(estadoInicialForm);
            setImagenFile(null);
        }
    }, [productoAEditar]);

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

            const db = getFirestore();
            const productosCollection = collection(db, "productos nacionales");

            if (modoEdicion && productoAEditar) {
                const docRef = doc(db, "productos nacionales", productoAEditar.idFirebase);
                await updateDoc(docRef, productoCompleto);
                alert("Producto actualizado con éxito.");
            } else {
                await addDoc(productosCollection, productoCompleto);
                alert("Producto agregado con éxito a la base de datos.");
            }

            setDatosForm(estadoInicialForm);
            setImagenFile(null);

            if (onProductoGuardado) {
                await onProductoGuardado();
            }

            if (onCancelarEdicion) {
                onCancelarEdicion();
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        } finally {
            manejarLoading(false);
        }
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            loading={loading}
            modoEdicion={modoEdicion}
        />
    );
}