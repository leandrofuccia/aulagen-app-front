import styled from "styled-components";

// Títulos principais (h1, h2, h3)
export const Heading1 = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.h2};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.h3};
  }
`;

export const Heading2 = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.h2};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.h3};
  }
`;

export const Heading3 = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.h3};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  padding-bottom: ${(props) => props.theme.spacing.md}; 
  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.p};
  }
`;

export const Heading4 = styled.h2`
 padding-top: ${(props) => props.theme.spacing.md};
`;

export const Heading5 = styled.h2`
 padding-top: ${(props) => props.theme.spacing.md};
 padding-bottom: ${(props) => props.theme.spacing.md};
 text-align: center;
`;

// Parágrafos (texto normal)
export const Paragraph = styled.p`
  display: flex;
  gap: 16px; 
  font-size: ${(props) => props.theme.fontSizes.p};
  margin-bottom: ${(props) => props.theme.spacing.sm};

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.p};
  }
`;

// Pode ser usado para títulos no Header e Sidebar
export const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.h2};
  margin-bottom: ${(props) => props.theme.spacing.md};

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.h3};
  }
`;

export const Subtitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.h3};
  margin-bottom: ${(props) => props.theme.spacing.sm};

  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSizes.p};
  }
`;

export const ButtonText = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.theme.buttonVariants.primary.color};
  text-align: center;
`;

