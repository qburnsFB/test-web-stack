import "normalize.css";
import type { AppProps } from "next/app";
import React from "react";
import { Provider as UrqlProvider } from "urql";
import { ThemeProvider, Global } from "@emotion/react";
import { theme, global } from "@lib/theme";
import { Layout } from "@components/Common";
import { urqlClient } from "@lib/gql";
import { RecoilRoot } from "recoil";

function SFApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} />
      <UrqlProvider value={urqlClient}>
        <Layout>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Layout>
      </UrqlProvider>
    </ThemeProvider>
  );
}

export default SFApp;
