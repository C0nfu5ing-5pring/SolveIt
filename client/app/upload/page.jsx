"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const countries = {
  India: {
    examOptions: [
      "CBSE Boards",
      "ICSE Boards",
      "State Boards",
      "JEE Main",
      "JEE Advanced",
      "NEET-UG",
    ],
    stateTrigger: "State Boards",
    stateOptions: [
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Keralam",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
    classOptions: ["9", "10", "11", "12"],
    subjectOptions: [
      "Physics",
      "Chemistry",
      "Biology",
      "Maths",
      "English",
      "Social Science",
      "Computer Science",
      "Hindi",
      "Physical Education",
      "Psychology",
      "Artificial Intelligence",
      "Information Practices",
      "Information Technology",
      "Legal Studies",
      "Economics",
      "Accountancy",
      "Business Studies",
      "Applied Maths",
      "Entrepreneurship",
      "Fine Arts",
      "Biotechnology",
      "Home Science",
      "Fashion Designing",
      "Fashion Studies",
      "Commercial Applications",
      "Economic Applications",
    ],
  },
  USA: {
    examOptions: ["SAT", "ACT", "AP", "State Standardized Tests"],
    stateTrigger: "State Standardized Tests",
    stateOptions: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
    classOptions: ["9", "10", "11", "12"],
    subjectOptions: [
      "Math",
      "Biology",
      "Chemistry",
      "Physics",
      "English Literature",
      "US History",
      "World History",
      "Computer Science",
      "Economics",
      "Psychology",
      "Statistics",
      "Other",
    ],
  },
  "United Kingdom": {
    examOptions: ["GCSE", "A-Levels", "BTEC"],
    stateTrigger: null,
    stateOptions: [],
    classOptions: ["9", "10", "11", "12", "13"],
    subjectOptions: [
      "Mathematics",
      "Biology",
      "Chemistry",
      "Physics",
      "English Language",
      "History",
      "Computer Science",
      "Geography",
      "Economics",
      "Business Studies",
    ],
  },
  China: {
    examOptions: ["Gaokao", "Zhongkao"],
    stateTrigger: null,
    stateOptions: [],
    classOptions: ["12"],
    subjectOptions: [
      "Mathematics",
      "Biology",
      "Chemistry",
      "Physics",
      "English",
      "Modern History",
      "Legal Studies",
      "Economics",
    ],
  },
  Australia: {
    examOptions: [
      "HSC (New South Wales)",
      "VCE (Victoria)",
      "QCE (Queensland)",
      "WACE (Western Australia)",
    ],
    stateTrigger: null,
    stateOptions: [],
    classOptions: ["9", "10", "11", "12"],
    subjectOptions: [
      "Mathematics",
      "Biology",
      "Chemistry",
      "Physics",
      "English",
      "History",
      "Geography",
      "Economics",
    ],
  },
};

const types = ["Subjective", "Objective"];

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [examName, setExamName] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const config = countries[country];
  const showState = config && examName === config.stateTrigger;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("class", className);
    formData.append("subject", subject);
    formData.append("exam_name", examName);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("year", year);
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/papers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        toast.error("Failed to upload the file");
        setError(data.message || "Failed to upload the file");
        setLoading(false);
        return;
      }
      router.push("/browse");
    } catch (err) {
      toast.error("Could not connect to server :(");
      setError("Could not connect to server :(");
      setLoading(false);
    }
  };

  const handleOnTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOnDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleOnTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleOnClassChange = (e) => {
    setClassName(e.target.value);
  };

  const handleOnSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleOnExamNameChange = (e) => {
    const ans = e.target.value;
    setExamName(ans);

    if (ans !== config?.stateTrigger) {
      setState("Central");
    } else {
      setState("");
    }
  };

  const handleOnCountryChange = (e) => {
    const value = e.target.value;
    setCountry(value);
    setClassName("");
    setSubject("");
    setExamName("");
    setState("");
  };

  const handleOnStateChange = (e) => {
    setState(e.target.value);
  };

  const handleOnYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleOnFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      setError("Drop a PDF file here!");
    }
  };

  return (
    <div className="min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center px-4 py-6 md:px-8 lg:px-10">
      <div className="w-full max-w-3xl">
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-5xl md:text-6xl lg:text-8xl">
              Upload it!!!!!!!!
            </h1>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="country"
                  className="text-sm md:text-base lg:text-lg"
                >
                  Country
                </label>
                <div className="sketchy-border pr-3">
                  <select
                    id="country"
                    value={country}
                    onChange={handleOnCountryChange}
                    className="text-sm md:text-base lg:text-lg w-full cursor-pointer py-1.5 px-2 lg:py-2 focus:outline-none"
                  >
                    <option value="">Select Country</option>
                    {Object.keys(countries).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {config && (
                <>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="title"
                      className="text-sm md:text-base lg:text-lg"
                    >
                      Title
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={handleOnTitleChange}
                        className="text-sm md:text-base lg:text-lg w-full cursor-pointer px-2 py-1.5 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="exam"
                      className="text-sm md:text-base lg:text-lg"
                    >
                      Exam
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        id="exam"
                        value={examName}
                        onChange={handleOnExamNameChange}
                        className="text-sm md:text-base lg:text-lg w-full cursor-pointer px-2 py-1.5 lg:py-2 focus:outline-none"
                        required
                      >
                        <option value="">Select Exam</option>
                        {config.examOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {showState && (
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="state"
                        className="text-sm md:text-base lg:text-lg"
                      >
                        State
                      </label>
                      <div className="sketchy-border pr-3">
                        <select
                          id="state"
                          value={state}
                          onChange={handleOnStateChange}
                          className="text-sm md:text-base lg:text-lg w-full cursor-pointer px-2 py-1.5 lg:py-2 focus:outline-none"
                          required
                        >
                          <option value="">Select State</option>
                          {config.stateOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="class"
                      className="text-sm md:text-base lg:text-lg"
                    >
                      Class
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        id="class"
                        value={className}
                        onChange={handleOnClassChange}
                        required
                        className="text-sm md:text-base lg:text-lg w-full cursor-pointer px-2 py-1.5 lg:py-2 focus:outline-none"
                      >
                        <option value="">Select Class</option>
                        {config.classOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            Class {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="subject"
                      className="text-sm md:text-base lg:text-lg"
                    >
                      Subject
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        id="subject"
                        value={subject}
                        onChange={handleOnSubjectChange}
                        className="text-sm md:text-base lg:text-lg w-full cursor-pointer px-2 py-1.5 lg:py-2 focus:outline-none"
                        required
                      >
                        <option value="">Select Subject</option>
                        {config.subjectOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="type"
                      className="text-sm md:text-base lg:text-lg"
                    >
                      Type
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        id="type"
                        value={type}
                        onChange={handleOnTypeChange}
                        className="text-sm md:text-base lg:text-lg w-full cursor-pointer px-2 py-1.5 lg:py-2 focus:outline-none"
                        required
                      >
                        <option value="">Select Type</option>
                        {types.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="year"
                      className="text-sm md:text-base lg:text-lg"
                    >
                      Year
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        id="year"
                        type="number"
                        placeholder="Enter Year"
                        value={year}
                        min={2000}
                        max={new Date().getFullYear()}
                        step={1}
                        onChange={handleOnYearChange}
                        className="text-sm md:text-base lg:text-lg w-full cursor-pointer px-2 py-1.5 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {config && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="description"
                  className="text-sm md:text-base lg:text-lg"
                >
                  Description
                </label>
                <div className="sketchy-border pr-3">
                  <textarea
                    id="description"
                    placeholder="More about whatever this is!"
                    value={description}
                    onChange={handleOnDescriptionChange}
                    rows={3}
                    className="text-sm md:text-base lg:text-lg w-full cursor-pointer px-2 py-1.5 lg:py-2 focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm md:text-base lg:text-lg">
                File
              </label>

              <div
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col py-4 items-center justify-center gap-1 border-2 border-dashed rounded-sm cursor-pointer transition-all ${isDragging ? "border-black bg-gray-100" : "border-black"}`}
              >
                {file ? (
                  <p className="text-sm md:text-base lg:text-lg">{file.name}</p>
                ) : (
                  <>
                    <p className="text-sm md:text-base lg:text-lg text-center px-2">
                      Drag and drop here or click to select file
                    </p>
                    <p className="text-xs md:text-sm lg:text-base text-gray-500">
                      Max file size - 50MB
                    </p>
                  </>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="application/pdf"
                  onChange={handleOnFileChange}
                  className="hidden"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="text-sm md:text-base lg:text-lg sketchy-border w-fit mx-auto bg-[#9EDC7A] hover:bg-[#70c042] active:scale-95 transition-all mt-2 text-black px-4 py-2 rounded-sm cursor-pointer"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
