import { signIn } from "next-auth/react";
import Head from "next/head";
import { Logo } from "../Logo";
import { useRouter } from "next/router";
import { AuthLayout } from "../AuthLayout";
import { Button } from "../Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import FormInput from "../FormInput";
import { useState } from "react";
import { LoadingSpinner } from "../loading";
import Link from "next/link";

//Guest login credentials
const GUEST_EMAIL = "nic@nic.com";
const GUEST_PASSWORD = "nic";

interface FormInputs {
  email: string;
  password: string;
}

// change auth to signIn
interface Props {
  toSignin: () => void;
}
export default function Login({ toSignin }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => loginHandler(data);

  const loginHandler = async (data: FormInputs) => {
    setIsLoading(true);
    try {
      const user = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (user?.error) {
        toast.error("Invalid credentials!");
      } else {
        await router.push("/family").then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("An error occurred during sign in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Log In - Babylog</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo textSize="text-6xl" logoSize={85} />
          </Link>
          <div className="mt-5">
            <p className="mt-20 text-sm text-gray-700">
              Don’t have an account?{" "}
              <span
                className="cursor-pointer font-medium text-blue-600 hover:underline"
                onClick={() => toSignin()}
              >
                Sign up
              </span>
              {" or log in as "}
              <span
                className="cursor-pointer font-medium text-blue-600 hover:underline"
                /* eslint-disable */ /* Error: Promise-returning function provided to attribute where a void return was expected.  @typescript-eslint/no-misused-promises */
                onClick={
                  () =>
                    loginHandler({
                      email: GUEST_EMAIL,
                      password: GUEST_PASSWORD,
                    }) //Login as a guest
                }
              >
                guest
              </span>
              {"."}
            </p>
          </div>
        </div>

        <form
          /* eslint-disable */ /* Error: Promise-returning function provided to attribute where a void return was expected.  @typescript-eslint/no-misused-promises */
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 grid grid-cols-1 gap-y-8"
        >
          <div className="col-span-full">
            <FormInput
              label="Email address"
              register={register("email", { required: true })}
              type="email"
            />
          </div>
          <div className="col-span-full">
            <FormInput
              label="Password"
              type="password"
              register={register("password", { required: true })}
            />
          </div>
          <div className="flex flex-row justify-center">
            {!isLoading ? (
              <Button
                type="submit"
                variant="solid"
                color="blue"
                className="w-full text-3xl"
              >
                <span>
                  Log in <span aria-hidden="true">&rarr;</span>
                </span>
              </Button>
            ) : (
              <LoadingSpinner size={30} />
            )}
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
