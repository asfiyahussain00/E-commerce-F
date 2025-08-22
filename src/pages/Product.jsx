import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductList from "../component/productlist.jsx";
import Footer from "../component/footer.jsx";
import axios from "axios";
import Swal from "sweetalert2";

// ✅ Import images
import tshirt from "../assets/tshirt.jpg";
import shoes from "../assets/shoes.jpg";
import watch from "../assets/watch.jpg";
import jeans from "../assets/jeans.jpg";
import jacket from "../assets/jacket.jpg";
import bag from "../assets/bag.jpg";
import sunglasses from "../assets/sunglasses.jpg";
import cap from "../assets/cap.jpg";
import belt from "../assets/belt.jpg";
import scarf from "../assets/scarf.jpg";
import sportsShoes from "../assets/sports-shoes.jpg";
import formalShirt from "../assets/formal-shirt.jpg";

// ✅ Product array
const allProducts = [
  { id: 1, name: "T-Shirt", price: 20, image: tshirt },
  { id: 2, name: "Shoes", price: 50, image: shoes },
  { id: 3, name: "Watch", price: 100, image: watch },
  { id: 4, name: "Bag", price: 40, image: bag },
  { id: 5, name: "Jacket", price: 80, image: jacket },
  { id: 6, name: "Jeans", price: 35, image: jeans },
  { id: 7, name: "Cap", price: 15, image: cap },
  { id: 8, name: "Belt", price: 10, image: belt },
  { id: 9, name: "Sunglasses", price: 25, image: sunglasses },
  { id: 10, name: "Scarf", price: 18, image: scarf },
  { id: 11, name: "Sports Shoes", price: 60, image: sportsShoes },
  { id: 12, name: "Formal Shirt", price: 35, image: formalShirt },
];

export default function Products() {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = async (product) => {
    try {
      // 1️⃣ Add to local cart
      addToCart(product);

      // 2️⃣ Save to MongoDB
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add`,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 3️⃣ SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${product.name} has been added successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error saving product:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <div
        className="product-page"
        style={{
          padding: "20px",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #ffd180, #ff6f00)"
        }}
      >
        <h2 style={{ textAlign: "center", margin: "20px 0", color: "#fff" }}>
          All Products
        </h2>
        <ProductList products={allProducts} addToCart={handleAddToCart} />
      </div>
      <Footer />
    </>
  );
}
