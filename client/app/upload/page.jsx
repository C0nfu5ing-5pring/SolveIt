"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

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
        setError(data.message || "Failed to upload the file");
        setLoading(false);
        return;
      }
      router.push("/browse");
    } catch (err) {
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
      <div className="w-full rounded-lg border-2 p-8 md:p-9 lg:p-10">
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-7 md:gap-8 lg:gap-10">
            <h1 className="text-left text-2xl md:text-3xl lg:text-4xl">
              Upload
            </h1>

            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-2 gap-x-10 gap-y-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-md md:text-lg lg:text-xl">
                  Country
                </label>

                <select
                  value={country}
                  onChange={handleOnCountryChange}
                  className="text-md md:text-lg lg:text-xl border cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none focus:border-[1.5] rounded-sm"
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                </select>
              </div>

              {country === "India" && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-md md:text-lg lg:text-xl"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      value={title}
                      onChange={handleOnTitleChange}
                      className="text-md md:text-lg lg:text-xl border cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none focus:border-[1.5] rounded-sm"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-md md:text-lg lg:text-xl"
                    >
                      Exam
                    </label>

                    <select
                      value={examName}
                      onChange={handleOnExamNameChange}
                      className="text-md md:text-lg lg:text-xl border cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none focus:border-[1.5] rounded-sm"
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

                  {examName === "State Boards" && (
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="text-md md:text-lg lg:text-xl"
                        >
                          State
                        </label>
                        <select
                          value={state}
                          onChange={handleOnStateChange}
                          className="text-md md:text-lg lg:text-xl border cursor-pointer  px-1 py-2 lg:px-3 lg:py-3 focus:outline-none focus:border-[1.5] rounded-sm"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
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
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
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
                  )}

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-md md:text-lg lg:text-xl"
                    >
                      Class
                    </label>

                    <select
                      value={className}
                      onChange={handleOnClassChange}
                      required
                      className="text-md md:text-lg lg:text-xl border cursor-pointer  px-1 py-2 lg:px-3 lg:py-3 focus:outline-none focus:border-[1.5] rounded-sm"
                    >
                      <option value="">Select Class</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-md md:text-lg lg:text-xl"
                    >
                      Subject
                    </label>

                    <select
                      value={subject}
                      onChange={handleOnSubjectChange}
                      className="text-sm md:text-md lg:text-lg border cursor-pointer px-1 py-2 lg:px-3 lg:py-3 focus:outline-none focus:border-[1.5] rounded-sm "
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Biology">Biology</option>
                      <option value="Maths">Maths</option>
                      <option value="English">English</option>
                      <option value="Social Science">Social Science</option>
                      <option value="Computer Science">Computer Science</option>
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
                      <option value="Business Studies">Business Studies</option>
                      <option value="Applied Maths">Applied Maths</option>
                      <option value="Entrepreneurship">Entrepreneurship</option>
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

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="rext-md md:text-lg lg:text-xl"
                    >
                      Year
                    </label>

                    <input
                      type="number"
                      placeholder="Enter Year"
                      value={year}
                      min={2000}
                      max={new Date().getFullYear()}
                      step={1}
                      onChange={handleOnYearChange}
                      className="text-md md:text-lg lg:text-xl border cursor-pointer px-1 py-1 lg:px-3 lg:py-2 focus:outline-none focus:border-[1.5] rounded-sm"
                      required
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-md md:text-lg lg:text-xl">
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
                  <p className="text-xs md:text-sm lg:text-base text-center">
                    {file.name}
                  </p>
                ) : (
                  <>
                    <p className="text-xs md:text-sm lg:text-base text-center">
                      Drag and drop here or click to select file
                    </p>
                    <p className="text-xs md:text-sm lg:text-base text-center">
                      Max file size - 25MB
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
              className="text-md md:text-lg lg:text-xl bg-black active:scale-95 transition-all mt-2 text-white px-3 py-2 rounded-sm cursor-pointer"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
