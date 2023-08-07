import ChatMessage from "./ChatMessage";
import { LoadingSpinner } from "../loading";

interface Props {
  messages: message[];
  isLoading: boolean;
  isError: boolean;
  error: string;
}

export default function MessageList({
  messages,
  isLoading,
  isError,
  error = "error",
}: Props) {
  const loading = <LoadingSpinner color="fill-blue-600 text-white-300" />;
  return (
    <div className="mx-auto flex max-h-full  flex-grow flex-col overflow-y-auto md:max-w-2xl 1080:max-w-4xl">
      <div className="flex flex-col space-y-4">
        <ChatMessage
          message={{
            user: false,
            text: "Hello, I am your personnal assistant. Please ask me a question.",
          }}
        />

        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
        {isError && <ChatMessage message={{ user: false, text: error }} />}
        {isLoading && (
          <ChatMessage message={{ user: false, text: "" }}>
            {loading}
          </ChatMessage>
        )}
      </div>
    </div>
  );
}
