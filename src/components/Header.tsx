"use client"

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Title } from "./Typography";
import { useThemeToggle } from "@/context/ThemeContext";
import {ButtonGroup} from "@/components/Common"
import IconButton from "./IconButton";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.3s ease;
  padding: 16px 35px;

  .header-left {
     display: flex;
     align-items: center;
     gap: 12px; /* Espaço entre os elementos */
   }

  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

interface HeaderProps {
  onLogout: () => void;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onBack}) => {
  const { toggleTheme, isDark } = useThemeToggle();
  const [fullName, setUsername] = useState<string>("Usuário");
  const username = fullName.split(" ")[0]; 

  useEffect(() => {
    const storedUsername = localStorage.getItem("usuario");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    
  }, []);



  return (
    <HeaderContainer>
      <div className="header-left">
        {onBack && (
          <IconButton
            icon="/icons/back.svg"
            alt="Voltar"
            tooltip="Voltar"
            label="Voltar"
            onClick={onBack}
          />
        )}
        <Title>Aula Gen</Title>
      </div>
      <ButtonGroup>
        <span className="username">Olá, {username}!</span>
        <IconButton
          icon={isDark ? "/icons/sun.svg" : "/icons/moon.svg"}
          alt=""
          tooltip={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
          label={isDark ? "Tema claro" : "Tema escuro"}
          onClick={toggleTheme}
        />
        <IconButton
          icon="/icons/logout.png"
          alt=""
          tooltip="Logout"
          label="Logout"
          showLabel="none"
          onClick={onLogout}
        />
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;