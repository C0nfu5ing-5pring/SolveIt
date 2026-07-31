export default function Home() {
  return (
    <div className="p-5">
      <div className="border-black border-3 h-15 flex items-center">
        <input
          type="text"
          className="w-[90%] h-10 focus:outline-none px-3 text-2xl"
          placeholder="Enter something..."
        />
        <button className="mx-auto bg-black cursor-pointer text-white h-10 px-5 rounded-sm active:scale-90 transition-all">
          Search
        </button>
      </div>
    </div>
  );
}
