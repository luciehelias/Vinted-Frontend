import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner from "../Components/Banner";
import avatar from "../assets/avatar.jpg";

import "../Styles/colors.scss";
import "../Styles/home.scss";

const Home = ({ searchedOffers, priceAsc }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on load
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

  // Fetch data on search update
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

  // Fetch data on price sorting update
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = priceAsc
          ? "https://site--backend-vinted--4fybfkwcyn9l.code.run/offers?sort=price-asc"
          : "https://site--backend-vinted--4fybfkwcyn9l.code.run/offers?sort=price-desc";

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
    <main className="home">
      <Banner />
      <section className="home__products">
        {data.offers.map((offer) => (
          <Link
            to={`/offers/${offer._id}`}
            key={offer._id}
            className="home__link"
          >
            <div className="home__product">
              <div className="home__owner">
                <img
                  src={
                    offer.owner.account.avatar?.url
                      ? offer.owner.account.avatar.url
                      : avatar
                  }
                  alt="Owner avatar"
                />
                <h2>{offer.owner.account.username}</h2>
              </div>
              <img
                src={offer.product_image.secure_url}
                alt="Product image"
                className="home__image"
              />
              <span className="home__price">{offer.product_price}€</span>
              <div className="home__details">
                {offer.product_details.map((product, i) => (
                  <div key={i}>
                    <h2>{product.TAILLE}</h2>
                    <h2>{product.MARQUE}</h2>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Home;
