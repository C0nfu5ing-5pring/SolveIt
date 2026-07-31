"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
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
    <div className="min-h-[85vh] flex items-center justify-center px-15 py-5">
      <div className="w-full max-w-md border-3 py-10 px-5 bg-white rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <h1 className="text-center text-5xl">Create Account</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-xl">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={handleOnNameChange}
                  required
                  className="text-lg border cursor-pointer px-3 bg-white py-2 focus:outline-none focus:border-2 rounded-sm "
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="name" className="text-xl">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleOnEmailChange}
                  required
                  className="text-lg border cursor-pointer px-3 bg-white py-2 focus:outline-none focus:border-2 rounded-sm "
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="name" className="text-xl">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handleOnPasswordChange}
                  required
                  className="text-lg border cursor-pointer px-3 bg-white py-2 focus:outline-none focus:border-2 rounded-sm "
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="text-xl bg-black active:scale-95 transition-all mt-2 text-white px-3 py-2 rounded-sm cursor-pointer"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </div>
          </div>

          <p className="text-base text-center mt-2">
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
