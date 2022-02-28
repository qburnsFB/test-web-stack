import type { NextPage } from "next";
import Head from "next/head";
import { Avatar, Button, Heading, Modal } from "@components/Common";
import { UserCard } from "@components/Home/UserCard";
import { useModal } from "@lib/hooks/useModal";

const blockStyle = {
  background: "#ddd",
  width: "80%",
  display: "block",
  marginBottom: "2rem",
  padding: "2rem",
};

export const KitchenSink: NextPage = () => {
  // @ts-ignore
  const { visible, handleToggleModal } = useModal();
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
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
          <Heading size="large">Text Styles:</Heading>
          <Heading size="larger" as="h1">
            H1 Source Sans Pro Light 48px
          </Heading>
          <Heading size="large" as="h2">
            H2 Header Source Sans Pro Semibold 21px
          </Heading>
          <p>Paragraph Source Sans Pro Light 16px</p>
        </section>

        <section className="ButtonStyles" css={blockStyle}>
          <Heading size="large">Button Styles:</Heading>
          <Button>Primary Button</Button>
          <Button
            variant="secondary"
            css={{
              margin: "0 2rem",
            }}
          >
            Secondary Button
          </Button>
          <Button
            disabled
            css={{
              marginTop: "2rem",
            }}
          >
            Disabled Button
          </Button>
        </section>

        <section className="InputStyles" css={blockStyle}>
          <Heading size="large">Input Styles:</Heading>
          <input placeholder="Placeholder" />
          <div
            css={{
              marginTop: "2rem",
            }}
          >
            <label htmlFor="test">Test</label>
            <input id="test" value="Readonly value with label" readOnly />
          </div>
        </section>

        <section className="ModalStyles" css={blockStyle}>
          <Heading size="large">Modal Styles:</Heading>
          <Button
            variant="secondary"
            css={{
              marginLeft: "2rem",
            }}
            onClick={handleToggleModal}
          >
            Open Modal
          </Button>
          <Modal closable toggleModal={handleToggleModal} visible={visible}>
            <div>
              <Heading size="large">Super cool heading</Heading>
              <p>Super cool Modal</p>
            </div>
          </Modal>
        </section>

        <section className="ModalStyles" css={blockStyle}>
          <Heading size="large">Card Styles:</Heading>
          <Avatar
            src="https://source.unsplash.com/random/200x200/?person"
            alt="Random Person"
          />

          <UserCard
            css={{
              marginTop: "2rem",
            }}
            /*
              // @ts-ignore */
            user={{
              id: "1",
              name: "Tim Jones",
              dob: "1957-10-10",
              address: "1015 Timber Ridge Trail, 40223",
              description: "Random user description, this is a fun one",
            }}
          />
        </section>
      </main>
    </>
  );
};
