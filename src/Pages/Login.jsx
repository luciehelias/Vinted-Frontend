import axios from "axios";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "../Style/login-signup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );
      setData(response.data);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
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
            onClick={handleLogin}
            disabled={isLoading}
            className="connect-button"
          >
            {isLoading ? "En cours de chargement..." : "Se connecter"}
          </button>
        </form>
        <Link to={"/signup"} className="link">
          <span>Pas encore de compte, inscris-toi !</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
