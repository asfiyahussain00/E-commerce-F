


export default function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />

      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <p>${item.price}</p>

        <div className="cart-item-actions">
          <button onClick={() => onUpdate(item, "decrease")}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdate(item, "increase")}>+</button>
        </div>
      </div>

      <button className="remove-btn" onClick={() => onRemove(item.id)}>
        ❌
      </button>
    </div>
  );
}
