import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import avatar from "../assets/avatar.jpg";

import "../Styles/offer.scss";
import "../Styles/colors.scss";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--4fybfkwcyn9l.code.run/offers/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="offer">
      <div className="offer__container">
        <div className="offer__image">
          <img src={data.product_image.secure_url} alt="Product" />
        </div>
        <div className="offer__details">
          <span className="offer__price">{data.product_price} €</span>
          <section className="offer__details-info">
            {data.product_details.map((elem) =>
              Object.keys(elem).map((key) => (
                <p key={key}>
                  <span className="offer__info-key">{key}</span>
                  <span className="offer__info-value">{elem[key]}</span>
                </p>
              ))
            )}
          </section>
          <div className="offer__description">
            <h1>{data.product_name}</h1>
            <p>{data.product_description}</p>
            <div className="offer__owner">
              <img
                src={
                  data.owner.account.avatar?.url
                    ? data.owner.account.avatar.url
                    : avatar
                }
                alt="Owner avatar"
              />
              <h2>{data.owner.account.username}</h2>
            </div>
          </div>
          <button
            className="offer__buy-button"
            onClick={() =>
              navigate("/payment", {
                state: {
                  productName: data.product_name,
                  price: data.product_price,
                },
              })
            }
          >
            Acheter
          </button>
        </div>
      </div>
    </section>
  );
};

export default Offer;
