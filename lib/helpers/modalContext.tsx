import React, { MouseEventHandler } from "react";

type ModalType = {
  visible: boolean;
  toggleVisible: undefined | MouseEventHandler;
};

export const ModalContext = React.createContext<ModalType>({
  visible: false,
  toggleVisible: undefined,
});
