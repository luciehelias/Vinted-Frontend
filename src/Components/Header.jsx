import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link to={"/"} className="link">
          <img src={logo} alt="logo vinted" className="logo" />
        </Link>
        <div className="input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            name="findArticle"
            id="findArticle"
            placeholder="rechercher"
            className="findArticle"
          />
        </div>
        <div>
          <Link to={"/signup"} className="link">
            <button className="user-connect">S'inscrire</button>
          </Link>
          <Link to={"/login"} className="link">
            <button className="user-connect">Se connecter</button>
          </Link>
          <button className="user-sale">Vends tes articles</button>
        </div>
      </div>
    </>
  );
};

export default Header;
