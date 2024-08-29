import axios from "axios";
import { useState, useEffect } from "react";

const Signup = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/user/signup`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div>Hello</div>
    </>
  );
};

export default Signup;
