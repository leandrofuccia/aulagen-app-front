import styled from "styled-components";

// Seção genérica com espaçamento inferior
export const Section = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

// Card base com sombra leve e bordas suaves
export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.radius.lg};
  padding: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  box-shadow: ${(props) => props.theme.shadow.sm};
`;

// Campo de texto estilizado para textarea
export const Textarea = styled.textarea`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.radius.md};
  border: 1px solid ${(props) => props.theme.colors.input.border};
  font-size: ${(props) => props.theme.fontSizes.p};
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.colors.input.text};
  background-color: ${(props) => props.theme.colors.input.background};
  resize: vertical;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.input.focusBorder};
  }
`;

// Linha de recurso com espaçamento horizontal
export const RecursoRow = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

// Card específico para aulas
export const AulaCard = styled(Card)`
  background-color: #f9f9f9;
`;

// Card específico para atividades
export const AtividadeCard = styled(Card)`
  background-color: #ffffff;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.radius.md};
  border: 1px solid ${(props) => props.theme.colors.input.border};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSizes.p};
  color: ${(props) => props.theme.colors.input.text};
  background-color: ${(props) => props.theme.colors.input.background};
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: ${(props) => props.theme.colors.input.focusBorder};
  }
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.button.background};
  color: ${(props) => props.theme.colors.button.text};
  border: none;
  border-radius: ${(props) => props.theme.radius.md};
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.fontSizes.md};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.button.hoverBackground};
    color: ${(props) => props.theme.colors.button.hoverText};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DeleteButton = styled.button`
  background-color: #fff;
  color: ${(props) => props.theme.colors.secondary}; // laranja AulaGen
  border: 1px solid ${(props) => props.theme.colors.secondary};
  padding: 6px 12px;
  border-radius: ${(props) => props.theme.radius.md};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fff7f0;
    border-color: #d65c00;
    color: #d65c00;
  }

  span.icon {
    color: ${(props) => props.theme.colors.secondary}; // ícone laranja
    font-weight: bold;
  }
`;
