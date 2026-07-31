const Sidebar = () => {
  return (
    <div className="h-[85vh] border-3 p-5 w-[15%]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">FILTERS</h1>
          <hr />
          <div>
            <label htmlFor="class" className="text-xl">
              Class
            </label>
            <select
              name="class"
              id="class"
              className="bg-white px-1 py-2 focus:outline-none border-2 rounded-md text-base"
            >
              <option value="" className="text-lg">
                All Classes
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="subject" className="text-xl">
              Subject
            </label>
            <select
              name="subject"
              id="subject"
              className="bg-white px-1 py-2 focus:outline-none border-2 rounded-md text-base"
            >
              <option value="" className="text-lg">
                All Subjects
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="exam" className="text-xl">
              Exam
            </label>
            &nbsp; &nbsp;
            <select
              name="exam"
              id="exam"
              className="bg-white px-1 py-2 focus:outline-none border-2 rounded-md text-base"
            >
              <option value="" className="text-lg">
                All Exams
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="year" className="text-xl">
              Year
            </label>
            &nbsp; &nbsp;
            <select
              name="year"
              id="year"
              className="bg-white px-1 py-2 focus:outline-none border-2 rounded-md text-base"
            >
              <option value="" className="text-lg">
                All Years
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="country" className="text-xl">
              Country
            </label>
            <select
              name="country"
              id="country"
              className="bg-white px-1 py-2 focus:outline-none border-2 rounded-md text-base"
            >
              <option value="" className="text-lg">
                All Countries
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="state" className="text-xl">
              State
            </label>
            <select
              name="state"
              id="state"
              className="bg-white px-1 py-2 focus:outline-none border-2 rounded-md text-base"
            >
              <option value="" className="text-lg">
                All States
              </option>
              X
            </select>
          </div>
        </div>
        <hr />
        <div>
          <h1 className="text-2xl">DOWNLOADS</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
