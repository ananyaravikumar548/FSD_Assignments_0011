export default function Cart({ cart, onRemove }) {
  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <strong>{item.name}</strong> x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
              <button onClick={() => onRemove(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}
