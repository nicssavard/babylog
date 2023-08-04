interface Props {
  message: message;
}

export default function ChatMessage({ message }: Props) {
  return (
    <div>
      {!message.user && (
        <div className="flex justify-end">
          <div className="mx-2 my-2 flex max-w-xs flex-col items-end">
            <div className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white">
              {message.text}
            </div>
          </div>
        </div>
      )}
      {message.user && (
        <div className="flex justify-start">
          <div className="mx-2 my-2 flex max-w-xs flex-col items-start">
            <div className="flex items-center justify-center rounded-lg bg-gray-500 px-4 py-2 text-sm font-medium text-white">
              {message.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
