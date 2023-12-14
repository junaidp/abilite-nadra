import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();
  React.useEffect(() => {
    navigate("/login");
  }, []);
  return <div></div>;
};

export default Home;
