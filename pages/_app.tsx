import "normalize.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { createClient, Client, Provider as UrqlProvider } from "urql";
import { ThemeProvider, Global } from "@emotion/react";
import { ModalContext } from "@lib/helpers";
import { theme, global } from "@lib/theme";

const urqlClient: Client = createClient({
  url: "https://graphqlzero.almansi.me/api",
});

function SFApp({ Component, pageProps }: AppProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleVisible = () => setModalVisible(!modalVisible);
  return (
    <ThemeProvider theme={theme}>
      <ModalContext.Provider value={{ visible: modalVisible, toggleVisible }}>
        <Global styles={global} />
        <UrqlProvider value={urqlClient}>
          <Component {...pageProps} />
        </UrqlProvider>
      </ModalContext.Provider>
    </ThemeProvider>
  );
}

export default SFApp;
