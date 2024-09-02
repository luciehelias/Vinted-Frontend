import "../Style/header.css";

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
  const location = useLocation();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => setIsHome(location.pathname === "/"), [location]);

  const handlePrice = () => setpriceAsc(!priceAsc);

  return (
    <>
      <header className="header">
        <Link to={"/"} className="link">
          <img src={logo} alt="logo vinted" className="logo" />
        </Link>
        {isHome && (
          <section>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Recherche des articles"
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
          </section>
        )}

        <div>
          {!token ? (
            <>
              <button className="button-connect">
                <Link to={"/signup"} className="link">
                  S'inscrire
                </Link>
              </button>
              <button className="button-connect">
                <Link to={"/login"} className="link">
                  Se connecter
                </Link>
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                handleToken(null);
              }}
              className="button-disconnect"
            >
              Se déconnecter
            </button>
          )}
          <button className="button-sell">
            {token ? (
              <Link to={"/publish"} className="link">
                Vends tes articles
              </Link>
            ) : (
              <Link to={"/login"} state={{ from: "/publish" }} className="link">
                Vends tes articles
              </Link>
            )}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
