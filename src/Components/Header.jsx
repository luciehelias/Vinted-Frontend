import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({
  setSearchedOffers,
  priceAsc,
  setpriceAsc,
  token,
  handleToken,
}) => {
  let location = useLocation();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => setIsHome(location.pathname === "/"), [location]);

  const handlePrice = () => setpriceAsc(!priceAsc);

  return (
    <>
      <div className="header">
        <Link to={"/"} className="link">
          <img src={logo} alt="logo vinted" className="logo" />
        </Link>
        {isHome && (
          <div className="filter-container">
            <div className="input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                name="findArticle"
                placeholder="Recherche des articles"
                className="findArticle"
                onChange={(e) => setSearchedOffers(e.target.value)}
              />
            </div>
            <div className="price-sort">
              <p>Trier par prix croissant</p>
              <input
                type="checkbox"
                checked={priceAsc}
                onChange={handlePrice}
              />
            </div>
          </div>
        )}

        <div>
          {!token ? (
            <>
              <Link to={"/signup"} className="link">
                <button className="user-connect">S'inscrire</button>
              </Link>
              <Link to={"/login"} className="link">
                <button className="user-connect">Se connecter</button>
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleToken(null);
              }}
              className="user-disconnect"
            >
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
