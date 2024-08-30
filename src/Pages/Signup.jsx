import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.valueue);
  const handleNewsLetter = () => setNewsLetter(!newsLetter);

  const handleSignUp = async () => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsLetter: newsLetter,
        }
      );

      setIsLoading(false);
      Cookies.set("token", response.data.token, { expires: 7 });
      navigate("/");
    } catch (error) {
      console.log(error.message);
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
            <input
              type="checkBox"
              checked={newsLetter}
              onChange={handleNewsLetter}
              className="checkbox"
            />
            S'inscrire à notre newsletter
          </label>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button
            type="submit"
            onClick={handleSignUp}
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
