import styled from "styled-components";

export const PageWrapper = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 30px;
`;

export const Title = styled.h2`
  color: #0078D4;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const PlanoCard = styled.div`
  background-color: #fff;
  border-left: 6px solid #0078D4;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

export const PlanoInfo = styled.div`
  margin-bottom: 10px;
  color: #333;
`;

export const ButtonGroupStyled = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 12px;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: ${({ disabled }) => (disabled ? "#eee" : "#0078D4")};
  color: ${({ disabled }) => (disabled ? "#999" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  transition: background-color 0.3s;
`;