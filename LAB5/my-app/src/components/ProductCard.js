import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <Link to={`product/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <div className="product-meta">
        <span className="price">${product.price.toFixed(2)}</span>
        <button onClick={() => onAdd(product)}>Add to cart</button>
      </div>
    </div>
  );
}
