import { useParams } from "react-router-dom";

const products = [
  { id: 1, name: "T-Shirt", price: 20, description: "High-quality cotton T-shirt", image: "/assets/tshirt.jpg" },
  { id: 2, name: "Shoes", price: 50, description: "Comfortable running shoes", image: "/assets/shoes.jpg" },
  { id: 3, name: "Watch", price: 100, description: "Stylish wrist watch", image: "/assets/watch.jpg" },
];

export default function ProductDetails() {
  const { id } = useParams(); // ✅ URL se product id lena
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 style={{ textAlign: "center", margin: "20px" }}>Product not found!</h2>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width="300" />
      <p style={{ fontSize: "18px", marginTop: "10px" }}>{product.description}</p>
      <p style={{ fontWeight: "bold", fontSize: "20px" }}>${product.price}</p>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
