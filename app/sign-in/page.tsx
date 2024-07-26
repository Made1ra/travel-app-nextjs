"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "@/app/lib/actions";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const router = useRouter();

  const notifyError = (error: string) => {
    toast.error(error, { containerId: "sign-in-notification" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    try {
      const { token, error, message } = await signIn(email, password);
      if (error) {
        throw new Error(message);
      }

      if (typeof window !== "undefined") {
        if (token) {
          localStorage.setItem("token", token);
          router.push("/");
        }
      }
    } catch (error) {
      notifyError(`${error}`);
    }
  };

  return (
    <div className="flex flex-col grow min-h-screen">
      <Header />
      <main className="sign-in-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form
          className="sign-in-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="sign-in-form__title">Sign In</h2>
          <label className="input">
            <span className="input__heading">Email</span>
            <input
              data-test-id="auth-email"
              name="email"
              type="email"
              required
            />
          </label>
          <label className="input">
            <span className="input__heading">Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={3}
              maxLength={20}
            />
          </label>
          <button data-test-id="auth-submit" className="button" type="submit">
            Sign In
          </button>
        </form>
        <span className="flex gap-x-1">
          Don&apos;t have an account?
          <Link
            data-test-id="auth-sign-up-link"
            href="/sign-up"
            className="sign-in-form__link"
          >
            Sign Up
          </Link>
        </span>
      </main>
      <Footer />
      <ToastContainer
        className="notification"
        containerId="sign-in-notification"
      />
    </div>
  );
}
