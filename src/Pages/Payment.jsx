import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import CheckoutForm from "../Components/CheckoutForm";

import "../Styles/payment.css";

import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const stripePromise = loadStripe(
  "pk_test_51PusPzCvzC4Gi1BhhCeHDLRExL2PPTiYTJU8Mj8OXwt7abaq2IgcccUEAc4z6JXQLAp4jbinzrr2N2pFCWZfrugB00ziTJZ29O"
);

const Payment = () => {
  const location = useLocation();
  const { productName, price } = location.state;

  const [isPaid, setIsPaid] = useState(false);

  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const totalPrice =
    Number(price) + Number(protectionFees) + Number(shippingFees);

  const options = {
    mode: "payment",
    amount: Number((totalPrice * 100).toFixed(0)),
    currency: "eur",
  };

  return (
    <section className="payment-container">
      <div className="sumup">
        {isPaid ? (
          <div className="payment-card-confirmation">
            <p>Merci pour votre achat !</p>
            <Fireworks autorun={{ speed: 2, duration: 2000 }} />
          </div>
        ) : (
          <>
            <div className="payment-card-summary">
              <h1>Résumé de la commande</h1>
              <div className="payment-card-details">
                <div className="sumup-price">
                  <h2>Commande</h2>
                  <span>{price} €</span>
                </div>
                <div className="sumup-price">
                  <h2>Frais protection acheteurs</h2>
                  <span>{protectionFees} €</span>
                </div>
                <div className="sumup-price">
                  <h2>Frais de port</h2>
                  <span>{shippingFees} €</span>
                </div>
              </div>
              <div className="payment-card-total">
                <h3>Total</h3>
                <span>{totalPrice}€</span>
              </div>
              <div>
                <p>
                  Il ne vous reste plus qu'une étape pour vous offrir {""}
                  {productName}. Vous allez payer {totalPrice}€ frais de
                  protection et frais de port inclus
                </p>
              </div>
            </div>
            <div className="payment-card">
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm
                  productName={productName}
                  totalPrice={totalPrice}
                  setIsPaid={setIsPaid}
                />
              </Elements>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Payment;
