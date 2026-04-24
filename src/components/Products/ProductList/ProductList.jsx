import './ProductList.css';
import Product from '../Product/Product';

export function ProductList({ productos }) {
    return (
        <div className="product-list">
            {productos.map(prod => (
                <Product key={prod.id} {...prod} />
            ))}
        </div>
    );
}

export default ProductList;