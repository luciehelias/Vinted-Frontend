import bannière from "../assets/bannière.jpg";
import tornPart from "../assets/torn-part.svg";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div className="top-home">
        <img src={bannière} alt="bannière" className="bannière" />

        <div className="start-sale">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre </button>
        </div>
      </div>
      <div className="home-offers">
        <div className="offer-product">
          {data.offers.map((offer) => (
            <Link to={"/offers/" + offer._id} key={offer._id} className="link">
              <div className="product">
                <div className="owner-info">
                  <img
                    src={offer.owner.account.avatar.url}
                    alt="image"
                    className="owner"
                  />
                  <h2>{offer.owner.account.username}</h2>
                </div>
                <img
                  src={offer.product_image.url}
                  alt="image"
                  className="product-image"
                />
                <span>{offer.product_price}€</span>
                {offer.product_details.map((product) => {
                  return (
                    <>
                      <h2>{product.TAILLE}</h2>
                      <h2>{product.MARQUE}</h2>
                    </>
                  );
                })}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
