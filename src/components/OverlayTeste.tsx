import React, { useState } from "react";
import styled from "styled-components";

const Page = styled.div`
  height: 100vh;
  background-image: url("/icons/background.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Content = styled.div`
  padding: 40px;
  color: white;
  font-size: 24px;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid #ccc;
  border-top: 6px solid #0078d4;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const OverlayTest = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <Page>
      <Content>
        <p>Conteúdo visível atrás do overlay.</p>
        <button onClick={() => setShowOverlay(true)}>Mostrar Overlay</button>
      </Content>

      {showOverlay && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
    </Page>
  );
};

export default OverlayTest;