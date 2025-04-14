"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * a url to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
      },
      {
        //callbacks
      }
    );
    console.log("SignIn data:", data);
    console.log("SignIn error:", error);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  w-full justify-center items-center gap-3"
    >
      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="rounded-lg h-11 w-10/12 bg-gray-300 px-3"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      ></input>
      <label htmlFor="password">Mot de passe</label>
      <input
        id="password"
        className="rounded-lg h-11 w-10/12 px-3 bg-gray-300"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      ></input>
      <button type="submit" className="btn btn-success  mt-6">
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Se connecter"
        )}
      </button>
    </form>
  );
};
