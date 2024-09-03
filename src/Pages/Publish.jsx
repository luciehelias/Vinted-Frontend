import "../Styles/publish.css";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(formData);

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", file);

      const response = await axios.post(
        "https://site--backend-vinted--4fybfkwcyn9l.code.run/offers/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate(`/offers/${response.data._id}`);
    } catch (error) {
      if (error.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(error.response.data.msg);
      }
    }
  };

  return (
    <section className="publish">
      <div className="publish-container">
        <h1>Vends ton article</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="publish-file-select">
            <div className="publish-file-select-dashed">
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview photo"
                  className="publish-image-preview"
                />
              )}
              <label
                htmlFor="publish-file-picture"
                className="publish-file-label"
              >
                <span>+</span> Ajoute ta photo
                <input
                  type="file"
                  id="publish-file-picture"
                  className="publish-file-picture"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </div>
          <div className="publish-text-input-section">
            <div className="publish-text-input">
              <h2>Titre</h2>
              <input
                type="text"
                name="title"
                className="publish-text-input-title"
                placeholder="ex: Chemise Sézanne verte"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="publish-text-input">
              <h2>Décris ton article</h2>
              <textarea
                type="text"
                name="description"
                className="text-input-description"
                rows="5"
                placeholder="ex: porté quelquefois, taille correctement "
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-text-input-section">
            <div className="publish-text-input">
              <h2>Marque</h2>
              <input
                type="text"
                name="brand"
                className="publish-text-input-title"
                placeholder="ex: Zara"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              />
            </div>
            <div className="publish-text-input">
              <h2>Taille</h2>
              <input
                type="text"
                name="size"
                className="publish-text-input-title"
                placeholder="ex: L/40/12"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </div>
            <div className="publish-text-input">
              <h2>Couleur</h2>
              <input
                type="text"
                name="color"
                className="publish-text-input-title"
                placeholder="ex: Fushia"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </div>
            <div className="publish-text-input">
              <h2>Etat</h2>
              <input
                type="text"
                name="condition"
                className="publish-text-input-title"
                placeholder="Neuf avec étiquette"
                value={condition}
                onChange={(e) => {
                  setCondition(e.target.value);
                }}
              />
            </div>
            <div className="publish-text-input">
              <h2>Lieu</h2>
              <input
                type="text"
                name="city"
                className="publish-text-input-title"
                placeholder="ex: Paris"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="publish-text-input-section">
            <div className="publish-text-input">
              <h2>Prix</h2>
              <div className="checkbox-section">
                <input
                  type="text"
                  name="price"
                  className="publish-text-input-title"
                  placeholder="0,00 €"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <div className="checkbox-input">
                  <input type="checkbox" value="false" name="exchange" />
                  <p>Je suis intéressé(e) par les échanges</p>
                </div>
              </div>
            </div>
          </div>
          <div className="publish-form-button">
            <button type="submit" className="publish-form-validation">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Publish;
