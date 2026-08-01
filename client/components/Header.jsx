import Link from "next/link";

const Header = () => {
  return (
    <div className="border-3 border-solid border-black py-3 px-5 flex justify-between rounded-md">
      <div className="flex items-center">
        <h1 className="text-3xl">Solve It</h1>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-lg cursor-pointer transition-all hover:underline hover:underline-offset-8">
          <Link href="/browse">Browse</Link>
        </p>

        <p className="text-lg cursor-pointer transition-all hover:underline hover:underline-offset-8">
          <Link href="/upload">Upload</Link>
        </p>

        <p className="text-lg cursor-pointer transition-all hover:underline hover:underline-offset-8">
          <Link href="/contact">Contact</Link>
        </p>

        <Link
          href="/login"
          className="text-lg cursor-pointer transition-all border-[1.5] rounded-md px-2 py-1 hover:bg-black hover:text-white active:scale-90 "
        >
          <p>Log in</p>
        </Link>

        <Link
          href="/signup"
          className="text-lg cursor-pointer transition-all border-[1.5] border-black rounded-md px-2 py-1 bg-black text-white active:scale-90"
        >
          <p>Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
