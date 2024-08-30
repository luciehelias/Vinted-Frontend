import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../Style/login-signup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      Cookies.set("token", response.data.token, { expires: 7 });
      navigate("/");
    } catch (error) {
      if (error.response.data.message === "User not found") {
        setErrorMessage(
          "L'utilisateur n'existe pas, merci de vérifier vos champs !"
        );
      } else if (error.response.data.error === "Unauthorized") {
        setErrorMessage(
          "L'utilisateur n'existe pas, merci de vérifier vos champs !"
        );
      } else {
        setErrorMessage("Une erreur est survenue, veuillez rafraîchir la page");
      }
    }
  };

  return (
    <div className="container-SL">
      <div className="container-login">
        <h2>Se connecter</h2>
        <form action="" method="post">
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={handleEmailChange}
            className="email"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
            className="password"
          />
          <button
            type="submit"
            onClick={handleLogin}
            className="connect-button"
          >
            Se connecter
          </button>
        </form>
        {errorMessage && <p style={{ color: "red" }}> {errorMessage}</p>}
        <Link to={"/signup"} className="link">
          <span>Pas encore de compte, inscris-toi !</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
