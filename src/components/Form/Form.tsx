import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form"
import LoadingDots from "@/components/shared/LoadingDots";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from 'next/router';

type FormInput = {
  username: string,
  password: string
}

export const Form = ({ type }: { type: "login" | "register" }) => {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true)
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    })
    console.debug(res)
    if(res?.error) {
      setLoading(false)
      toast.error(res.error)
    };
    if(res?.url) router.push('/')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <Toaster />
      <div>
        <label
          htmlFor="username"
          className="block text-xs text-[--dark] uppercase"
        >
          Nome de Usuário
        </label>
        <input
          id="username"
          type="username"
          placeholder="Digite seu usuário..."
          {...register("username", {required: true})}
          autoComplete="username"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-[--dark] uppercase"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha..."
          {...register("password", { required: true })}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button
        disabled={loading}
        className={`${loading
          ? "cursor-not-allowed border-gray-200 bg-gray-100"
          : "border-black bg-black text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Entrar" : "Sign Up"}</p>
        )}
      </button>
      {type === "login" ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-gray-800">
            Sign up
          </Link>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>{" "}
          instead.
        </p>
      )}

    </form>
  );
}