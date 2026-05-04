import React from 'react';
import './FormularioProducto.css';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen }) {
    return (
        <form className="form" onSubmit={manejarEnvio}>
            <h3>Agregar Nuevo Producto</h3>
            <div>
                <label>Nombre del Producto:</label>
                <input
                    type="text"
                    placeholder="Ej: Teclado Mecánico"
                    name="nombre" // Atributo clave para identificar el input
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />
            </div>
            <div className="form-grid">
                <div>
                    <label>Precio: $</label>
                    <input
                        type="number"
                        placeholder="Ej: 95"
                        name="precio" // Atributo clave
                        value={datosForm.precio}
                        onChange={manejarCambio}
                    />
                </div>

                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        placeholder="Ej: 20"
                        name="stock" // Atributo clave
                        value={datosForm.stock}
                        onChange={manejarCambio}
                    />
                </div>
            </div>

            <div>
                <label>Imagen:</label>
                <input
                    type="file"
                    name="imagen" // Atributo clave
                    onChange={manejarCambioImagen}
                />
            </div>

            <button type="submit">Guardar Producto</button>
        </form>
    );
}