import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingUI = () => {
  return (
    <StyledWrapper>
      <div className="loader ">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="square" />
        ))}
      </div>
    </StyledWrapper>
  );
};

const pulse = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

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

  .square {
    width: 80px;
    height: 80px;
    border-radius: 0.75rem;
    border: 2px solid #000;
    background: #2d3e4b;
    animation: ${pulse} 1.2s ease-in-out infinite;
  }

  @media (min-width: 640px) {
    .square {
      width: 110px;
      height: 110px;
    }
  }

  @media (min-width: 768px) {
    .square {
      width: 140px;
      height: 140px;
    }
  }

  @media (min-width: 1024px) {
    .square {
      width: 170px;
      height: 170px;
    }
  }
`;

export default LoadingUI;
