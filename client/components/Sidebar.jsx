const Sidebar = ({
  papers,
  classFilter,
  subjectFilter,
  examFilter,
  yearFilter,
  countryFilter,
  stateFilter,
  setClassFilter,
  setSubjectFilter,
  setExamFilter,
  setYearFilter,
  setCountryFilter,
  setStateFilter,
}) => {
  const uniqueClasses = [
    ...new Set((papers || []).map((paper) => paper.class).filter(Boolean)),
  ].sort();

  const uniqueSubjects = [
    ...new Set((papers || []).map((paper) => paper.subject).filter(Boolean)),
  ].sort();

  const uniqueExams = [
    ...new Set((papers || []).map((paper) => paper.exam_name).filter(Boolean)),
  ].sort();

  const uniqueYears = [
    ...new Set((papers || []).map((paper) => paper.year).filter(Boolean)),
  ].sort();

  const uniqueCountries = [
    ...new Set((papers || []).map((paper) => paper.country).filter(Boolean)),
  ].sort();

  const uniqueStates = [
    ...new Set((papers || []).map((paper) => paper.state).filter(Boolean)),
  ].sort();

  return (
    <div className="h-[85vh] border-3 rounded-md p-5 w-[90%]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl">FILTERS</h1>

          <hr className="border border-dashed w-full" />

          <div>
            <label htmlFor="class" className="text-3xl">
              Class
            </label>
            <select
              name="class"
              id="class"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-xl"
            >
              <option value="">All Classes</option>
              {uniqueClasses.map((ans) => (
                <option key={ans} value={ans}>
                  {ans}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="text-3xl">
              Subject
            </label>
            <select
              name="subject"
              id="subject"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-xl"
            >
              <option value="">All Subjects</option>
              {uniqueSubjects.map((ans) => (
                <option key={ans} value={ans}>
                  {ans}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="exam" className="text-3xl">
              Exam
            </label>
            &nbsp; &nbsp;
            <select
              name="exam"
              id="exam"
              value={examFilter}
              onChange={(e) => {
                setExamFilter(e.target.value);
              }}
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-xl"
            >
              <option value="">All Exams</option>
              {uniqueExams.map((ans) => (
                <option key={ans} value={ans}>
                  {ans}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="year" className="text-3xl">
              Year
            </label>
            &nbsp; &nbsp;
            <select
              name="year"
              id="year"
              value={yearFilter}
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-xl"
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="">All Years</option>
              {uniqueYears.map((ans) => (
                <option key={ans} value={ans}>
                  {ans}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="country" className="text-3xl">
              Country
            </label>
            <select
              name="country"
              id="country"
              value={countryFilter}
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-xl "
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              <option value="">All Countries</option>
              {uniqueCountries.map((ans) => (
                <option key={ans} value={ans}>
                  {ans}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="state" className="text-3xl">
              State
            </label>
            <select
              name="state"
              id="state"
              className="w-full px-1 py-1 focus:outline-none border-2 rounded-sm text-xl"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="" className="text-xl">
                All States
              </option>
              {uniqueStates.map((ans) => {
                <option key={ans} value={ans}>
                  {ans}
                </option>;
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
