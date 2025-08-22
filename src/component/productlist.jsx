
export default function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} className="product-img" />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <button className="add-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
