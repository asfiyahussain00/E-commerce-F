// src/pages/cart.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  if (!cartItems) return <p>Loading...</p>;

  return (
    <div className="cart">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} width="80" />
              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>Qty: {item.quantity}</p>
                <p>Rs. {item.price}</p>
              </div>
              <button onClick={() => removeFromCart(item._id, item.name)}>❌ Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
