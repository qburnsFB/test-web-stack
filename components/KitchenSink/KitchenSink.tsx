import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { ModalComponent, Button, Heading } from "@components/Common";
import { ModalContext } from "@lib/helpers";

const blockStyle = {
  background: "#ddd",
  width: "80%",
  display: "block",
  marginBottom: "2rem",
  padding: "2rem",
};

const KitchenSink: NextPage = () => {
  const { toggleVisible } = useContext(ModalContext);
  return (
    <>
      <Head>
        <title>SF Kitchen Sink</title>
      </Head>

      <main
        className="KitchenSink"
        css={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <section className="TextStyles" css={blockStyle}>
          <Heading size="large" key="textStyles">
            Text Styles:
          </Heading>
          <Heading size="larger" as="h1" key="h1">
            H1 Source Sans Pro Light 48px
          </Heading>
          <Heading size="large" as="h2" key="h2">
            H2 Header Source Sans Pro Semibold 21px
          </Heading>
          <p>Paragraph Source Sans Pro Light 16px</p>
        </section>

        <section className="ButtonStyles" css={blockStyle}>
          <Heading size="large" key="btnStyles">
            Button Styles:
          </Heading>
          <Button key="primaryBtn">Primary Button</Button>
          <Button
            key="secondaryBtn"
            variant="secondary"
            css={{
              marginLeft: "2rem",
            }}
          >
            Secondary Button
          </Button>
          <Button
            key="disabledBtn"
            disabled
            css={{
              marginTop: "2rem",
            }}
          >
            Disabled Button
          </Button>
        </section>

        <section className="InputStyles" css={blockStyle}>
          <Heading size="large" key="inputStylesKey">
            Input Styles:
          </Heading>
          <input placeholder="Placeholder" />
          <div
            css={{
              marginTop: "2rem",
            }}
          >
            <label htmlFor="test">Test</label>
            <input id="test" value="Value with label" readOnly />
          </div>
        </section>

        <section className="ModalStyles" css={blockStyle}>
          <Heading size="large">Modal Styles:</Heading>
          <ModalComponent closable>
            This is a super cool, closable modal. You can close with either
            escape key or clicking outside of it.
          </ModalComponent>
          <Button
            key="modalKey"
            variant="secondary"
            css={{
              marginLeft: "2rem",
            }}
            onClick={toggleVisible}
          >
            Open Modal
          </Button>
        </section>
      </main>
    </>
  );
};

export default KitchenSink;
