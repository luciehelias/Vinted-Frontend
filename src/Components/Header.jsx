import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ setSearchedOffers }) => {
  const [isLoggedIn, setIsLogIn] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  useEffect(() => {
    setIsLogIn(token ? true : false);
  }, [token]);

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
            onChange={(e) => setSearchedOffers(e.target.value)}
          />
        </div>
        <div>
          {!isLoggedIn ? (
            <>
              <Link to={"/signup"} className="link">
                <button className="user-connect">S'inscrire</button>
              </Link>
              <Link to={"/login"} className="link">
                <button className="user-connect">Se connecter</button>
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="user-disconnect">
              Se déconnecter
            </button>
          )}
          <button className="user-sale">Vends tes articles</button>
        </div>
      </div>
    </>
  );
};

export default Header;
