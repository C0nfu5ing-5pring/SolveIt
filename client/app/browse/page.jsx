"use client";
import Sidebar from "../../components/Sidebar.jsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon, Download01Icon } from "@hugeicons/core-free-icons";
import { toast } from "react-toastify";

export default function BrowsePage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [examFilter, setExamFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const router = useRouter();

  const filteredPapersss = papers.filter((paper) => {
    if (classFilter && paper.class !== classFilter) return false;
    if (subjectFilter && paper.subject !== subjectFilter) return false;
    if (examFilter && paper.exam_name !== examFilter) return false;
    if (yearFilter && String(paper.year) !== yearFilter) return false;
    if (countryFilter && paper.country !== countryFilter) return false;
    if (stateFilter && paper.state !== stateFilter) return false;
    return true;
  });

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

  const handleDownloadButtonClick = async (paper) => {
    const token = localStorage.getItem("token");

    if (!token) {
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
        toast.error("Failed to download the file :(");
        throw new Error("Failed to download the file :(");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${paper.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Error during downloading :(", err);
      console.error("Error during downloading :(", err);
    }
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

  return (
    <div className="flex flex-col md:flex-row gap-5 h-full min-h-0">
      <button
        onClick={() => setFiltersOpen((prev) => !prev)}
        className="md:hidden text-xl flex items-center justify-center gap-2 border-2 border-black rounded-md py-2 cursor-pointer active:scale-95 transition-all"
      >
        <HugeiconsIcon icon={FilterIcon} size={25} />
        {filtersOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div className={`${filtersOpen ? "block" : "hidden"} md:block`}>
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
      </div>

      <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-3 xl:columnst-4 gap-4 overflow-y-auto overflow-x-hidden flex-1">
        {filteredPapersss.map((paper) => {
          const filesizeinmb = (paper.file_size / 1024 / 1024).toFixed(1);
          const filesizeinkb = (paper.file_size / 1024).toFixed(1);

          return (
            <div key={paper.id}>
              <div
                onClick={() => handlePaperClick(paper)}
                className="border-2 border-solid border-black p-4 rounded-xl w-full flex flex-col gap-2 cursor-pointer relative mb-4 break-inside-avoid"
              >
                <div>
                  <h1 className="lg:text-3xl text-2xl">
                    {paper.title.length > 20
                      ? paper.title.slice(0, 20) + "..."
                      : paper.title}
                  </h1>
                </div>

                <div className="flex flex-col gap-2 overflow-auto">
                  <div className="flex gap-1 items-center flex-wrap">
                    <p className="text-xl lg:text-2xl border px-2 rounded-full whitespace-nowrap">
                      {"Class" + " " + paper.class}
                    </p>
                    <p className="text-xl lg:text-2xl border px-2 rounded-full whitespace-nowrap">
                      {paper.subject}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <p className="text-xl lg:text-2xl  border px-2 rounded-full whitespace-nowrap">
                      {paper.exam_name}
                    </p>
                    <p className="text-xl lg:text-2xl  border px-2 rounded-full whitespace-nowrap">
                      {paper.state}
                    </p>
                    <p className="text-xl lg:text-2xl  border px-2 rounded-full whitespace-nowrap">
                      {paper.year}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    <p className="text-xl lg:text-2xl border px-2 rounded-full whitespace-nowrap">
                      {paper.page_count} Pages ·{" "}
                    </p>
                    <p className="text-xl lg:text-2xl border px-2 rounded-full whitespace-nowrap">
                      {filesizeinmb > 0.6
                        ? filesizeinmb + " MB"
                        : filesizeinkb + " KB"}
                    </p>
                  </div>
                </div>

                <hr className="mt-auto" />

                <div className="flex justify-between">
                  <p className="text-lg lg:text-xl">
                    By: {paper.uploader_name}
                  </p>
                  <p className="text-lg lg:text-xl">
                    {new Date(paper.uploaded_at).toDateString().slice(4)}
                  </p>
                  <p className="text-lg lg:text-xl">
                    {paper.download_count + " "}DL
                  </p>
                  <p>
                    <HugeiconsIcon
                      icon={Download01Icon}
                      size={29}
                      color="currentColor"
                      strokeWidth={1.5}
                      className="z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadButtonClick(paper);
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
