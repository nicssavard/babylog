import { signIn } from "next-auth/react";
import { useRef } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
  //ref for username and password input
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();

  const signinHandler = async (e: any) => {
    e.preventDefault();
    const test = await signIn("credentials", {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      //redirect to home page after successfull login
      redirect: false,
    });
    if (test?.error) {
      setIsInvalid(true);
    } else {
      //router.push("/");
    }
  };

  return (
    <div className="font-face-gm flex min-h-screen flex-col items-center justify-center bg-palette-500 text-center">
      {/* add a logo */}
      <div className="relative h-32 w-32 sm:h-40 sm:w-40 1080:h-64 1080:w-64">
        <Image src="/wflk.png" alt="Logo" fill={true} />
      </div>
      <div className="my-10 flex w-4/6 flex-col rounded-2xl bg-palette-600 text-center sm:w-1/4 1080:w-1/6">
        {/* username and password input */}
        <div className="p-3">
          <h1 className="text-xl font-bold text-gray-700">
            Welcome to my classroom!
          </h1>
          <form
            onSubmit={signinHandler}
            className="flex flex-col space-y-4 pt-3 text-gray-600"
          >
            {isInvalid && (
              <div className="text-red-600">Invalid username or password</div>
            )}
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              aria-label="Username"
              className="rounded-lg bg-palette-200 p-3"
              type="text"
              placeholder="username"
              ref={usernameRef}
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              autoComplete="new-password"
              id="password"
              aria-label="Password"
              className="rounded-lg bg-palette-200 p-3"
              type="password"
              placeholder="password"
              ref={passwordRef}
            />
            {/* submit button */}
            <button
              type="submit"
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-gray-700 no-underline transition hover:bg-white/20"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
