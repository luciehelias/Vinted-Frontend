import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="header">
        <img src={logo} alt="logo vinted" className="logo" />
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
          <button className="user-connect">S'inscrire</button>
          <button className="user-connect">Se connecter</button>
          <button className="user-sale">Vends tes articles</button>
        </div>
      </div>
    </>
  );
};

export default Header;
