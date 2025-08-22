
import { useContext } from "react";
import Navbar from "../component/Navbar";
import Banner from "../component/Banner";
import ProductList from "../component/productlist";
import Footer from "../component/footer";
import { CartContext } from "../context/CartContext";
import axios from "axios";

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

export default function Home() {
  const { addToCart } = useContext(CartContext); // ✅ context se function liya

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

  // ✅ Add to cart + save to DB
  const handleAddToCart = async (product) => {
    try {
      // Local cart (context)
      addToCart(product);

      // Save in MongoDB
      await axios.post("http://localhost:5000/api/cart", {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });

      alert(`${product.name} added to cart ✅`);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <>
     
      <Banner />

      <div
        style={{
          padding: "20px",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #d57a3eff, #e3c974ff)",
        }}
      >
        <h2 style={{ textAlign: "center", margin: "20px 0", color: "#333" }}>
          All Products
        </h2>

        {/* ✅ Product list */}
        <ProductList products={allProducts} addToCart={handleAddToCart} />
      </div>

      <Footer />
    </>
  );
}
