import { css } from "@emotion/react";
import { useEffect, useContext } from "react";
import { ModalContext, ModalType } from "@lib/hooks";

type LayoutType = {
  children?: JSX.Element | undefined;
}

export const Layout = ({ children }: LayoutType): JSX.Element  => {
  return (
      <div className="Layout" css={{
          background: '#f8f8f8',
          width: "100%",
          height: "100%",
          padding: '0 0 3rem 0',
          "> div:first-of-type": {
              height: "100%",
          }
      }}>
              { children }
      </div>
  );
};
