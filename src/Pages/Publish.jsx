import "../Style/publish.css";

const Publish = () => {
  return (
    <div className="publish-main">
      <div className="publish-container">
        <h1>Vends ton article</h1>
        <form action="" method="post">
          <div className="publish-file-select">
            <div className="publish-file-select-dashed">
              <input type="file" />
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
              />
            </div>
            <div className="publish-text-input">
              <h2>Taille</h2>
              <input
                type="text"
                name="size"
                className="publish-text-input-title"
                placeholder="ex: L/40/12"
              />
            </div>
            <div className="publish-text-input">
              <h2>Couleur</h2>
              <input
                type="text"
                name="color"
                className="publish-text-input-title"
                placeholder="ex: Fushia"
              />
            </div>
            <div className="publish-text-input">
              <h2>Etat</h2>
              <input
                type="text"
                name="condition"
                className="publish-text-input-title"
                placeholder="Neuf avec étiquette"
              />
            </div>
            <div className="publish-text-input">
              <h2>Lieu</h2>
              <input
                type="text"
                name="location"
                className="publish-text-input-title"
                placeholder="ex: Paris"
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
    </div>
  );
};

export default Publish;
