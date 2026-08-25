"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Email or password is invalid");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(`Welcome again ${data.user.name}`);

      router.push("/browse");
    } catch (err) {
      toast.error("Could not connect to sever");
      setError("Could not connect to server :(");
      setLoading(false);
    }
  };

  const handleOnEmailChange = (e) => setEmail(e.target.value);
  const handleOnPasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <h1 className="text-left text-3xl md:text-4xl lg:text-8xl">
              Welcome Back!!!!
            </h1>
            {error && (
              <p className="text-red-500 text-base text-center capitalize">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-xl md:text-2xl lg:text-3xl"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleOnEmailChange}
                  required
                  className="text-lg md:text-xl lg:text-2xl border border-gray-500 cursor-pointer px-3 py-2 focus:outline-none focus:border-[1.5] focus:border-black rounded "
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-xl md:text-2xl lg:text-3xl"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleOnPasswordChange}
                  className="text-lg md:text-xl lg:text-2xl border border-gray-500 cursor-pointer px-3 py-2 focus:outline-none focus:border-[1.5] focus:border-black rounded "
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="text-lg md:text-xl lg:text-2xl w-[50%] mx-auto bg-black active:scale-95 transition-all mt-2 text-white px-3 py-2 rounded-sm cursor-pointer"
              >
                {loading ? "Logging in" : "Log in"}
              </button>

              <div className="flex items-center gap-2">
                <hr className="border border-dashed w-full" />
                <p>or</p>
                <hr className="border border-dashed w-full" />
              </div>
            </div>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-center mt-2">
            Don't have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
