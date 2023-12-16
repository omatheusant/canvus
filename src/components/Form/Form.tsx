import {  useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/shared/LoadingDots";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from 'next/router';

export const Form = ({ type }: { type: "login" | "register" }) => {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ error }) => {
            if (!error) {
              router.push('/')
            } else {
              setLoading(false)
              toast.error(error)
            }
          })
        }
      }}
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
          name="username"
          type="username"
          placeholder="Digite seu usuário..."
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
          name="password"
          type="password"
          placeholder="Digite sua senha..."
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