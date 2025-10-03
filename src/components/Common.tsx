/*import styled from "styled-components";
import { Heading2, Heading3, Heading4, Heading5, Paragraph } from "./Typography"; // Importe os componentes de tipografia

// Container principal
export const Container = styled.div`
  margin-left: 200px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  min-height: 100vh;
`;

// Formulário estilizado
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;

// Campo de entrada
export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

// Área de texto
export const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

// Botão
export const Button = styled.button`
  padding: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  background-color: ${(props) => props.theme.buttonVariants.primary.background};
  color: ${(props) => props.theme.buttonVariants.primary.color};
  border: ${(props) => props.theme.buttonVariants.primary.border};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.button.hoverBackground};
    color: ${(props) => props.theme.colors.button.hoverText};
  }
`;

export const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const PlanoContent = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const PlanoList = styled.ul`
  list-style: none;
  padding: 0;
`;

// Base PlanoItem com estilos compartilhados
export const BasePlanoItem = styled.li`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

// PlanoItem com hover
export const PlanoItemHover = styled(BasePlanoItem)`
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.button.hoverBackground};
    color: ${(props) => props.theme.colors.button.hoverText};
  }
`;

// PlanoItem com flex display
export const PlanoItemFlex = styled(BasePlanoItem)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  justify-content: space-between;
  align-items: flex-start;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

// Texto de erro
export const ErrorText = styled.div`
  color: red;
  margin-bottom: 10px;
`;

// Container com padding lateral responsivo
export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${(props) => props.theme.spacing.md};
  }
`;

// Cabeçalho com botão de ação (ex: Criar Plano)
export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Usando componentes de tipografia
export const Heading2Styled = styled(Heading2)`
  font-size: ${(props) => props.theme.fontSizes.h2};
`;

export const Heading3Styled = styled(Heading3)`
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

export const ParagraphStyled = styled(Paragraph)`
  font-size: ${(props) => props.theme.fontSizes.p};
`;

export { Heading2, Heading3, Heading4, Heading5, Paragraph, ButtonGroup };

export const MainWrapper = styled.div`
  margin-left: 250px;
  padding: 16px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;


export const SuccessPopup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50; // verde sucesso
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-weight: bold;
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-10px); }
  }
  button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;  
    color: white;  
  }  
`;


export const ErrorPopup = styled(SuccessPopup)`
  background-color: #f44336;
  animation: fadeInOut 10s ease-in-out;
  
`;

export const WarningPopup = styled(SuccessPopup)`
  background-color: #FFFF00;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: fadeInOut 10s ease-in-out; 
  button{
    color: black;
  }
  
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;


*/


import styled from "styled-components";
import { Heading2, Heading3, Heading4, Heading5, Paragraph } from "./Typography"; // Importe os componentes de tipografia

// Container principal
export const Container = styled.div`
  margin-left: 5px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  min-height: 100vh;
`;

// Formulário estilizado
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;

// Campo de entrada
export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;


// Área de texto
export const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

// Botão
export const Button = styled.button`
  padding: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  background-color: ${(props) => props.theme.buttonVariants.primary.background};
  color: ${(props) => props.theme.buttonVariants.primary.color};
  border: ${(props) => props.theme.buttonVariants.primary.border};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.button.hoverBackground};
    color: ${(props) => props.theme.colors.button.hoverText};
  }
`;


export const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const PlanoContent = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const PlanoList = styled.ul`
  list-style: none;
  padding: 0;
`;

// Base PlanoItem com estilos compartilhados
export const BasePlanoItem = styled.li`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

// PlanoItem com hover
export const PlanoItemHover = styled(BasePlanoItem)`
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.button.hoverBackground};
    color: ${(props) => props.theme.colors.button.hoverText};
  }
`;

// PlanoItem com flex display
export const PlanoItemFlex = styled(BasePlanoItem)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  justify-content: space-between;
  align-items: flex-start;
  border-left: 6px solid ${(props) => props.theme.colors.primary};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

// Texto de erro
export const ErrorText = styled.div`
  color: red;
  margin-bottom: 10px;
`;

// Container com padding lateral responsivo
export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${(props) => props.theme.spacing.md};
  }
`;

// Cabeçalho com botão de ação (ex: Criar Plano)
export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Usando componentes de tipografia
export const Heading2Styled = styled(Heading2)`
  font-size: ${(props) => props.theme.fontSizes.h2};
`;

export const Heading3Styled = styled(Heading3)`
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

export const ParagraphStyled = styled(Paragraph)`
  font-size: ${(props) => props.theme.fontSizes.p};
`;

export { Heading2, Heading3, Heading4, Heading5, Paragraph, ButtonGroup, ButtonGroupLeft };

export const MainWrapper = styled.div`
  margin-left: 5px;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};

  @media (max-width: 768px) {
    margin-left: 0;
  }

`;


export const SuccessPopup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50; // verde sucesso
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-weight: bold;
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-10px); }
  }
  button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;  
    color: white;  
  }  
`;


export const ErrorPopup = styled(SuccessPopup)`
  background-color: #f44336; /* vermelho */
  animation: fadeInOut 10s ease-in-out;
  
`;

export const WarningPopup = styled(SuccessPopup)`
  background-color: #FFFF00;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: fadeInOut 10s ease-in-out; 
  button{
    color: black;
  }
  
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ButtonGroupLeft = styled.div`
  display: flex;
  gap: 10px;
  align-items: left;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${({ disabled, theme }) =>
    disabled ? "#eee" : theme.colors.primary};
  color: ${({ disabled }) => (disabled ? "#999" : "#fff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  transition: background-color 0.3s;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 12px;
`;


export const PrimaryButton = styled.button`
  background: ${(props) => props.theme.buttonVariants.primary.background};
  color: ${(props) => props.theme.buttonVariants.primary.color};
  border: ${(props) => props.theme.buttonVariants.primary.border};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme.colors.button.hoverBackground};
    color: ${(props) => props.theme.colors.button.hoverText};
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background: ${(props) => props.theme.buttonVariants.secondary.background};
  color: ${(props) => props.theme.buttonVariants.secondary.color};
  border: ${(props) => props.theme.buttonVariants.secondary.border};

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    opacity: 0.9;
  }
`;

export const PaginationLink = styled.button<{ disabled?: boolean }>`
  background: none;
  border: none;
  color: ${({ disabled, theme }) =>
    disabled ? "#999" : theme.colors.primary};
  text-decoration: ${({ disabled }) => (disabled ? "none" : "underline")};
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ disabled, theme }) =>
      disabled ? "#999" : theme.colors.secondary};
  }
`;









