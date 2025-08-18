import React from 'react';
import styled from 'styled-components';

const LoadingUI = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="box1" />
        <div className="box2" />
        <div className="box3" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 224px;
    height: 224px;
  }

  .box1,
  .box2,
  .box3 {
    border: 32px solid #f5f5f5;
    box-sizing: border-box;
    position: absolute;
    display: block;
  }

  .box1 {
    width: 224px;
    height: 96px;
    margin-top: 128px;
    margin-left: 0px;
    animation: abox1 2s 0.5s forwards ease-in-out infinite;
  }

  .box2 {
    width: 96px;
    height: 96px;
    margin-top: 0px;
    margin-left: 0px;
    animation: abox2 2s 0.5s forwards ease-in-out infinite;
  }

  .box3 {
    width: 96px;
    height: 96px;
    margin-top: 0px;
    margin-left: 128px;
    animation: abox3 2s 0.5s forwards ease-in-out infinite;
  }

  @keyframes abox1 {
    0% { width: 224px; height: 96px; margin-top: 128px; margin-left: 0; }
    12.5%, 25%, 37.5%, 50%, 62.5% { width: 96px; height: 96px; margin-top: 128px; margin-left: 0; }
    75% { width: 96px; height: 224px; margin-top: 0; margin-left: 0; }
    87.5%, 100% { width: 96px; height: 96px; margin-top: 0; margin-left: 0; }
  }

  @keyframes abox2 {
    0%, 12.5%, 25%, 37.5% { width: 96px; height: 96px; margin-top: 0; margin-left: 0; }
    50% { width: 224px; height: 96px; margin-top: 0; margin-left: 0; }
    62.5%, 75%, 87.5%, 100% { width: 96px; height: 96px; margin-top: 0; margin-left: 128px; }
  }

  @keyframes abox3 {
    0%, 12.5% { width: 96px; height: 96px; margin-top: 0; margin-left: 128px; }
    25% { width: 96px; height: 224px; margin-top: 0; margin-left: 128px; }
    37.5%, 50%, 62.5%, 75%, 87.5% { width: 96px; height: 96px; margin-top: 128px; margin-left: 128px; }
    100% { width: 224px; height: 96px; margin-top: 128px; margin-left: 0; }
  }
`;

export default LoadingUI;
