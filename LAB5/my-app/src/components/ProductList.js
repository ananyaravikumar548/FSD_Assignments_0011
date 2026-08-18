import ProductCard from "./ProductCard";
import { products } from "../data/products";

export default function ProductList({ onAdd }) {
  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}
