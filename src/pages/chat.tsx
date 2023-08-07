import Head from "next/head";
import { Header } from "~/components/header/Header";
import ChatInput from "~/components/chat/ChatInput";
import { useSession } from "next-auth/react";
import MessageList from "~/components/chat/MessageList";
import { useState } from "react";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";
import SignIn from "./auth/signin";

export default function Chat() {
  const { data: sessionData, status } = useSession();
  const user = useStore((state) => state.user);
  const [error, setError] = useState<string | null>(null);
  const {
    mutate: askGPT,
    isLoading,
    isError,
  } = api.chat.askOpenAI.useMutation({
    onSuccess: (data) => {
      console.log(data);
      setMessages((messages) => [...messages, { user: false, text: data }]);
    },
    onError: (e) => {
      console.log(e);
      setError(e.message);
    },
  });

  const [messages, setMessages] = useState<message[]>([]);

  const addMessage = (message: message) => {
    if (!user) return;
    const messageList = messages.map((m) => m.text);
    messageList.push(message.text);
    askGPT({
      messages: messageList,
      userID: user?.id,
    });
    setMessages((messages) => [...messages, message]);
  };

  if (status === "unauthenticated") {
    return <SignIn />;
  }

  return (
    <>
      <Head>
        <title>BabySleep</title>
      </Head>
      <Header />
      <main>
        <div className=" h-[calc(100vh-147px)] md:h-[calc(100vh-174px)]">
          {messages && (
            <MessageList
              isLoading={isLoading}
              messages={messages}
              isError={isError}
              error={error || "Error"}
            ></MessageList>
          )}
        </div>
        <ChatInput /* eslint-disable */ /* Error: Promise-returning function provided to attribute where a void return was expected.  @typescript-eslint/no-misused-promises */
          addMessage={addMessage}
        />
      </main>
    </>
  );
}
