import { useRef } from "react";
import { toast } from "react-hot-toast";

interface Props {
  addMessage: (message: message) => void;
}

export default function ChatInput({ addMessage }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value) {
      toast.error("Please enter a question");
      return;
    }
    if (inputRef.current?.value.length < 10) {
      toast.error("Please enter a question with more than 10 characters");
      return;
    }
    if (inputRef.current?.value.length > 500) {
      toast.error("Please enter a question with less than 500 characters");
      return;
    }
    const message: message = {
      user: true,
      text: inputRef.current?.value || "",
    };
    addMessage(message);
    inputRef.current.value = "";
  };

  const autoResize = (e: any) => {
    /* eslint-disable-next-line */
    e.target.style.height = "inherit"; /* eslint-disable-next-line */
    e.target.style.height = `${e.target.scrollHeight}px`; /*Error: Unsafe member access .target on an `any` value.*/
  };
  return (
    <div className="md:bg-vert-light-gradient dark:md:bg-vert-dark-gradient absolute sticky bottom-0 left-0 w-full border-t bg-white pb-1 pt-2 dark:border-white/20 dark:bg-gray-800 md:w-[calc(100%-.5rem)] md:border-t-0 md:border-transparent md:!bg-transparent md:pl-2 md:dark:border-transparent">
      <form
        onSubmit={handleSubmit}
        className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
      >
        <div
          className="relative flex h-full flex-1 items-stretch md:flex-col"
          role="presentation"
        >
          <div className="shadow-xs dark:shadow-xs relative flex w-full flex-grow flex-col rounded-xl border border-black/10 bg-white py-[10px] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white md:py-4 md:pl-4">
            <textarea
              ref={inputRef}
              id="prompt-textarea"
              data-id="root"
              rows={1}
              placeholder="Ask a question"
              className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-3 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0 md:pr-12"
              style={{
                maxHeight: "100px",
                height: "24px",
              }}
              onInput={autoResize}
            ></textarea>
            <button className=" enabled:bg-brand-purple absolute bottom-1.5 right-2 rounded-md p-1 text-blue-600 transition-colors focus-visible:outline-blue-600 disabled:text-gray-400 disabled:opacity-40 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent md:bottom-3 md:right-3 md:p-2">
              <span data-state="closed">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="m-1 h-4 w-4 md:m-0"
                  stroke-width="2"
                >
                  <path
                    d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
