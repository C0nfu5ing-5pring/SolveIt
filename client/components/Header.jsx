const Header = () => {
  return (
    <div className="bg-white border-3 border-solid border-black py-6 px-10 flex justify-between">
      <div className="flex items-center">
        <h1 className="text-4xl">Solve It</h1>
      </div>
      <div className="flex items-center gap-10">
        <p className="text-xl cursor-pointer transition-all hover:underline hover:underline-offset-8">
          <a href="/">Browse</a>
        </p>
        <p className="text-xl cursor-pointer transition-all hover:underline hover:underline-offset-8">
          <a href="/upload">Upload</a>
        </p>
        <p className="text-xl cursor-pointer transition-all hover:underline hover:underline-offset-8">
          <a href="/contact">Contact</a>
        </p>
        <p className="text-xl cursor-pointer transition-all border-[1.5] rounded-sm px-2 py-2 hover:bg-black hover:text-white active:scale-90 ">
          <a href="/login">Log in</a>
        </p>
        <p className="text-xl cursor-pointer transition-all border-[1.5] rounded-sm px-2 py-2 bg-black text-white active:scale-90">
          <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Header;
