import { forwardRef, HTMLAttributes, KeyboardEvent, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, MotionProps } from "framer-motion";
import { PencilIcon } from "./PencilIcon";
import { CreatedAt } from "./CreatedAt";
import { UserName } from "./UserName";
import { User } from "@lib/gql/generated";
import { Avatar } from "@components/Common";
import { UserDescription } from "@components/Home/UserCard/UserDescription";
import { UserModal } from "@components/Home/UserCard/UserModal";
import { useModal } from "@lib/hooks";

export interface UserCardType extends HTMLAttributes<HTMLUListElement> {
  user: User;
}

export const UserCard = forwardRef(
  ({ user, ...rest }: UserCardType & MotionProps, ref: any): JSX.Element => {
    const { description, id, name } = user;
    const { visible, handleToggleModal } = useModal();

    // We assign a ref to the first new user that has loaded in, so we can focus it and continue
    // using our tab/keyboard navigation for a11y instead of it jumping to the button
    useEffect(() => {
      if (ref?.current) {
        ref.current.focus({ preventScroll: true });
      }
    }, [ref?.current]);

    const handleKeyPress = (e: KeyboardEvent<HTMLUListElement>) =>
      e.code === "Space" || e.code === "Enter"
        ? handleToggleModal()
        : undefined;

    const StyledUserCard = styled(motion("li"))`
      height: 336px;
      width: 400px;
      overflow: hidden;
      background: #fff;
      cursor: pointer;
      display: inline-block;
      position: relative;
      padding: 2.75rem 0 2.5rem;
      border-radius: 0.5rem;
      transition: filter 100ms;

      svg,
      p.CreatedAt {
        opacity: 0;
        transition: opacity 250ms;
      }

      &:hover,
      &:focus {
        outline: 0;
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
        svg {
          opacity: 0.6;
        }
        p.CreatedAt {
          opacity: 1;
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
      tap: { scale: 0.9, transition: { duration: 0.15 } },
    };

    return (
      <>
        <StyledUserCard
          className="UserCard"
          tabIndex={0}
          variants={cardVariants}
          initial="initial"
          whileTap="tap"
          onKeyPress={handleKeyPress}
          onClick={handleToggleModal}
          ref={ref}
          data-testid="UserCard"
          {...rest}
        >
          <figure
            css={{
              margin: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={`https://source.unsplash.com/random/168x168/?person,${id}`}
              alt={`Photo of ${name}`}
              css={{
                display: "inline-block",
              }}
            />
          </figure>
          <main
            css={{
              padding: "1.56rem 2rem 0",
            }}
          >
            <div
              css={{
                display: "flex",
              }}
            >
              <UserName name={user.name} />
              <CreatedAt />
            </div>
            <UserDescription description={description} />
          </main>
          <StyledPencilContainer>
            <PencilIcon />
          </StyledPencilContainer>
        </StyledUserCard>
        <UserModal
          user={user}
          visible={visible}
          handleToggleModal={handleToggleModal}
        />
      </>
    );
  }
);

UserCard.displayName = "UserCard";
