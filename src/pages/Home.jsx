import React from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div
      className="mx-2 my-3"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Home;
