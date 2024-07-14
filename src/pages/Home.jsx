import React from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/login");
  }, []);
  return (
    <div className="mx-2 my-3">
      <CircularProgress />
    </div>
  );
};

export default Home;
