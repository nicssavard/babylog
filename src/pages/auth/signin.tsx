import { signIn } from "next-auth/react";
import { useRef } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Login from "~/components/authentification/Login";
import SignUp from "~/components/authentification/SignUp";
import { Button } from "~/components/Button";

export default function SignIn() {
  //ref for username and password input
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="h-screen">
      {isLogin ? (
        <Login toggleLogin={toggleLogin} />
      ) : (
        <SignUp toggleLogin={toggleLogin} />
      )}
    </div>
  );
}

// import { signIn } from "next-auth/react";
// import { use, useRef } from "react";
// import Image from "next/image";
// import { useState } from "react";
// import { useRouter } from "next/router";

// export default function SignIn() {
//   //ref for username and password input
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);
//   const [isInvalid, setIsInvalid] = useState(false);
//   const router = useRouter();

//   const signinHandler = async (e: any) => {
//     const [login, setLogin] = useState(true);
//     e.preventDefault();
//     const test = await signIn("credentials", {
//       username: usernameRef.current?.value,
//       password: passwordRef.current?.value,
//       //redirect to home page after successfull login
//       redirect: false,
//     });
//     if (test?.error) {
//       setIsInvalid(true);
//     } else {
//       //router.push("/");
//     }
//   };

//   return (
//     <div className="font-face-gm bg-palette-500 flex min-h-screen flex-col items-center justify-center text-center">
//       {/* add a logo */}
//       <div className="1080:h-64 1080:w-64 relative h-32 w-32 sm:h-40 sm:w-40">
//         <Image src="/wflk.png" alt="Logo" fill={true} />
//       </div>
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
//           <button
//             type="submit"
//             className="rounded-full bg-white/10 px-10 py-3 font-semibold text-gray-700 no-underline transition hover:bg-white/20"
//           >
//             Sign in
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
