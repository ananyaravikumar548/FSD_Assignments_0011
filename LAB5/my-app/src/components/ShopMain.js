import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";

export default function ShopMain() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }

  const count = cart.reduce((s, it) => s + it.quantity, 0);

  return (
    <div className="shop-main">
      <header className="shop-header">
        <nav>
          <Link to="/shop">Shop Home</Link> | <Link to="/shop/cart">Cart ({count})</Link>
        </nav>
      </header>
      <section className="shop-content">
        <Routes>
          <Route path="/" element={<ProductList onAdd={addToCart} />} />
          <Route path="product/:id" element={<ProductDetails onAdd={addToCart} />} />
          <Route path="cart" element={<Cart cart={cart} onRemove={removeFromCart} />} />
        </Routes>
      </section>
    </div>
  );
}
