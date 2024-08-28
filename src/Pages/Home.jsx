import bannière from "../assets/bannière.jpg";

import axios from "axios";
import { useState, useEffect } from "react";

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
          {data.offers.map((offer) => {
            return (
              <>
                <div className="product">
                  {/* <img src={offer.owner.account.avatar.url} alt="image" /> */}
                  <h2>{offer.owner.account.username}</h2>
                  <img src={offer.product_image.url} alt="image" />
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
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
