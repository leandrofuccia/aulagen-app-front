"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

type LinkItem = {
  label: string;
  href: string;
};

type SidebarProps = {
  links: LinkItem[];
};

const SidebarWrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.3s ease;
  z-index: 1000;
  width: 250px;

  /* Mobile: oculta se !$isOpen */
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});

  @media (min-width: 768px) {
    transform: translateX(0); /* Sempre visível no desktop */
  }
`;

/*const MainWrapper = styled.main`
  margin-left: 250px;
  padding: 16px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;
*/
const ToggleButton = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1100;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 80px 0 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 16px 24px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.md};

    &:hover {
      color: ${({ theme }) => theme.colors.background};
      background-color: ${({ theme }) => theme.colors.primary};
      display: block;
    }
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? "Fechar" : "Menu"}
      </ToggleButton>

      <SidebarWrapper $isOpen={isOpen}>
        <SidebarMenu>
          {links.map((link) => (
            <MenuItem key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </MenuItem>
          ))}
        </SidebarMenu>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
