"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="border-3 border-solid border-black py-3 px-5 rounded-md relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl lg:text-3xl">Solve It</h1>

        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <>
              <p className="text-md lg:text-lg cursor-pointer transition-all hover:underline hover:underline-offset-8">
                <Link href="/browse">Browse</Link>
              </p>

              <p className="text-md lg:text-lg cursor-pointer transition-all hover:underline hover:underline-offset-8">
                <Link href="/upload">Upload</Link>
              </p>

              <p className="text-md lg:text-lg cursor-pointer transition-all hover:underline hover:underline-offset-8">
                <Link href="/contact">Contact</Link>
              </p>

              <p className="text-lg font-bold">
                Hi,{" "}
                <span className="underline underline-offset-2">
                  {user.name}
                </span>
              </p>

              <button
                onClick={handleLogout}
                className="text-lg cursor-pointer transition-all border-[1.5] border-black rounded-md px-2 py-1 hover:bg-black hover:text-white active:scale-90"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-md lg:text-lg cursor-pointer transition-all border-[1.5] rounded-md px-2 py-1 hover:bg-black hover:text-white active:scale-90"
              >
                <p>Log in</p>
              </Link>

              <Link
                href="/signup"
                className="text-md lg:text-lg cursor-pointer transition-all border-[1.5] border-black rounded-md px-2 py-1 bg-black text-white active:scale-90"
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
            className={`block w-6 h-0.5 bg-black transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute left-0 p-6 top-full w-full grid grid-cols-2 gap-2 mt-2 pt-4 border-2 shadow-lg z-67 border-solid rounded-lg bg-[#E1D9D1]">
          {user && (
            <>
              <Link
                href="/browse"
                className="text-lg py-1"
                onClick={() => setMenuOpen(false)}
              >
                Browse
              </Link>

              <Link
                href="/upload"
                className="text-lg py-1"
                onClick={() => setMenuOpen(false)}
              >
                Upload
              </Link>
            </>
          )}
          <Link
            href="/contact"
            className="text-lg py-1"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          {user ? (
            <>
              <p className="text-lg font-bol">
                Hi,{" "}
                <span className="underline underline-offset-2">
                  {user.name}
                </span>
              </p>

              <button
                onClick={handleLogout}
                className="text-lg text-left cursor-pointer transition-all"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-lg cursor-pointer transition-all border-[1.5] rounded-md px-2 py-1 hover:bg-black hover:text-white active:scale-90 w-fit"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-lg cursor-pointer transition-all border-[1.5] border-black rounded-md px-2 py-1 bg-black text-white active:scale-90 w-fit"
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
