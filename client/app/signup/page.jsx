"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/browse");
    } catch (err) {
      setError("Could not connect to server :(");
      setLoading(false);
    }
  };

  const handleOnNameChange = (e) => setName(e.target.value);
  const handleOnEmailChange = (e) => setEmail(e.target.value);
  const handleOnPasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <h1 className="text-left text-2xl md:text-3xl lg:text-4xl">
              Sign up
            </h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-md md:text-lg lg:text-xl">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleOnNameChange}
                  required
                  className="text-xs md:text-sm lg:text-base border border-gray-500 cursor-pointer px-3 py-2 focus:outline-none focus:border-[1.5] focus:border-black rounded "
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="name" className="text-md md:text-lg lg:text-xl">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleOnEmailChange}
                  required
                  className="text-xs md:text-sm lg:text-base border border-gray-500 cursor-pointer px-3 py-2 focus:outline-none focus:border-[1.5] focus:border-black rounded "
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="name" className="text-md md:text-lg lg:text-xl">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleOnPasswordChange}
                  required
                  className="text-xs md:text-sm lg:text-base border border-gray-500 cursor-pointer px-3 py-2 focus:outline-none focus:border-[1.5] focus:border-black rounded "
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="text-md md:text-lg lg:text-xl bg-black active:scale-95 transition-all mt-2 text-white px-3 py-2 rounded-sm cursor-pointer"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <hr className="border border-dashed w-full" />
              <p>or</p>
              <hr className="border border-dashed w-full" />
            </div>
          </div>

          <p className="text-xs md:text-sm lg:text-base text-centermt-2">
            Already have an account?{" "}
            <a href="/login" className="underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
