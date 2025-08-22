import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2"; // ✅ SweetAlert2 import
import "../App.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // ✅ env variable

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isLogin
        ? `${BACKEND_URL}/auth/login`
        : `${BACKEND_URL}/auth/signup`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin ? { email, password } : { name, email, password }
        ),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      // ✅ save token
      login(data.token);

      // ✅ SweetAlert success
      Swal.fire({
        icon: "success",
        title: isLogin ? "Login Successful 🎉" : "Signup Successful 🎉",
        text: isLogin
          ? "Welcome back! You are now logged in."
          : "Your account has been created successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continue",
      }).then(() => navigate("/home"));
    } catch (err) {
      // ❌ SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
        confirmButtonColor: "#d33",
      });
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>

      <p style={{ color: "white", marginTop: "10px" }}>
        {isLogin ? "Don’t have an account?" : "Already have an account?"}
        <button
          type="button"
          className="switch-btn"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  );
}
