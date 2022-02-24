import { css } from "@emotion/react";
import { useEffect, useContext } from "react";
import { ModalContext } from "@lib/hooks";

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
  opacity: 1,
});

const modalStyles = css({
  transition: "opacity 500ms ease-in-out, top 1000ms",
  backgroundColor: "#fff",
  transformOrigin: "top center",
  transform: "translateX(-50%)",
  position: "fixed",
  left: "50%",
  maxHeight: "calc(100vh - 100px)",
  borderRadius: "0.25rem",
  padding: "1rem",
  outline: "0",
  border: "1px solid #555",
  color: "#555",
  opacity: 0,
  width: "80%",
  top: "0px",
});

const modalVisibleStyles = css({
  opacity: "1",
  top: "30%",
  zIndex: "5000",
});

export const ModalComponent = ({
  children,
  closable = false,
  ...rest
}: ModalType): JSX.Element => {
  const { visible, handleCloseModal } = useContext(ModalContext);
  return (
    <>
      <div
        role="presentation"
        css={[backdropStyles, visible && backdropVisibleStyles]}
        onClick={closable ? handleCloseModal : undefined}
      />
      <div
        className="ModalComponent"
        css={[modalStyles, visible && modalVisibleStyles]}
      >
        {children}
      </div>
    </>
  );
};
