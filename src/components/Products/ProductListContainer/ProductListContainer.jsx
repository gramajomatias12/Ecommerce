import './ProductListContainer.css';
import { ProductList } from "../ProductList/ProductList";

export function ProductListContainer({ Mensaje }) {
    const productos = [
        { id: '1234', nombre: 'Notebook Pro', precio: 12000, stock: 15, imagen: 'https://picsum.photos/200/300?random=1' },
        { id: '2344', nombre: 'Monitor Curvo', precio: 450000, stock: 25, imagen: 'https://picsum.photos/200/300?random=2' },
        { id: '2545', nombre: 'Teclado Mecánico', precio: 15000, stock: 50, imagen: 'https://picsum.photos/200/300?random=3' },];
   
    return (
        <div >
            <h2>{Mensaje}</h2>
            <ProductList productos={productos} />
        </div>
    );
}

export default ProductListContainer;