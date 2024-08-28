import bannière from "../assets/bannière.jpg";

const Home = () => {
  return (
    <>
      <div className="top-home">
        <img src={bannière} alt="bannière" className="bannière" />
        <div className="start-sale">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre </button>
        </div>
      </div>
      <div className="home-offers"></div>
    </>
  );
};

export default Home;
