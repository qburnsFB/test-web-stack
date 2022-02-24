import { forwardRef } from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme } from "@emotion/react";
import { motion } from "framer-motion";
import { PencilIcon } from "./PencilIcon";

export type UserType = {
  user: {
    id: string;
    name: string;
    address: string;
  };
  as?: keyof JSX.IntrinsicElements;
  css?: Interpolation<Theme>;
  children: JSX.Element | string;
};

export const UserCard = forwardRef<HTMLDivElement, UserType>(
  ({ user, children, ...rest }: UserType, ref): JSX.Element => {
    const StyledUserCard = styled(motion.div)`
      height: 336px;
      width: 400px;
      overflow: hidden;
      background: #fff;
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: filter 100ms;

      > svg {
        opacity: 0;
        transition: opacity 250ms;
      }

      &:hover,
      &:focus {
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
        svg {
          opacity: 0.6;
        }
      }
    `;

    const StyledPencilContainer = styled.div`
      position: absolute;
      top: 1.125rem;
      right: 1.125rem;
      height: 1.125rem;
    `;
    const cardVariants = {
      initial: { scale: 1, transition: { duration: 0.1 } },
      hover: { y: -5, transition: { duration: 0.1 } },
      tap: { scale: 1.1, transition: { duration: 0.15 } },
    };

    return (
      <StyledUserCard
        ref={ref}
        {...rest}
        variants={cardVariants}
        initial="initial"
        whileFocus="hover"
        whileHover="hover"
        whileTap="tap"
      >
        {children}
        <StyledPencilContainer>
          <PencilIcon />
        </StyledPencilContainer>
      </StyledUserCard>
    );
  }
);

UserCard.displayName = "UserCard";
