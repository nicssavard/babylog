import { Fragment } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { Button } from "~/components/display/Button";
import { Container } from "~/components/display/Container";
import { Logo } from "~/components/display/Logo";
import { NavLink } from "~/components/header/NavLink";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";

type MobileNavLinkProps = {
  href: string;
  children: React.ReactNode;
};

function MobileNavLink({ href, children }: MobileNavLinkProps) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  );
}

type MobileNavIconProps = {
  open: boolean;
};

function MobileNavIcon({ open }: MobileNavIconProps) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          "origin-center transition",
          open && "scale-90 opacity-0"
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          "origin-center transition",
          !open && "scale-90 opacity-0"
        )}
      />
    </svg>
  );
}

function MobileNavigation() {
  const { data: sessionData } = useSession();
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full z-50 mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            <MobileNavLink href="/#features">Features</MobileNavLink>
            <MobileNavLink href="/#testimonials">Testimonials</MobileNavLink>
            <MobileNavLink href="/#pricing">Pricing</MobileNavLink>
            <MobileNavLink href="/chat">Chat</MobileNavLink>
            {sessionData && (
              <>
                <hr className="m-2 border-slate-300/40" />
                <MobileNavLink href="">
                  <div
                    onClick={
                      sessionData ? () => void signOut() : () => void signIn()
                    }
                  >
                    {sessionData ? "Sign out" : "Sign in"}
                  </div>
                </MobileNavLink>
              </>
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

export function Header() {
  const { data: sessionData } = useSession();
  const { data: user } = api.user.getUserByEmail.useQuery({
    email: sessionData?.user?.email ? sessionData.user.email : "placeholder",
  });

  const setUser = useStore((state) => state.setUser);
  if (user) {
    setUser(user);
  }

  return (
    <header className="border-b-2 bg-white py-2 shadow-sm">
      <Container>
        <nav className="relative flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo textSize="text-2xl" logoSize={40} />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/#features">Features</NavLink>
              <NavLink href="/#testimonials">Testimonials</NavLink>
              <NavLink href="/#pricing">Pricing</NavLink>
              <NavLink href="/chat">Chat</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              {/* <NavLink href="/login">Sign in</NavLink> */}
              {sessionData && (
                <button
                  className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  onClick={() => void signOut()}
                >
                  Sign out
                </button>
              )}
            </div>
            {sessionData ? (
              <Button color="blue" href="/family">
                My Family
              </Button>
            ) : (
              <Button color="blue" onClick={() => void signIn()}>
                Sign in
              </Button>
            )}

            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
