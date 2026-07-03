import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import styles from './GestionCupones.module.css';

function GestionCupones() {
    const [cupones, setCupones] = useState([]);
    const [cuponAEditar, setCuponAEditar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingLista, setLoadingLista] = useState(false);

    const estadoInicialForm = {
        codigo: '',
        descuento: ''
    };

    const [datosForm, setDatosForm] = useState({ ...estadoInicialForm });

    const modoEdicion = cuponAEditar !== null;

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value,
        });
    };

    const cargarCupones = async () => {
        setLoadingLista(true);
        try {
            const respuesta = await getDocs(collection(db, 'cupones'));
            const cuponesObtenidos = respuesta.docs.map((doc) => ({
                ...doc.data(),
                idFirebase: doc.id,
            }));
            setCupones(cuponesObtenidos);
        } catch (error) {
            console.error('Error al obtener los cupones:', error);
            alert('Error al obtener los cupones. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoadingLista(false);
        }
    };

    useEffect(() => {
        cargarCupones();
    }, []);

    const manejarEnvio = async (e) => {
        e.preventDefault();

        const codigoLimpio = datosForm.codigo.trim().toUpperCase();
        const porcentaje = Number(datosForm.descuento);

        if (!codigoLimpio || !datosForm.descuento) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (isNaN(porcentaje) || porcentaje <= 0 || porcentaje > 100) {
            alert('Por favor, ingresa un descuento válido entre 1 y 100.');
            return;
        }

        setLoading(true);

        try {
            const cuponCompleto = {
                codigo: codigoLimpio,
                descuento: porcentaje,
            };

            if (modoEdicion && cuponAEditar) {
                const docRef = doc(db, 'cupones', cuponAEditar.idFirebase);
                await updateDoc(docRef, cuponCompleto);
                alert('Cupón actualizado correctamente.');
            } else {
                await addDoc(collection(db, 'cupones'), cuponCompleto);
                alert('Cupón agregado correctamente.');
            }

            await cargarCupones();
            setDatosForm({ ...estadoInicialForm });
            setCuponAEditar(null);
        } catch (error) {
            console.error('Error al guardar el cupón:', error);
            alert('Error al guardar el cupón. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const eliminarCupon = async (idFirebase) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este cupón?');
        if (!confirmacion) return;

        try {
            await deleteDoc(doc(db, 'cupones', idFirebase));
            alert('Cupón eliminado correctamente.');
            setCupones(cupones.filter((cupon) => cupon.idFirebase !== idFirebase));
        } catch (error) {
            console.error('Error al eliminar el cupón:', error);
            alert('Error al eliminar el cupón. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleEditClick = (cupon) => {
        setCuponAEditar(cupon);
        setDatosForm({
            codigo: cupon.codigo,
            descuento: String(cupon.descuento),
        });
    };

    const cancelarEdicion = () => {
        setCuponAEditar(null);
        setDatosForm({ ...estadoInicialForm });
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Gestión de Cupones</h2>
            <p className={styles.subtitle}>Administrá altas, ediciones y bajas de cupones de descuento.</p>

            <form className={styles.form} onSubmit={manejarEnvio}>
                <h3 className={styles.formTitle}>{modoEdicion ? 'Editar Cupón' : 'Agregar Nuevo Cupón'}</h3>

                <div className={styles.fieldGroup}>
                    <label htmlFor="codigo">Código del cupón:</label>
                    <input
                        id="codigo"
                        type="text"
                        placeholder="Ej: TECH10"
                        name="codigo"
                        value={datosForm.codigo}
                        onChange={manejarCambio}
                    />
                </div>

                <div className={styles.fieldGroup}>
                    <label htmlFor="descuento">Descuento (%):</label>
                    <input
                        id="descuento"
                        type="number"
                        placeholder="Porcentaje de descuento"
                        name="descuento"
                        min="1"
                        max="100"
                        value={datosForm.descuento}
                        onChange={manejarCambio}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Procesando...' : modoEdicion ? 'Actualizar Cupón' : 'Guardar Cupón'}
                </button>
            </form>

            <div className={styles.listHeader}>
                <h3 className={styles.listTitle}>Lista de Cupones</h3>
                <span className={styles.countBadge}>{cupones.length} cargados</span>
            </div>

            {modoEdicion && (
                <button onClick={cancelarEdicion} className={styles.cancelButton}>
                    Cancelar Edición
                </button>
            )}

            {loadingLista ? (
                <p className={styles.emptyState}>Cargando cupones...</p>
            ) : (
                <>
                    <ul className={styles.list}>
                        {cupones.map((cupon) => (
                            <li key={cupon.idFirebase} className={styles.item}>
                                <div className={styles.itemInfo}>
                                    <p className={styles.itemName}>{cupon.codigo}</p>
                                    <p className={styles.itemMeta}>Descuento: {cupon.descuento}%</p>
                                </div>

                                <div className={styles.itemActions}>
                                    <button className={styles.editButton} onClick={() => handleEditClick(cupon)}>Editar</button>
                                    <button className={styles.deleteButton} onClick={() => eliminarCupon(cupon.idFirebase)}>Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {cupones.length === 0 && (
                        <p className={styles.emptyState}>Aún no hay cupones cargados.</p>
                    )}
                </>
            )}
        </section>
    );
}

export default GestionCupones;