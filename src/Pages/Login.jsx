import "../Styles/connect.css";

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://site--backend-vinted--4fybfkwcyn9l.code.run/user/login",
        {
          email,
          password,
        }
      );
      handleToken(response.data.token);
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
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
    <section className="connect">
      <div className="connect-container">
        <h1>Se connecter</h1>
        <form action="" method="post" onSubmit={handleLogin}>
          <label className="connect-label">
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label className="connect-label">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button type="submit" className="button-connect--secondary">
            Se connecter
          </button>
        </form>
        {errorMessage && <p style={{ color: "red" }}> {errorMessage}</p>}
        <Link to={"/signup"} className="link">
          <span>Pas encore de compte, inscris-toi !</span>
        </Link>
      </div>
    </section>
  );
};

export default Login;
