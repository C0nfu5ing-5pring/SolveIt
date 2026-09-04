"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser ? JSON.parse(savedUser) : null);
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    toast.error("Logged out");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="sketchy-border py-3 px-5 rounded-xl relative ">
      <div className="flex items-center justify-between">
        <a href="/browse" className="text-4xl lg:text-5xl">
          Solve It
        </a>

        <div className="hidden md:flex items-center gap-5 ">
          {user ? (
            <>
              <p className="text-2xl lg:text-3xl cursor-pointer transition-all hover:underline hover:underline-offset-8">
                <Link href="/browse">Browse</Link>
              </p>

              <p className="text-2xl lg:text-3xl cursor-pointer transition-all hover:underline hover:underline-offset-8">
                <Link href="/upload">Upload</Link>
              </p>

              <p className="text-2xl lg:text-3xl cursor-pointer transition-all hover:underline hover:underline-offset-8">
                <Link href="/report">Report a bug</Link>
              </p>
              <p className="text-2xl lg:text-3xl cursor-pointer transition-all hover:underline hover:underline-offset-8">
                <Link href="/settings">Settings</Link>
              </p>

              <p className="text-2xl lg:text-3xl font-bold">
                Hi,{" "}
                <span className="underline underline-offset-2">
                  {user.name}
                </span>
              </p>

              <button
                onClick={handleLogout}
                className="text-2xl lg:text-2xl bg-[#F05A5A] hover:bg-[#ea3737] cursor-pointer sketchy-border transition-all border-[1.5] border-black rounded-xl px-2 py-1 hover:text-white active:scale-90"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-2xl lg:text-3xl hover:bg-[#9EDC7A] cursor-pointer sketchy-border transition-all rounded-xl px-2 py-1 active:scale-90"
              >
                <p>Log in</p>
              </Link>

              <Link
                href="/signup"
                className="text-2xl lg:text-3xl bg-[#171717] hover:bg-[#9EDC7A] cursor-pointer sketchy-border transition-all rounded-xl px-2 py-1 text-white hover:text-black active:scale-90"
              >
                <p>Sign up</p>
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#171717] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#171717] transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#171717] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden  sketchy-border relative p-6 w-full grid grid-cols-2 gap-2 mt-3 pt-4 rounded-xl bg-[#fffef9]">
          {user && (
            <>
              <Link
                href="/browse"
                className="text-2xl py-1"
                onClick={() => setMenuOpen(false)}
              >
                Browse
              </Link>

              <Link
                href="/upload"
                className="text-2xl py-1"
                onClick={() => setMenuOpen(false)}
              >
                Upload
              </Link>
            </>
          )}
          <Link
            href="/report"
            className="text-2xl py-1"
            onClick={() => setMenuOpen(false)}
          >
            Report a bug
          </Link>
          <Link
            href="/settings"
            className="text-2xl py-1"
            onClick={() => setMenuOpen(false)}
          >
            Settings
          </Link>
          {user ? (
            <>
              <p className="text-2xl font-bold">
                Hi,{" "}
                <span className="underline underline-offset-2">
                  {user.name}
                </span>
              </p>

              <button
                onClick={handleLogout}
                className="text-2xl text-left text-[#F05A5A] cursor-pointer transition-all"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sketchy-border cursor-pointer transition-all border-[1.5] rounded-xl px-2 py-1 hover:bg-[#171717] hover:text-[#fffef9] active:scale-90 w-fit"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-2xl sketchy-border cursor-pointer transition-all border-[1.5] border-black rounded-xl px-2 py-1 bg-[#171717] text-[#fffef9] active:scale-90 w-fit"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
