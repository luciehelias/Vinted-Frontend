import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../Style/login-signup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      setIsLoading(false);
      Cookies.set("token", response.data.token, { expires: 7 });
      navigate("/");
    } catch (error) {
      console.log(error);
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
            type="submit"
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
