"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import anybody from "../public/images/anybody.png";
import arrow from "../public/images/arrow.png";
import notes from "../public/images/notes.png";
import share from "../public/images/share.png";
import signup from "../public/images/signup.jpg";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleOnBrowseClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signup");
      return;
    }

    router.push(`/browse?search=${encodeURIComponent(search)}`);
  };

  const handleGuestLogin = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "guest@gmail.com",
            password: "guest123",
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/browse");
      }
    } catch (err) {
      console.error("Failed to login as a guest please try again", err);
    }
  };

  return (
    <div className="relative flex-1 min-h-0 overflow-hidden px-5 py-10 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">
      <img
        src={anybody.src}
        alt="Anybody can contribute"
        className="hidden md:block absolute w-32 md:w-40 lg:w-80 left-[5%] lg:left-[18%] top-[15%] lg:top-[18%] -rotate-12"
      />

      <img
        src={signup.src}
        alt="Try without signing up!"
        className="hidden md:block absolute w-28 md:w-40 lg:w-80 right-[4%] lg:right-[8%] top-[13%] lg:top-[16%] rotate-12"
      />

      <img
        src={notes.src}
        alt="Notes for JEE, NEET"
        className="hidden sm:block absolute w-28 md:w-40 lg:w-80  left-[3%] md:left-[7%] lg:left-[10%] bottom-[12%] lg:bottom-[18%] rotate-6"
      />

      <img
        src={share.src}
        alt="Share NOTES"
        className="hidden md:block absolute w-28 md:w-40 lg:w-60 right-[4%] lg:right-[9%] bottom-[12%] lg:bottom-[17%] -rotate-6"
      />

      <img
        src={arrow.src}
        alt="Arrow image"
        className="hidden lg:block absolute w-20 lg:w-24 left-[50%] bottom-[20%] rotate-12"
      />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          Solve It
        </h1>

        <p className="mt-2 max-w-[90vw] sm:max-w-xl text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
          Find and share previous year question papers
        </p>
      </div>

      <div className="relative z-10 mt-5 flex w-full max-w-sm flex-col sm:flex-row sm:max-w-none items-center justify-center gap-3">
        <button
          className="text-lg md:text-xl lg:text-2xl sketchy-border w-fit bg-black text-white px-5 sm:px-6 py-2 rounded-xl cursor-pointer"
          onClick={handleOnBrowseClick}
        >
          Browse Papers
        </button>

        <button
          onClick={handleGuestLogin}
          className="text-lg md:text-xl lg:text-2xl sketchy-border w-fit bg-black text-white px-5 sm:px-6 py-2 rounded-xl cursor-pointer"
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
}
