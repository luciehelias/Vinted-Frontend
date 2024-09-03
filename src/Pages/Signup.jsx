import "../Styles/connect.css";

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleNewsLetter = () => setNewsLetter(!newsLetter);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://site--backend-vinted--4fybfkwcyn9l.code.run/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsLetter: newsLetter,
        }
      );

      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé !");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs !");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez rafraîchir la page");
      }
    }
  };

  return (
    <section className="connect">
      <div className="connect-container">
        <h1>S'inscrire</h1>
        <form action="" method="post" onSubmit={handleSignUp}>
          <label className="connect-label">
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
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
          <label className="checkbox-label">
            <input
              type="checkBox"
              checked={newsLetter}
              onChange={handleNewsLetter}
              id="checkbox-newsletter"
            />
            S'inscrire à notre newsletter
          </label>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit" className="button-connect--secondary">
            S'inscrire
          </button>
        </form>
        {errorMessage && <p style={{ color: "red" }}> {errorMessage}</p>}
        <Link to={"/login"} className="link">
          <span>Tu as déjà un compte, Connecte-toi!</span>
        </Link>
      </div>
    </section>
  );
};

export default Signup;
