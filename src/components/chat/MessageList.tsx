import ChatMessage from "./ChatMessage";
import { LoadingSpinner } from "../loading";

interface Props {
  messages: message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: Props) {
  const loading = <LoadingSpinner color="fill-blue-600 text-white-300" />;
  return (
    <div className="mx-auto flex max-h-full  flex-grow flex-col overflow-y-auto md:max-w-2xl 1080:max-w-4xl">
      <div className="flex flex-col space-y-4">
        {messages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
        {isLoading && (
          <div>
            <div className="flex justify-end">
              <div className="mx-2 my-2 flex max-w-xs flex-col items-end">
                <div className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white">
                  {loading}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
