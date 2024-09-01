import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Offer from "./Pages/Offer";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useState } from "react";

const App = () => {
  const [searchedOffers, setSearchedOffers] = useState("");
  const [priceAsc, setpriceAsc] = useState(false);

  return (
    <Router>
      <Header
        setSearchedOffers={setSearchedOffers}
        setpriceAsc={setpriceAsc}
        priceAsc={priceAsc}
      />
      <Routes>
        <Route
          path="/"
          element={<Home searchedOffers={searchedOffers} priceAsc={priceAsc} />}
        />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
