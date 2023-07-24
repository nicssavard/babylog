import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRef } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { AuthLayout } from "../AuthLayout";
import { Button } from "../Button";

interface Props {
  toggleLogin: () => void;
}
export default function Login({ toggleLogin }: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  //const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });

      if (user?.error) {
        //setIsInvalid(true);
      } else {
        await router.push("/family").then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("An error occurred during sign in:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Log In - Babylog</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          {/* <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link> */}
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Log in to your account
            </h2>

            <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{" "}
              <span
                className="cursor-pointer font-medium text-blue-600 hover:underline"
                onClick={() => toggleLogin()}
              >
                Sign up
              </span>
              {" or log in as "}
              <span
                className="cursor-pointer font-medium text-blue-600 hover:underline"
                onClick={() => console.log("Guest")}
              >
                guest
              </span>
              {"."}
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void loginHandler(e); // added void here
          }}
          className="mt-10 grid grid-cols-1 gap-y-8"
        >
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
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              <span>
                Log in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
  //   return (
  //     <div className="font-face-gm bg-palette-500 flex min-h-screen flex-col items-center justify-center text-center">
  //       <div className="bg-palette-600 1080:w-1/6 my-10 flex w-4/6 flex-col rounded-2xl text-center sm:w-1/4">
  //         {/* username and password input */}
  //         <div className="p-3">
  //           <h1 className="text-xl font-bold text-gray-700">
  //             Welcome to my classroom!
  //           </h1>
  //           <form
  //             onSubmit={signinHandler}
  //             className="flex flex-col space-y-4 pt-3 text-gray-600"
  //           >
  //             {isInvalid && (
  //               <div className="text-red-600">Invalid username or password</div>
  //             )}
  //             <label htmlFor="username" className="sr-only">
  //               Username
  //             </label>
  //             <input
  //               id="username"
  //               aria-label="Username"
  //               className="bg-palette-200 rounded-lg p-3"
  //               type="text"
  //               placeholder="username"
  //               ref={usernameRef}
  //             />
  //             <label htmlFor="password" className="sr-only">
  //               Password
  //             </label>
  //             <input
  //               autoComplete="new-password"
  //               id="password"
  //               aria-label="Password"
  //               className="bg-palette-200 rounded-lg p-3"
  //               type="password"
  //               placeholder="password"
  //               ref={passwordRef}
  //             />
  //             {/* submit button */}
  //             <button
  //               type="submit"
  //               className="rounded-full bg-white/10 px-10 py-3 font-semibold text-gray-700 no-underline transition hover:bg-white/20"
  //             >
  //               Login
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
