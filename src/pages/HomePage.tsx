import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const containerStyle: React.CSSProperties = {
    backgroundColor: "#004d00",
    height: "100vh",
    width: "100vw",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "3rem",
    fontWeight: "bold",
  };

  const buttonContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: "20px",
    right: "20px",
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    padding: "0.5rem 1.2rem",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "black";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div style={containerStyle}>
      <div style={buttonContainerStyle}>
        <button
          style={buttonStyle}
          onClick={() => navigate("/form-builder")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Form Builder
        </button>
      </div>
      <h1 style={titleStyle}>reboot2025</h1>
    </div>
  );
};

export default Home;
