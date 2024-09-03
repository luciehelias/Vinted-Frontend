import { Link } from "react-router-dom";

import banner from "../assets/bannière.jpg";

import "../Style/banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <img src={banner} alt="bannière" />
      <div className="banner-container">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <Link to={"/publish"} className="link">
          <button>Commencer à vendre </button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
