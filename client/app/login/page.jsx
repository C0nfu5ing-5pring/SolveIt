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
      setError("Could not connect to the server");
      setLoading(false);
    }
  };

  const handleOnEmailChange = (e) => setEmail(e.target.value);
  const handleOnPasswordChange = (e) => setPassword(e.target.value);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleOnEmailChange}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handleOnPasswordChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in" : "Log in"}
        </button>

        <p>
          Don&apos;t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}
