
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../App.css";



export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // token remove
    navigate("/login"); // login page pe bhej do
  };

  // ✅ Total quantity count
  const totalCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/home")}>
        MyShop
      </div>

      {/* Toggle button for mobile */}
      <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a onClick={() => navigate("/home")}>Home</a></li>
        <li><a onClick={() => navigate("/products")}>Products</a></li>
        <li><a onClick={() => navigate("/contact")}>Contact</a></li>
      </ul>

      <div className="nav-actions">
        <div className="cart-icon" onClick={() => navigate("/cart")}>
          🛒 <span className="cart-count">{totalCount}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
