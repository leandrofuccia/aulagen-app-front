"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonGroup } from "@/components/Common";
import IconButton from "./IconButton";
import { useRouter } from "next/navigation";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  transition: all 0.3s ease;
  padding: 12px 24px;

  .header-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 16px;
  }
`;

const Logo = styled.img`
  height: 100px;
  width: auto;

  @media (max-width: 768px) {
    height: 32px;
  }
`;

interface HeaderProps {
  onLogout: () => void;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onBack }) => {
  const [fullName, setUsername] = useState<string>("Usuário");
  const username = fullName.split(" ")[0];
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("usuario");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <HeaderContainer>
      <div className="header-left">
        <Logo src="/icons/logo-aulagen.png" alt="Logo AulaGen" />
      </div>

      <div className="header-left">
        <IconButton
          icon="/icons/home.svg"
          alt="Início"
          tooltip="Ir para Início"
          label="Início"
          showLabel="side"
          onClick={() => router.push("/admin")}
        />
      </div>

      <ButtonGroup>
        <span className="username">Olá, {username}!</span>
        <IconButton
          icon="/icons/logout.png"
          alt="Logout"
          tooltip="Logout"
          label="Logout"
          onClick={onLogout}
        />
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;