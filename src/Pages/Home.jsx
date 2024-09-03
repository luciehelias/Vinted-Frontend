import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner from "../Components/Banner";

const Home = ({ searchedOffers, priceAsc }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-vinted--4fybfkwcyn9l.code.run/offers"
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
          `https://site--backend-vinted--4fybfkwcyn9l.code.run/offers?title=${searchedOffers}`
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
          ? "https://site--backend-vinted--4fybfkwcyn9l.code.run/offers?sort=price-asc"
          : " https://site--backend-vinted--4fybfkwcyn9l.code.run/offers?sort=price-desc";

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
    <main>
      <Banner />
      <section className="offer-product">
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
                src={offer.product_image.secure_url}
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
      </section>
    </main>
  );
};

export default Home;
