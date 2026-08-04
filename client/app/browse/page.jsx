"use client";
import Sidebar from "../../components/Sidebar.jsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";

export default function BrowsePage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [examFilter, setExamFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  const filteredPapersss = papers.filter((paper) => {
    if (classFilter && paper.class !== classFilter) {
      return false;
    }

    if (subjectFilter && paper.subject !== subjectFilter) {
      return false;
    }

    if (examFilter && paper.exam_name !== examFilter) {
      return false;
    }

    if (yearFilter && String(paper.year) !== yearFilter) {
      return false;
    }

    if (countryFilter && paper.country !== countryFilter) {
      return false;
    }

    if (stateFilter && paper.state !== stateFilter) {
      return false;
    }
    return true;
  });
  const router = useRouter();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/papers`,
        );
        const data = await res.json();

        if (data.success) {
          setPapers(data.papers);
        }
      } catch (err) {
        console.error("Failed to fetch papers", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  const handlePaperClick = (paper) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}${paper.file_path}`,
      "_blank",
    );
  };

  if (loading) {
    return <p className="text-center mt-10">Loading papers...</p>;
  }

  if (papers.length === 0) {
    return (
      <p className="text-center mt-10">
        No papers uploaded yet for this category
      </p>
    );
  }

  const handleDownloadButtonClick = async (paper) => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/papers/${paper.id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to download the file :(");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${paper.title}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error during downloading:", err);
    }
  };

  return (
    <div className="flex gap-5">
      <Sidebar
        papers={papers}
        classFilter={classFilter}
        subjectFilter={subjectFilter}
        examFilter={examFilter}
        yearFilter={yearFilter}
        countryFilter={countryFilter}
        stateFilter={stateFilter}
        setClassFilter={setClassFilter}
        setYearFilter={setYearFilter}
        setCountryFilter={setCountryFilter}
        setStateFilter={setStateFilter}
        setSubjectFilter={setSubjectFilter}
        setExamFilter={setExamFilter}
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto overflow-x-hidden">
        {filteredPapersss.map((paper) => (
          <div key={paper.id}>
            <div
              onClick={() => handlePaperClick(paper)}
              className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all flex flex-col gap-1"
            >
              <h2>{paper.title}</h2>
              <p>
                {paper.subject}.{paper.state}.{paper.country}
              </p>
              <p>{paper.year}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadButtonClick(paper);
                }}
                className="bg-black text-white text-sm px-3 py-1 rounded-lg mt-2 cursor-pointer active:scale-90 transition-all"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
