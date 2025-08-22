import React from "react";
import styled from "styled-components";

const LoadingUI = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="cell d-0" />
        <div className="cell d-1" />
        <div className="cell d-2" />
        <div className="cell d-1" />
        <div className="cell d-2" />
        <div className="cell d-2" />
        <div className="cell d-3" />
        <div className="cell d-3" />
        <div className="cell d-4" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;

  .loader {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
  }

  .cell {
    width: 80px;
    height: 80px;
    border-radius: 0.75rem;
    border: 2px solid #000;
    background-color: transparent;
    animation: 1.5s ripple ease infinite;
  }

  /* Задержки */
  .cell.d-1 { animation-delay: 100ms; }
  .cell.d-2 { animation-delay: 200ms; }
  .cell.d-3 { animation-delay: 300ms; }
  .cell.d-4 { animation-delay: 400ms; }

  /* Цвета */
  .cell:nth-child(1) { --cell-color: #00FF87; }
  .cell:nth-child(2) { --cell-color: #0CFD95; }
  .cell:nth-child(3) { --cell-color: #17FBA2; }
  .cell:nth-child(4) { --cell-color: #23F9B2; }
  .cell:nth-child(5) { --cell-color: #30F7C3; }
  .cell:nth-child(6) { --cell-color: #3DF5D4; }
  .cell:nth-child(7) { --cell-color: #45F4DE; }
  .cell:nth-child(8) { --cell-color: #53F1F0; }
  .cell:nth-child(9) { --cell-color: #60EFFF; }

  @keyframes ripple {
    0%   { background-color: transparent; }
    30%  { background-color: var(--cell-color); }
    60%  { background-color: transparent; }
    100% { background-color: transparent; }
  }

  /* Адаптив */
  @media (min-width: 640px) {
    .cell {
      width: 110px;
      height: 110px;
    }
  }

  @media (min-width: 768px) {
    .cell {
      width: 140px;
      height: 140px;
    }
  }

  @media (min-width: 1024px) {
    .cell {
      width: 170px;
      height: 170px;
    }
  }
`;

export default LoadingUI;
