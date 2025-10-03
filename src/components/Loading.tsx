/*import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingImage = styled.img`
  width: 50px; 
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingImage src="/icons/loading.svg" alt="Carregando..." />
    </LoadingContainer>
  );
};

export default Loading;
*/

import styled from "styled-components";

const LoadingOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3); /* fundo escuro com transparência real */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingImage = styled.img`
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  margin-top: 12px;
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
  text-align: center;
`;

const Loading = () => {
  return (
    <LoadingOverlay>
      <div>
        <LoadingImage src="/icons/loading.svg" alt="Carregando..." />
      </div>
    </LoadingOverlay>
  );
};

export default Loading;