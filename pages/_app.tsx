import "normalize.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { createClient, Client, Provider as UrqlProvider } from "urql";
import { ThemeProvider, Global } from "@emotion/react";
import { ModalContext } from "@lib/helpers";
import globalStyles from "@lib/theme/global";
import customTheme from "@lib/theme/theme";

const urqlClient: Client = createClient({
  url: "https://graphqlzero.almansi.me/api",
});

function SFApp({ Component, pageProps }: AppProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleVisible = () => setModalVisible(!modalVisible);
  return (
    <ThemeProvider theme={customTheme}>
      <ModalContext.Provider value={{ visible: modalVisible, toggleVisible }}>
        <Global styles={globalStyles} />
        <UrqlProvider value={urqlClient}>
          <Component {...pageProps} />
        </UrqlProvider>
      </ModalContext.Provider>
    </ThemeProvider>
  );
}

export default SFApp;
