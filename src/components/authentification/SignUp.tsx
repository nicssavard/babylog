import Head from "next/head";
import Link from "next/link";

import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { Logo } from "../Logo";
import { api } from "~/utils/api";
import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "../FormInput";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "../loading";

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Props {
  toLogin: () => void;
}
export default function SignUp({ toLogin }: Props) {
  const { mutate: newUser, isLoading } = api.user.addUser.useMutation({
    onSuccess: () => {
      toLogin();
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      toast.error("An error occurred during sign up: " + error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => addUser(data);

  const addUser = (data: FormInputs) => {
    newUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
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
            <Logo textSize="text-6xl" logoSize={85} />
          </Link>

          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered?{" "}
              <span
                className="cursor-pointer font-medium text-blue-600 hover:underline"
                onClick={() => toLogin()}
              >
                Log in
              </span>{" "}
              to your account.
            </p>
          </div>
        </div>
        <form
          /* eslint-disable */ /* Error: Promise-returning function provided to attribute where a void return was expected.  @typescript-eslint/no-misused-promises */
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
        >
          <div>
            <FormInput
              label="First name"
              register={register("firstName")}
              type="text"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <FormInput
              label="Last name"
              register={register("lastName")}
              type="text"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="col-span-full">
            <FormInput
              label="Email address"
              register={register("email", { required: true })}
              type="email"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="col-span-full">
            <FormInput
              label="Password"
              register={register("password", { required: true })}
              type="password"
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              minLength={3}
            />
          </div>

          <div className="col-span-full  flex flex-row justify-center">
            {!isLoading ? (
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
            ) : (
              <LoadingSpinner size={30} />
            )}
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
