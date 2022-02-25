import { css } from "@emotion/react";
import { useEffect, useContext } from "react";
import { useKeyPress } from "@lib/hooks";
import FocusLock from 'react-focus-lock';
import {
  useState
} from "react";

const backdropStyles = css({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  opacity: 0,
  zIndex: -3000,
  position: "fixed",
});

const backdropVisibleStyles = css({
  zIndex: 3000,
  opacity: 0.7,
});

const modalStyles = css({
  transition: "opacity 500ms ease-in-out, top 1000ms",
  backgroundColor: "#f8f8f8",
  transformOrigin: "top center",
  transform: "translateX(-50%)",
  position: "fixed",
  maxHeight: "calc(100vh - 100px)",
  borderRadius: "0.5rem",
  padding: "4rem",
  outline: "0",
  color: "#555",
  opacity: 0,
  top: "0",
  width: 0,
});

const modalVisibleStyles = css({
  opacity: "1",
  top: "30%",
  left: "50%",
  width: "80%",
  zIndex: "5000",
});

type ModalType = {
  toggleModal: () => void;
  visible: boolean;
  closable?: boolean;
  children?: JSX.Element | undefined;
}

export const Modal = ({
  children,
    visible = false,
    toggleModal,
  closable = true,
  ...rest
}: ModalType): JSX.Element => {
  // Handle escape button closing the modal
  const escapePressed: boolean = useKeyPress("Escape");
  useEffect(() => {
    if (closable && escapePressed && visible) {
      return toggleModal();
    }
  }, [closable, escapePressed, visible, toggleModal]);

  return (
    <>
      <div
          aria-labelledby="Edit User Dialog"
        role="dialog"
        css={[backdropStyles, visible && backdropVisibleStyles]}
        onClick={closable ? toggleModal : undefined}
      />
      <div
        className="Modal"
        css={[modalStyles, visible && modalVisibleStyles]}
      >
        {visible && <FocusLock>
          {children}
        </FocusLock>}
      </div>
    </>
  );
};
