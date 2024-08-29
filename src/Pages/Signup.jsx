import axios from "axios";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

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
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email,
          username,
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
      <div className="container-signup">
        <h2>S'inscrire</h2>
        <form action="" method="post">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={handleUsernameChange}
            className="username"
          />
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
          <label>
            <input type="checkBox" className="checkbox" />
            S'inscrire à notre newsletter
          </label>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="connect-button"
          >
            {isLoading ? "En cours de chargement..." : "S'inscrire"}
          </button>
        </form>
        <Link to={"/login"} className="link">
          <span>Tu as déjà un compte, Connecte-toi!</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
