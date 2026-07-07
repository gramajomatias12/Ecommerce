import React from 'react';
import './FormularioProducto.css';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, loading, modoEdicion }) {
    return (
        <form className="form" onSubmit={manejarEnvio}>
            <h3>{modoEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
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
            <div>
                <label>Categoría:</label>
                <input
                    type="text"
                    placeholder="Ej: Electrónica"
                    name="categoria" // Atributo clave para identificar el input
                    value={datosForm.categoria}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Detalle:</label>
                <textarea
                    placeholder="Ej: Monitor curvo de 27'' con panel IPS y 165Hz"
                    name="detalle"
                    value={datosForm.detalle ?? ""}
                    onChange={manejarCambio}
                    rows={4}
                />
            </div>
            <div className="checkbox-row">
                <input
                    type="checkbox"
                    name="destacado"
                    checked={Boolean(datosForm.destacado)}
                    onChange={manejarCambio}
                />
                <label>Producto destacado</label>
            </div>
            <div className="form-grid">
                <div>
                    <label>ID</label>
                    <input
                        type="number"
                        placeholder="Ej: 101"
                        name="id" // Atributo clave
                        value={datosForm.id}
                        onChange={manejarCambio}
                    />
                </div>
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

                    placeholder="https://..."
                    name="imagen" // Atributo clave
                    onChange={manejarCambioImagen}
                />
                {modoEdicion && datosForm.imagen && (
                    <div>
                        <p>Imagen actual:</p>
                        <img src={datosForm.imagen} alt="Vista previa"
                            style={{ width: '100px' }} />
                    </div>
                )}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? 'Procesando...' : modoEdicion ? 'Actualizar Producto' : 'Guardar Producto'}
            </button>
        </form>
    );
}