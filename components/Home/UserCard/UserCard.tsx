import { useEffect, useState, forwardRef, useRef } from "react";
import styled from "@emotion/styled";
import { Interpolation, Theme } from "@emotion/react";
import { motion } from "framer-motion";
import { PencilIcon } from "./PencilIcon";
import { CreatedAt } from "./CreatedAt";
import { UserName } from "./UserName";
import { User } from "@lib/gql/generated";
import { Modal, Avatar, Heading, Button } from "@components/Common";
import { useModal, useKeyPress } from "@lib/hooks";
import { UserDescription } from "./UserDescription";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoicWJ1cm5zIiwiYSI6ImNsMDI5YWtjMzBiNTczY21qa2ZiOXBhOTQifQ.jPgxv9MolX-JhEbc-y3okQ";

// todo: need to make this map available in an accessible way, maybe by checking if its visible and only setting the ref then?
// todo: need to handle no search results
export type UserCardType = {
  user: User;
  ref?: ForwardedRef<HTMLButtonElement>;
};

export const UserCard = forwardRef(
  ({ user, ...rest }: UserCardType, ref): JSX.Element => {
    const { visible, handleToggleModal } = useModal();
    const [fakeSaving, setFakeSaving] = useState(false);
    const handleFakeSaving = () => {
        setFakeSaving(true);
        setTimeout(() => {
            setFakeSaving(false);
            handleToggleModal();
        }, 750);
    };
    const mapRef = useRef(null);

    const StyledUserCard = styled("button")`
      height: 336px;
      width: 400px;
      overflow: hidden;
      background: #fff;
      cursor: pointer;
      display: inline-block;
      position: relative;
      padding: 2.75rem 0 2.5rem;
      border-radius: 8px;
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
      tap: { scale: 1.05, transition: { duration: 0.15 } },
    };

    return (
      <>
        <StyledUserCard
          className="UserCard"
          role="button"
          id={`${user.id}-${user.name}-Card`}
          {...rest}
          variants={cardVariants}
          initial="initial"
          whileTap="tap"
          tabIndex={0}
          onKeyPress={handleToggleModal}
          onClick={handleToggleModal}
          ref={ref}
        >
          <figure
            css={{
              margin: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              src={`https://source.unsplash.com/random/168x168/?person,${user?.id}`}
              alt={`Photo of ${user.name}`}
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
              <UserName name={user?.name} />
              <CreatedAt />
            </div>
            <UserDescription description={user.description} />
          </main>
          <StyledPencilContainer>
            <PencilIcon />
          </StyledPencilContainer>
        </StyledUserCard>
        <Modal toggleModal={handleToggleModal} visible={visible}>
          <div>
            <Heading
              size="larger"
              css={{
                margin: 0,
              }}
            >
              Edit User
            </Heading>
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "518px auto",
              }}
            >
              <figure ref={mapRef}>test</figure>

              <div
                css={{
                  input: {
                    marginBottom: "2rem",
                    width: "100%",
                  },
                }}
              >
                <label htmlFor="name">Name</label>
                <input name="name" defaultValue={user.name} />
                <label htmlFor="address">Address</label>
                <input name="address" defaultValue={user.address} />
                <label htmlFor="description">Description</label>
                <input name="description" defaultValue={user.description} />


                  <div
                      css={{
                          display: "flex",
                          justifyContent: "space-between"
                      }}
                  >
                      <Button loading={fakeSaving} onClick={handleFakeSaving}>SAVE</Button>
                      <Button variant="secondary" onClick={handleToggleModal}>CANCEL</Button>
              </div>
            </div>
          </div>
          </div>
        </Modal>
      </>
    );
  }
);

UserCard.displayName = "UserCard";
