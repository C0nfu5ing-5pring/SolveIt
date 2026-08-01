const Sidebar = () => {
  return (
    <div className="h-[85vh] border-3 rounded-md p-5 w-[15%]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl">FILTERS</h1>

          <hr className="border border-dashed w-full" />

          <div>
            <label htmlFor="class" className="text-lg">
              Class
            </label>
            <select
              name="class"
              id="class"
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-base"
            >
              <option value="">All Classes</option>
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="text-xl">
              Subject
            </label>
            <select
              name="subject"
              id="subject"
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-base"
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
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-base"
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
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-base"
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
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-base"
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
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-base"
            >
              <option value="" className="text-lg">
                All States
              </option>
              X
            </select>
          </div>
        </div>

        <hr className="border border-dashed w-full" />
      </div>
    </div>
  );
};

export default Sidebar;
