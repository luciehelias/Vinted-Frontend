import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

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
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <section className="container-offer">
        <div className="box-offer">
          <div className="offer-product-image">
            <img src={data.product_image.url} alt="image" />
          </div>
          <div className="product-infos">
            <span className="price">{data.product_price} €</span>
            <section className="details-infos">
              {data.product_details.map((elem) =>
                Object.keys(elem).map((key) => (
                  <p key={key}>
                    <span className="key-info">{key} </span>
                    <span className="elem-key">{elem[key]}</span>
                  </p>
                ))
              )}
            </section>
            <div className="product-more-infos">
              <h1>{data.product_name}</h1>
              <p>{data.product_description}</p>
              <div className="offer-owner">
                <img src={data.owner.account.avatar?.url} alt="avatar" />
                <h2>{data.owner.account.username}</h2>
              </div>
            </div>
            <button className="buy-button">Acheter</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Offer;
