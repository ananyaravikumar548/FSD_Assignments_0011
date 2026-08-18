import { useParams } from "react-router-dom";
import { products } from "../data/products";

export default function ProductDetails({ onAdd }) {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);
  if (!product) return <div>Product not found</div>;
  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => onAdd(product)}>Add to cart</button>
    </div>
  );
}
