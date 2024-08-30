import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.valueue);
  const handleNewsLetter = () => setNewsLetter(!newsLetter);

  const handleSignUp = async (e) => {
    e.preventDefault();
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

      Cookies.set("token", response.data.token, { expires: 7 });
      navigate("/");
    } catch (error) {
      console.log(error);
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
            className="connect-button"
          >
            S'inscrire
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
