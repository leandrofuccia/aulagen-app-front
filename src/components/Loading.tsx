import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingImage = styled.img`
  width: 50px; /* Ajuste o tamanho da imagem */
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