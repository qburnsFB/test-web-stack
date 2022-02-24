import {
  useRef,
  createContext,
  useState,
  useEffect,
  MouseEventHandler,
} from "react";
import { useKeyPress } from "@lib/hooks";

type ModalType = {
  visible: boolean;
  handleShowModal?: (c: JSX.Element) => void;
  handleCloseModal?: () => void;
  closable?: boolean;
  content: JSX.Element | string | undefined;
};

const ModalContext = createContext<ModalType>({
  visible: false,
  content: "",
});

const useSetupModal = ({
  isVisible = false,
  isClosable = true,
  content,
}: ModalType) => {
  const escapePressed: boolean = useKeyPress("Escape");
  const [visible, setVisible] = useState(isVisible);
  const [closable, setClosable] = useState(isClosable);

  const modalContent = useRef<JSX.Element>(content);

  const handleShowModal = (newContent: JSX.Element, isClosable: boolean) => {
    modalContent.current = newContent;
    setClosable(isClosable);
    setVisible(true);
  };

  const handleCloseModal = () => setVisible(false);

  // Handle escape button closing the modal
  useEffect(() => {
    if (closable && escapePressed && visible && handleCloseModal) {
      return handleCloseModal();
    }
  }, [closable, escapePressed, visible, handleCloseModal]);

  return {
    visible,
    handleCloseModal,
    handleShowModal,
    content: modalContent.current,
  };
};

export { ModalType, ModalContext, useSetupModal };
