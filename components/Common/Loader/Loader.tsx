import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

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
  width: 1.2rem;
  height: 1.2rem;
  background-color: #333;
  border-radius: 100%;
  display: inline-block;
  animation: ${Bounce} 1s infinite ease-in-out both;
  &:first-of-type {
    animation-delay: -0.40s;
  }

  &:nth-of-type(2) {
    animation-delay: -0.20s;
  }
`;

export const Loader = () => {
  return (
      <StyledDotsLoader>
        <Dot />
        <Dot />
        <Dot  />
      </StyledDotsLoader>
  );
};
