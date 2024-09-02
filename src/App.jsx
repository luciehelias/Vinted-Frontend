import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import Header from "./Components/Header";

const App = () => {
  const [searchedOffers, setSearchedOffers] = useState("");
  const [priceAsc, setpriceAsc] = useState(false);

  const [token, setToken] = useState(Cookies.get("vinted-token") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("vinted-token", token, { expires: 7 });
      setToken(token);
    } else {
      Cookies.remove("vinted-token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        setSearchedOffers={setSearchedOffers}
        setpriceAsc={setpriceAsc}
        priceAsc={priceAsc}
        token={token}
        handleToken={handleToken}
      />
      <Routes>
        <Route
          path="/"
          element={<Home searchedOffers={searchedOffers} priceAsc={priceAsc} />}
        />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
