
import bannerImg from "../assets/banner.jpg";

export default function Banner({ isOpen }) {
  return (
    <section
      className={`banner ${isOpen ? "banner-shift" : ""}`}
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="banner-content">
        <h1>Welcome to MyShop</h1>
        <p>Discover the latest trends & best deals today!</p>
        <button className="banner-btn">Shop Now</button>
      </div>
    </section>
  );
}
