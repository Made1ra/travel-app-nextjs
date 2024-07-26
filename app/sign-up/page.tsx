"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { signUp } from "@/app/lib/actions";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const router = useRouter();

  const notifyError = (error: string) => {
    toast.error(error, { containerId: "sign-up-notification" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fullName = (form.elements.namedItem("full-name") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    try {
      const { token } = await signUp(fullName, email, password);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      router.push("/");
    } catch (error) {
      notifyError(`${error}`);
    }
  };

  return (
    <>
      <Header />
      <main className="sign-up-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form
          className="sign-up-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="sign-up-form__title">Sign Up</h2>
          <label className="input">
            <span className="input__heading">Full name</span>
            <input
              data-test-id="auth-full-name"
              name="full-name"
              type="text"
              required
            />
          </label>
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
            Sign Up
          </button>
        </form>
        <span className="flex gap-x-1">
          Already have an account?
          <Link
            data-test-id="auth-sign-in-link"
            href="/sign-in"
            className="sign-up-form__link"
          >
            Sign In
          </Link>
        </span>
      </main>
      <Footer />
      <ToastContainer
        className="notification"
        containerId="sign-up-notification"
      />
    </>
  );
}
