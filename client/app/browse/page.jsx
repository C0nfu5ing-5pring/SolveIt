"use client";
import Sidebar from "../../components/Sidebar.jsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Bookmark02Icon, File02Icon } from "@hugeicons/core-free-icons";

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
      return;
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
              className="border-2 border-solid border-black p-5 rounded-xl flex flex-col gap-3"
            >
              <div className="flex justify-between">
                <HugeiconsIcon icon={File02Icon} />

                <HugeiconsIcon
                  icon={Bookmark02Icon}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </div>

              <div>{paper.title}</div>

              <div>
                {paper.subject} | {paper.state}
              </div>

              <div>
                {paper.exam_name} | {paper.year} | {paper.download_count}{" "}
                downloads
              </div>

              <hr />

              <div>
                <p>Uploaded at: {new Date(paper.uploaded_at).toDateString()}</p>
                <p>Uploaded by: {paper.uploader_name}</p>
              </div>

              <hr />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadButtonClick(paper);
                }}
                className="text-md md:text-lg lg:text-xl bg-black active:scale-95 transition-all mt-2 text-white px-3 py-2 rounded-sm cursor-pointer"
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
