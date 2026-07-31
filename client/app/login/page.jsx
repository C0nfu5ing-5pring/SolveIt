"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

      router.push("/browse");
    } catch (err) {
      setError("Could not connect to server :(");
      setLoading(false);
    }
  };

  const handleOnEmailChange = (e) => setEmail(e.target.value);
  const handleOnPasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md border-3 py-10 px-5 bg-white rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <h1 className="text-center text-5xl">Log in</h1>
            {error && (
              <p className="text-red-500 text-base text-center capitalize">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-xl">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleOnEmailChange}
                  required
                  className="text-lg border cursor-pointer px-3 bg-white py-2 focus:outline-none focus:border-2 rounded-sm "
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-xl">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleOnPasswordChange}
                  className="text-lg border cursor-pointer px-3 bg-white py-2 focus:outline-none focus:border-2 rounded-sm "
                />
              </div>

              <hr className="border- border-dashed" />

              <button
                type="submit"
                disabled={loading}
                className="text-xl bg-black active:scale-95 transition-all mt-2 text-white px-3 py-2 rounded-sm cursor-pointer"
              >
                {loading ? "Logging in" : "Log in"}
              </button>
            </div>
          </div>

          <p className="text-base text-center mt-2">
            Don't have an account?{" "}
            <a href="/signup" className="underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
