import "normalize.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { createClient, Client, Provider as UrqlProvider } from "urql";
import { ThemeProvider, Global } from "@emotion/react";
import { useSetupModal, ModalContext } from "@lib/hooks/useSetupModal";
import { theme, global } from "@lib/theme";
import { ModalComponent } from "@components/Common";

const urqlClient: Client = createClient({
  url: "https://graphqlzero.almansi.me/api",
});

function SFApp({ Component, pageProps }: AppProps) {
  const { visible, handleCloseModal, handleShowModal, content } = useSetupModal(
    {}
  );
  return (
    <ThemeProvider theme={theme}>
      <ModalContext.Provider
        value={{
          visible,
          handleCloseModal,
          handleShowModal,
          content,
        }}
      >
        <Global styles={global} />
        <UrqlProvider value={urqlClient}>
          <Component {...pageProps} />
          <ModalComponent closable>{content}</ModalComponent>
        </UrqlProvider>
      </ModalContext.Provider>
    </ThemeProvider>
  );
}

export default SFApp;
