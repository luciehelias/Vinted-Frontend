import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import axios from "axios";

import "../Styles/payment.css";

const CheckoutForm = ({ productName, totalPrice, setIsPaid }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPaying(true);

      if (elements == null) {
        return;
      }

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      const response = await axios.post(
        "https://site--backend-vinted--4fybfkwcyn9l.code.run/payment",
        {
          amount: totalPrice,
          title: productName,
        }
      );

      const clientSecret = response.data.paymentIntent.client_secret;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        setIsPaid(true);
      }
    } catch (error) {
      console.log(error.message);
    }
    setIsPaying(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="payment-card-form" />
      <button
        type="submit"
        disabled={!stripe || !elements || isPaying}
        className="payment-card-button"
      >
        Payer
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
