import React from "react";
import { useNavigate } from "react-router-dom";

function BotaoVoltar({ backUrl = "/" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(backUrl);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        zIndex: 9999,
      }}
    >
      <img src="/img/Carousel-Left-Fill.png" alt="Voltar" height="35" />
    </button>
  );
}

export default BotaoVoltar;
