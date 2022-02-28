import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { HTMLAttributes } from "react";

interface LoaderType extends HTMLAttributes<HTMLDivElement> {
  size?: string;
  color?: string;
}

export const Loader = ({
  size = "1.25rem",
  color = "#444",
  ...rest
}: LoaderType) => {
  const Bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
      transform: scale(1.0);
    }
`;

  const StyledDotsLoader = styled.div`
    display: inline-block;
  `;

  const Dot = styled.span`
    width: ${() => size};
    height: ${() => size};
    background-color: ${() => color};
    border-radius: 100%;
    display: inline-block;
    animation: ${Bounce} 1s infinite ease-in-out both;
    &:first-of-type {
      animation-delay: -0.4s;
    }

    &:nth-of-type(2) {
      animation-delay: -0.2s;
    }
  `;
  return (
    <StyledDotsLoader {...rest}>
      <Dot />
      <Dot />
      <Dot />
    </StyledDotsLoader>
  );
};
