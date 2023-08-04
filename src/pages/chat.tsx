import Head from "next/head";
import { Header } from "~/components/Header";
import ChatInput from "~/components/chat/ChatInput";
import MessageList from "~/components/chat/MessageList";
import { useState } from "react";
import { Container } from "~/components/Container";

export default function Chat() {
  const [messages, setMessages] = useState<message[]>([
    { user: true, text: "user" },
    { user: false, text: "Chat GPT" },
  ]);

  const addMessage = (message: message) => {
    const answer: message = { user: false, text: "I'm a bot" };

    setMessages((messages) => [...messages, message]);
    setMessages((messages) => [...messages, answer]);
  };
  return (
    <>
      <Head>
        <title>BabySleep</title>
      </Head>
      <Header />

      <main>
        <Container>
          {messages && <MessageList messages={messages}></MessageList>}
          <ChatInput addMessage={addMessage} />
        </Container>
      </main>
    </>
  );
}
