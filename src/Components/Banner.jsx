import { Link } from "react-router-dom";

import banner from "../assets/bannière.jpg";

import "../Styles/banner.css";

const Banner = () => {
  return (
    <section className="banner">
      <img src={banner} alt="bannière" />
      <div className="banner-container">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <Link to={"/publish"} className="link">
          <button>Commencer à vendre </button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
