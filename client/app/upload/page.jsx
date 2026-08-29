"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function UploadPage() {
  const [title, setTitle] = useState("");
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

  const handleOnClassChange = (e) => {
    setClassName(e.target.value);
  };

  const handleOnSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleOnExamNameChange = (e) => {
    const ans = e.target.value;
    setExamName(ans);

    if (ans !== "State Boards") {
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
    <div className="h-[85vh] flex items-center justify-center md:px-10 lg:px-15 lg:py-5">
      <div className="w-full p-5 md:p-7 lg:p-8">
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-3xl md:text-4xl lg:text-8xl">
              Upload it!!!!!!!!
            </h1>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-2 gap-x-10 gap-y-3">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-xl md:text-2xl lg:text-3xl"
                >
                  Country
                </label>
                <div className="sketchy-border pr-3">
                  <select
                    value={country}
                    onChange={handleOnCountryChange}
                    className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer py-2 lg:px-3 lg:py-3 focus:outline-none"
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="China">China</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              {country === "India" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Title
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={handleOnTitleChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Exam
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={examName}
                        onChange={handleOnExamNameChange}
                        className="text-lg w-full md:text-xl lg:text-2xl cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                        required
                      >
                        <option value="">Select Exam</option>
                        <option value="CBSE Boards">CBSE Boards</option>
                        <option value="ICSE Boards">ICSE Boards</option>
                        <option value="State Boards">State Boards</option>
                        <option value="JEE Main">JEE Main</option>
                        <option value="JEE Advanced">JEE Advanced</option>
                        <option value="NEET-UG">NEET-UG</option>
                      </select>
                    </div>
                  </div>

                  {examName === "State Boards" && (
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="text-xl md:text-2xl lg:text-3xl"
                        >
                          State
                        </label>
                        <div className="sketchy-border pr-3">
                          <select
                            value={state}
                            onChange={handleOnStateChange}
                            className="text-lg md:text-xl lg:text-2xl  w-full cursor-pointer  px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                            required
                          >
                            <option value="">Select State</option>
                            <option value="Arunachal Pradesh">
                              Arunachal Pradesh
                            </option>
                            <option value="Arunachal Pradesh">
                              Arunachal Pradesh
                            </option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">
                              Himachal Pradesh
                            </option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Keralam">Keralam</option>
                            <option value="Madhya Pradesh">
                              Madhya Pradesh
                            </option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Class
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={className}
                        onChange={handleOnClassChange}
                        required
                        className="text-lg w-full md:text-xl lg:text-2xl  cursor-pointer  px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                      >
                        <option value="">Select Class</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Subject
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={subject}
                        onChange={handleOnSubjectChange}
                        className="text-lg md:text-xl lg:text-2xl  w-full cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none "
                        required
                      >
                        <option value="">Select Subject</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Biology">Biology</option>
                        <option value="Maths">Maths</option>
                        <option value="English">English</option>
                        <option value="Social Science">Social Science</option>
                        <option value="Computer Science">
                          Computer Science
                        </option>
                        <option value="Hindi">Hindi</option>
                        <option value="Physical Education">
                          Physical Education
                        </option>
                        <option value="Psychology">Psychology</option>
                        <option value="Artificial Intelligence">
                          Artificial Intelligence
                        </option>
                        <option value="Information Practices">
                          Information Practices
                        </option>
                        <option value="Information Technology">
                          Information Technology
                        </option>
                        <option value="Legal Studies">Legal Studies</option>
                        <option value="Economics">Economics</option>
                        <option value="Accountancy">Accountancy</option>
                        <option value="Business Studies">
                          Business Studies
                        </option>
                        <option value="Applied Maths">Applied Maths</option>
                        <option value="Entrepreneurship">
                          Entrepreneurship
                        </option>
                        <option value="Fine Arts">Fine Arts</option>
                        <option value="Biotechnology">Biotechnology</option>
                        <option value="Home Science">Home Science</option>
                        <option value="Fashion Designing">
                          Fashion Designing (ICSE)
                        </option>
                        <option value="Fashion Studies">
                          Fashion Studies (CBSE)
                        </option>
                        <option value="Commercial Applications">
                          Commercial Applications
                        </option>
                        <option value="Economic Applications">
                          Economic Applications
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Year
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        type="number"
                        placeholder="Enter Year"
                        value={year}
                        min={2000}
                        max={new Date().getFullYear()}
                        step={1}
                        onChange={handleOnYearChange}
                        className="text-lg w-full md:text-xl lg:text-2xl cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {country === "USA" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      value={title}
                      onChange={handleOnTitleChange}
                      className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Exam
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={examName}
                        onChange={handleOnExamNameChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                        required
                      >
                        <option value="">Select Exam</option>
                        <option value="SAT">SAT</option>
                        <option value="ACT">ACT</option>
                        <option value="AP">AP</option>
                        <option value="State Standardized Tests">
                          State Standardized Tests
                        </option>
                      </select>
                    </div>
                  </div>

                  {examName === "State Standardized Tests" && (
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="text-xl md:text-2xl lg:text-3xl"
                        >
                          State
                        </label>
                        <div className="sketchy-border pr-3">
                          <select
                            value={state}
                            onChange={handleOnStateChange}
                            className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer  px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                            required
                          >
                            <option value="">Select State</option>
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="Assam">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
                            <option value="Maryland">Maryland</option>
                            <option value="Massachusetts">Massachusetts</option>
                            <option value="Michigan">Michigan</option>
                            <option value="Minnesota">Minnesota</option>
                            <option value="Mississippi">Mississippi</option>
                            <option value="Missouri">Missouri</option>
                            <option value="Montana">Montana</option>
                            <option value="Nebraska">Nebraska</option>
                            <option value="Nevada">Nevada</option>
                            <option value="New Hampshire">New Hampshire</option>
                            <option value="New Jersey">New Jersey</option>
                            <option value="New Mexico">New Mexico</option>
                            <option value="New York">New York</option>
                            <option value="North Carolina">
                              North Carolina
                            </option>
                            <option value="North Dakota">North Dakota</option>
                            <option value="Ohio">Ohio</option>
                            <option value="Oklahoma">Oklahoma</option>
                            <option value="Oregon">Oregon</option>
                            <option value="Pennsylvania">Pennsylvania</option>
                            <option value="Rhode Island">Rhode Island</option>
                            <option value="South Carolina">
                              South Carolina
                            </option>
                            <option value="South Dakota">South Dakota</option>
                            <option value="Tennessee">Tennessee</option>
                            <option value="Texas">Texas</option>
                            <option value="Utah">Utah</option>
                            <option value="Vermont">Vermont</option>
                            <option value="Viginia">Viginia</option>
                            <option value="Washington">Washington</option>
                            <option value="West Virginia">West Virginia</option>
                            <option value="Wisconin">Wisconin</option>
                            <option value="Wyoming">Wyoming</option>
                            <option value="Andhra Pradesh">Alabama</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Class
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={className}
                        onChange={handleOnClassChange}
                        required
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer  px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                      >
                        <option value="">Select Class</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Subject
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={subject}
                        onChange={handleOnSubjectChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none "
                        required
                      >
                        <option value="">Select Subject</option>
                        <option value="Math">Math</option>
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Physics">Physics</option>
                        <option value="English Literature">
                          English Literature
                        </option>
                        <option value="US History">US History</option>
                        <option value="World History">World History</option>
                        <option value="Computer Science">
                          Computer Science
                        </option>
                        <option value="Economics">Economics</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Statistics">Statistics</option>
                        <option value="Information Practices">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Year
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        type="number"
                        placeholder="Enter Year"
                        value={year}
                        min={2000}
                        max={new Date().getFullYear()}
                        step={1}
                        onChange={handleOnYearChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {country === "United Kingdom" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Title
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={handleOnTitleChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Exam
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={examName}
                        onChange={handleOnExamNameChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                        required
                      >
                        <option value="">Select Exam</option>
                        <option value="GCSE">GCSE</option>
                        <option value="A-Levels">A-Levels</option>
                        <option value="BTEC">BTEC</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Class
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={className}
                        onChange={handleOnClassChange}
                        required
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer  px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                      >
                        <option value="">Select Class</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                        <option value="13">Class 13 (A-Levels)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Subject
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={subject}
                        onChange={handleOnSubjectChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none "
                        required
                      >
                        <option value="">Select Subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Physics">Physics</option>
                        <option value="English Language">
                          English Language
                        </option>
                        <option value="History">History</option>
                        <option value="Computer Science">
                          Computer Science
                        </option>
                        <option value="Geography">Geography</option>
                        <option value="Economics">Economics</option>
                        <option value="Business Studies">
                          Business Studies
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Year
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        type="number"
                        placeholder="Enter Year"
                        value={year}
                        min={2000}
                        max={new Date().getFullYear()}
                        step={1}
                        onChange={handleOnYearChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {country === "China" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Title
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={handleOnTitleChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Exam
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={examName}
                        onChange={handleOnExamNameChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                        required
                      >
                        <option value="">Select Exam</option>
                        <option value="Gaokao">Gaokao</option>
                        <option value="Zhongkao">Zhongkao</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Class
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={className}
                        onChange={handleOnClassChange}
                        required
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer  px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                      >
                        <option value="">Select Class</option>
                        <option value="12">Class 12</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Subject
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={subject}
                        onChange={handleOnSubjectChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none "
                        required
                      >
                        <option value="">Select Subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Physics">Physics</option>
                        <option value="English">English</option>
                        <option value="Modern History">Modern History</option>
                        <option value="Legal Studies">Legal Studies</option>
                        <option value="Economics">Economics</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Year
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        type="number"
                        placeholder="Enter Year"
                        value={year}
                        min={2000}
                        max={new Date().getFullYear()}
                        step={1}
                        onChange={handleOnYearChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {country === "Australia" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Title
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={handleOnTitleChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Exam
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={examName}
                        onChange={handleOnExamNameChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                        required
                      >
                        <option value="">Select Exam</option>
                        <option value="HSC (New South Wales)">
                          HSC (New South Wales)
                        </option>
                        <option value="VCE (Victoria)">VCE (Victoria)</option>
                        <option value="QCE (Queensland)">
                          QCE (Queensland)
                        </option>
                        <option value="WACE (Western Australia)">
                          WACE (Western Australia)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Class
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={className}
                        onChange={handleOnClassChange}
                        required
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer  px-1 py-2 lg:px-3 lg:py-3 focus:outline-none"
                      >
                        <option value="">Select Class</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Subject
                    </label>
                    <div className="sketchy-border pr-3">
                      <select
                        value={subject}
                        onChange={handleOnSubjectChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none "
                        required
                      >
                        <option value="">Select Subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Biology">Biology</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Physics">Physics</option>
                        <option value="English">English</option>
                        <option value="History">History</option>
                        <option value="Geography">Geography</option>
                        <option value="Economics">Economics</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xl md:text-2xl lg:text-3xl"
                    >
                      Year
                    </label>
                    <div className="sketchy-border pr-3">
                      <input
                        type="number"
                        placeholder="Enter Year"
                        value={year}
                        min={2000}
                        max={new Date().getFullYear()}
                        step={1}
                        onChange={handleOnYearChange}
                        className="text-lg md:text-xl lg:text-2xl w-full cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xl md:text-2xl lg:text-3xl">
                File
              </label>

              <div
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col py-5 items-center justify-center gap-2 border-2 border-dashed rounded-sm cursor-pointer transition-all ${isDragging ? "border-black bg-gray-100" : "border-black"}`}
              >
                {file ? (
                  <p className="text-lg md:text-xl lg:text-2xl">{file.name}</p>
                ) : (
                  <>
                    <p className="text-lg md:text-xl lg:text-2xl">
                      Drag and drop here or click to select file
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl">
                      Max file size - 65MB
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
              className="text-lg md:text-xl lg:text-2xl sketchy-border w-fit mx-auto bg-[#9EDC7A] hover:bg-[#70c042] active:scale-95 transition-all mt-2 text-black px-3 py-2 rounded-sm cursor-pointer"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
