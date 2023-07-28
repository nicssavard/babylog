import Head from "next/head";
import Link from "next/link";

import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { SelectField, TextField } from "@/components/Fields";
import { Logo } from "@/components/Logo";
import { useRef } from "react";
import { FormEvent } from "react";
import { api } from "~/utils/api";

interface Props {
  toggleLogin: () => void;
}
export default function SignUp({ toggleLogin }: Props) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const newUser = api.user.addUser.useMutation();

  const addUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !firstNameRef.current?.value ||
      !lastNameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value
    ) {
      return;
    }

    newUser.mutate({
      firstName: firstNameRef.current?.value,
      lastName: lastNameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    });
  };
  return (
    <>
      <Head>
        <title>Sign Up - Babylog</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            {/* <Logo className="h-10 w-auto" /> */}
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered?{" "}
              <span
                className="cursor-pointer font-medium text-blue-600 hover:underline"
                onClick={() => toggleLogin()}
              >
                Log in
              </span>{" "}
              to your account.
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => addUser(e)}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor="first_name"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <input
              ref={firstNameRef}
              id="first_name"
              type="text"
              name="first_name"
              autoComplete="given-name"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="last name"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <input
              ref={lastNameRef}
              id="last_name"
              type="text"
              name="last_name"
              autoComplete="family-name"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="email"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="password"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              required
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
