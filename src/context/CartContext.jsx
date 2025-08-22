import { createContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // assuming you have AuthContext
import Swal from "sweetalert2";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // ✅ env variable

  // Load cart from backend
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    fetch(`${BACKEND_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCartItems(data.products || []))
      .catch((err) => console.error("Error fetching cart:", err));
  }, [isAuthenticated, token, BACKEND_URL]);

  // Add to cart
  const addToCart = async (product) => {
    try {
      const res = await fetch(`${BACKEND_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: String(product.id),
          name: product.name,
          price: product.price,
          image: product.image,
        }),
      });
      const data = await res.json();
      setCartItems(data.products || []);

      // SweetAlert
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${product.name} has been added successfully.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to add ${product.name} to cart.`,
        showConfirmButton: true,
      });
    }
  };

  // Remove from cart
  const removeFromCart = async (id, name) => {
    try {
      const res = await fetch(`${BACKEND_URL}/cart/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCartItems(data.products || []);

      Swal.fire({
        icon: "success",
        title: "Removed!",
        text: `${name} has been removed from cart.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Error removing from cart:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to remove ${name} from cart.`,
        showConfirmButton: true,
      });
    }
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
