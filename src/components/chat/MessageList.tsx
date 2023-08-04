import ChatMessage from "./ChatMessage";

interface Props {
  messages: message[];
}

export default function MessageList({ messages }: Props) {
  return (
    <div className="mx-auto flex max-h-full flex-grow flex-col overflow-y-auto md:max-w-2xl 1080:max-w-4xl">
      <div className="flex flex-col space-y-4">
        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
      </div>
    </div>
    // <div className="flex h-full flex-col">
    //   <div className="flex flex-grow flex-col-reverse overflow-y-auto">
    //     <div className="flex flex-col-reverse space-y-4">
    //   {messages.map((message, i) => (
    //     <ChatMessage key={i} message={message} />
    //   ))}
    //     </div>
    //   </div>
    // </div>
  );
}
