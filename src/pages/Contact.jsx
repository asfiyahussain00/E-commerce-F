

import { useState } from "react";
import Swal from "sweetalert2";
import Footer from "../component/footer";
import "../App.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // ✅ backend URL variable

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BACKEND_URL}/contact`, {  // ✅ env variable used
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been sent successfully.",
          showConfirmButton: false,
          timer: 2000
        });

        // Clear form
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send message. Please try again."
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later."
      });
    }
  };

  return (
    <>
      <div className="contact-page">
        <h2>Contact Us</h2>
        <p>Have any questions? Reach out to us!</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Our Info</h3>
          <p>Email: support@myshop.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Address: Karachi, Pakistan</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
