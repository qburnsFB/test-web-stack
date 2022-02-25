import "normalize.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { createClient, Client, Provider as UrqlProvider } from "urql";
import { ThemeProvider, Global } from "@emotion/react";
import { theme, global } from "@lib/theme";
import { ModalComponent, Layout } from "@components/Common";
import { urqlClient } from '@lib/gql';

function SFApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <Global styles={global} />
        <UrqlProvider value={urqlClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UrqlProvider>
    </ThemeProvider>
  );
}

export default SFApp;
