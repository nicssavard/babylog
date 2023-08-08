import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStore from "~/store/userStore";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Night", current: false },
  { name: "Nap", current: false },
  { name: "Data", current: false },
  { name: "Graph", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const content = useStore((state) => state.content);
  const setContent = useStore((state) => state.setContent);

  const selectOption = (option: string) => {
    setContent(option);
    setSidebarOpen(false);
  };
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative  md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0  flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute right-0 top-0 z-40 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 "
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          onClick={() => selectOption(item.name)}
                          className={classNames(
                            content === item.name
                              ? "bg-blue-100 text-blue-600"
                              : " text-blue-600  ",
                            "group flex items-center rounded-md px-2 py-2 text-2xl font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="top-[58px] hidden pt-5  md:fixed md:flex md:w-48 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="bg-palette-700 flex flex-grow flex-col  overflow-y-auto rounded-br-xl">
            <div className=" flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => setContent(item.name)}
                    className={classNames(
                      content === item.name
                        ? "  text-blue-600"
                        : "text-blue-400 hover:opacity-90",
                      "group flex cursor-pointer items-center rounded-md px-2 py-2 text-2xl font-medium"
                    )}
                  >
                    {item.name}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className=" flex flex-1 flex-col md:pl-48">
          <div className=" top-14  flex h-16 flex-shrink-0 bg-transparent ">
            <button
              type="button"
              className=" px-4 text-gray-500 focus:outline-none  md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
