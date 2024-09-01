import bannière from "../assets/bannière.jpg";
import tornPart from "../assets/torn-part.svg";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ searchedOffers, priceAsc }) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${searchedOffers}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [searchedOffers]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = priceAsc
          ? "https://lereacteur-vinted-api.herokuapp.com/v2/offers?sort=price-asc"
          : " https://lereacteur-vinted-api.herokuapp.com/v2/offers?sort=price-desc";

        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [priceAsc]);

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
            <Link to={"/offers/" + offer._id} className="link" key={offer._id}>
              <div className="product">
                <div className="owner-info">
                  <img
                    src={offer.owner.account.avatar?.url}
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
                {offer.product_details.map((product, i) => (
                  <div key={i}>
                    <h2>{product.TAILLE}</h2>
                    <h2>{product.MARQUE}</h2>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
