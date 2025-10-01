import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 30px;
  max-width: 1000px;
  margin: auto;
`;

export const SectionCard = styled.div`
  background-color: #fdfdfd;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  
`;

export const MarkdownCard = styled.div`
  background-color: #f9f9f9;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 30px; 
`;

export const MarkdownSectionTitle = styled.h3`
  margin-top: 24px;
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.h3};
  font-weight: bold;
  border-left: 4px solid ${(props) => props.theme.colors.primary};
  padding-left: 12px;
`;

export const MarkdownSubTitle = styled.p`
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 16px;
`;


export const MarkdownH3 = styled.h3`
  margin-top: 24px;
  margin-bottom: 8px;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

export const MarkdownP = styled.p`
  margin-bottom: 12px;
  font-size: ${(props) => props.theme.fontSizes.p};
  color: ${(props) => props.theme.colors.text};
`;

export const MarkdownUl = styled.ul`
  padding-left: 24px;
  margin-bottom: 12px;
`;

export const MarkdownLi = styled.li`
  margin-bottom: 6px;
  font-size: ${(props) => props.theme.fontSizes.p};
`;


export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 30px;
  
  thead {
    background-color: #eee;
  }

  th, td {
    padding: 8px;
    border: 1px solid ${(props) => props.theme.colors.border};
    text-align: left;
    font-size: ${(props) => props.theme.fontSizes.sm};
    color: ${(props) => props.theme.colors.text};
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f0f8ff;
  }
`;

export const TableHead = styled.thead`
  background-color: #eee;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid "${(props) => props.theme.colors.border}";
  text-align: left;
`;


export const AulaCard = styled.div`
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const AulaTitle = styled.p`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.md};
  margin-bottom: 12px;
  color: ${(props) => props.theme.colors.primary};
`;


export const AtividadesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  thead {
    background-color: #f0f0f0;
  }

  th, td {
    padding: 8px;
    border: 1px solid ${(props) => props.theme.colors.border};
    text-align: left;
    font-size: ${(props) => props.theme.fontSizes.sm};
    color: ${(props) => props.theme.colors.text};
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f0f8ff;
  }

  td:first-child {
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
}

`;


export const RecursosList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 12px;
`;

export const RecursoItem = styled.li`
  position: relative;
  padding-left: 24px;
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSizes.p};
  color: ${(props) => props.theme.colors.text};

  &::before {
    content: "🔹";
    position: absolute;
    left: 0;
    top: 0;
  }
`;

export const AvaliacaoTexto = styled.p`
  font-size: ${(props) => props.theme.fontSizes.p};
  color: ${(props) => props.theme.colors.text};
  line-height: 1.6;
  margin-top: 12px;
`;

export const PlanoHeader = styled.div`
  background-color: #fff;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const PlanoTitulo = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 16px;
`;

export const PlanoInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
`;

export const PlanoInfoItem = styled.div`
  font-size: ${(props) => props.theme.fontSizes.p};
  color: ${(props) => props.theme.colors.text};

  strong {
    display: block;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 4px;
  }
`;


