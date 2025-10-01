import styled from "styled-components";

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 280px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.text};
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: ${(props) => props.theme.fontSizes.p};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  background-color: #fff;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: ${(props) => props.theme.fontSizes.p};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
`;

export const MultiSelect = styled.select`
  width: 100%;
  height: 140px;
  padding: 10px;
  font-size: ${(props) => props.theme.fontSizes.p};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  margin-top: 8px;
`;

export const PageTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 24px;
`;