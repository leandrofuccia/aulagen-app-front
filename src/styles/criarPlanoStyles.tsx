import styled from "styled-components";

export const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  align-items: flex-start;
  width: 100%;
  /* empilha em telas pequenas */
  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; /* evita overflow dentro do flex */
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.text};
`;

const baseField = `
  width: 100%;
  padding: 10px;
  font-size: ${(props: any) => props.theme.fontSizes.p};
  border: 1px solid ${(props: any) => props.theme.colors.border};
  border-radius: 6px;
  background-color: #fff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
`;

export const Select = styled.select`
  ${baseField}
  appearance: none;

  &:focus {
    border-color: #0078d4;
    box-shadow: 0 0 0 4px rgba(0, 120, 212, 0.08);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: ${(props: any) => props.theme.fontSizes.p};
  border: 1px solid ${(props: any) => props.theme.colors.border};
  border-radius: 6px;
  background-color: #fff;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
  box-shadow: none;

  &:focus,
  &:focus-visible {
    border-color: #0078d4;
    box-shadow: 0 0 0 4px rgba(0, 120, 212, 0.08);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    box-shadow: 0 0 0 30px #fff inset;
    -webkit-box-shadow: 0 0 0 30px #fff inset;
    -webkit-text-fill-color: inherit;
    transition: background-color 5000s ease-in-out 0s;
  }

  /* remove possíveis outlines grosseiros em alguns navegadores */
  &:invalid {
    box-shadow: none;
  }
`;

export const MultiSelect = styled.select`
  ${baseField}
  height: 140px;
  margin-top: 8px;
  border-radius: 8px;
  min-height: 120px;
  resize: none;

  &:focus {
    border-color: #0078d4;
    box-shadow: 0 0 0 4px rgba(0, 120, 212, 0.08);
  }
`;

export const PageTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 24px;
`;

export const FullWidthButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 16px;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.12s ease, transform 0.06s ease;

  &:hover {
    background: darken(${(props: any) => props.theme.colors.primary}, 7%);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;