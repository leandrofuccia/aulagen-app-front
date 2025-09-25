"use client";

import React from "react";
import styled, { DefaultTheme } from "styled-components";

type LabelPosition = "none" | "side" | "below";
type FontSizeToken = keyof DefaultTheme["fontSizes"];

const ButtonWrapper = styled.button<{ $direction: "row" | "column" }>`
  display: inline-flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  padding: 4px;

  &:hover .tooltip {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Label = styled.span<{
  $direction: "row" | "column";
  $labelSize: FontSizeToken;
}>`
  font-size: ${({ theme, $labelSize }) => theme.fontSizes[$labelSize]};
  text-align: center;
  margin-left: ${({ $direction }) => ($direction === "row" ? "8px" : "0")};
  margin-top: ${({ $direction }) => ($direction === "column" ? "4px" : "0")};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(6px);
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 12px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 10;
`;

type IconButtonProps = {
  icon: string;
  alt: string;
  label?: string;
  tooltip?: string;
  onClick: () => void;
  showLabel?: LabelPosition;
  labelSize?: FontSizeToken; // "sm" | "md" | "lg" etc.
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  alt,
  label,
  tooltip,
  onClick,
  showLabel = "none",
  labelSize = "md",
}) => {
  const direction = showLabel === "below" ? "column" : "row";
  const shouldRenderLabel = showLabel !== "none" && label;

  return (
    <ButtonWrapper
      onClick={onClick}
      aria-label={tooltip ?? alt}
      title={tooltip ?? alt}
      $direction={direction}
    >
      <Icon src={icon} alt={alt} />
      {shouldRenderLabel && (
        <Label $direction={direction} $labelSize={labelSize}>
          {label}
        </Label>
      )}
      {tooltip && <Tooltip className="tooltip">{tooltip}</Tooltip>}
    </ButtonWrapper>
  );
};

export default IconButton;
