"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bugType, setBugType] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reports`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            bugType,
            description,
          }),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        console.error("Backend error:", error);
        throw new Error(error.message || "Failed to submit bug report");
      }

      toast(<CustomToast msg="Bug reported! :)" />);

      setName("");
      setEmail("");
      setBugType("");
      setDescription("");
    } catch (err) {
      console.error("Failed to submit the bug :(", err);
      toast(<CustomToast msg="Something went wrong :(" />);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[75vh] py-10">
      <div className="w-full max-w-3xl px-5">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl lg:text-8xl">
            Report a bug (please)
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-xl md:text-2xl lg:text-3xl">
                Name
              </label>

              <div className="sketchy-border">
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  type="email"
                  id="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-lg md:text-xl lg:text-2xl w-full px-3 py-2 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="bugType"
              className="text-xl md:text-2xl lg:text-3xl"
            >
              What's wrong?
            </label>

            <div className="sketchy-border">
              <select
                id="bugType"
                value={bugType}
                onChange={(e) => setBugType(e.target.value)}
                required
                className="text-lg md:text-xl lg:text-2xl w-full px-3 py-2 border-none outline-none bg-transparent cursor-pointer"
              >
                <option value="" disabled>
                  Select a problem
                </option>
                <option value="broken">Something is broken</option>
                <option value="ui">UI looks weird</option>
                <option value="login">Login / Signup problem</option>
                <option value="upload">Upload problem</option>
                <option value="download">Download problem</option>
                <option value="paper">Problem with a paper</option>
                <option value="other">Something else</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-xl md:text-2xl lg:text-3xl"
            >
              Describe it!
            </label>

            <div className="sketchy-border">
              <textarea
                id="description"
                placeholder="blah blah blah blah"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
                className="text-lg md:text-xl lg:text-2xl w-full px-3 py-2 border-none outline-none bg-transparent resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="text-lg md:text-xl lg:text-2xl sketchy-border w-fit mx-auto bg-[#F05A5A] hover:bg-[#e94b4b] px-6 py-2 rounded-xl cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Reporting..." : "Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
