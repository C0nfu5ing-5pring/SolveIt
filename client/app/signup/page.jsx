"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        },
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Something went wrong");
        toast.error("Something went wrong, couldn't load data");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/browse");
    } catch (err) {
      toast.error("Could not connect to server :(");
      setError("Could not connect to server :(");
      setLoading(false);
    }
  };

  const handleOnNameChange = (e) => setName(e.target.value);
  const handleOnEmailChange = (e) => setEmail(e.target.value);
  const handleOnPasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[90vh] py-10">
      <div className="w-full max-w-3xl px-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-center text-5xl md:text-6xl lg:text-8xl leading-15">
            Create your account
          </h1>

          {error && (
            <p className="text-[#F05A5A] text-xl md:text-2xl text-center">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-xl md:text-2xl lg:text-3xl">
                Name
              </label>

              <div className="sketchy-border">
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleOnNameChange}
                  required
                  className="text-lg md:text-xl lg:text-2xl w-full px-3 py-2 border-none outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-xl md:text-2xl lg:text-3xl"
              >
                Email
              </label>

              <div className="sketchy-border">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleOnEmailChange}
                  required
                  className="text-lg md:text-xl lg:text-2xl w-full px-3 py-2 border-none outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-xl md:text-2xl lg:text-3xl"
              >
                Password
              </label>

              <div className="sketchy-border">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleOnPasswordChange}
                  required
                  className="text-lg md:text-xl lg:text-2xl w-full px-3 py-2 border-none outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="text-lg md:text-xl lg:text-2xl sketchy-border w-fit mx-auto bg-[#9EDC7A] hover:bg-[#70c042] active:scale-95 transition-all mt-2 px-6 py-2 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <hr className="border border-dashed w-full" />
            <p className="text-lg md:text-xl lg:text-2xl">or</p>
            <hr className="border border-dashed w-full" />
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
