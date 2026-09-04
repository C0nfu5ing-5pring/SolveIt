"use client";
import Sidebar from "../../components/Sidebar.jsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon, Download01Icon } from "@hugeicons/core-free-icons";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast.jsx";
import SearchBar from "../../components/SeachBar.jsx";
import notFound from "../../public/images/404.png";
import Image from "next/image";

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
  const [userSearch, setUserSearch] = useState("");
  const [error, setError] = useState(false);

  const filteredPapersss = papers.filter((paper) => {
    if (classFilter && paper.class !== classFilter) return false;
    if (subjectFilter && paper.subject !== subjectFilter) return false;
    if (examFilter && paper.exam_name !== examFilter) return false;
    if (yearFilter && String(paper.year) !== yearFilter) return false;
    if (countryFilter && paper.country !== countryFilter) return false;
    if (stateFilter && paper.state !== stateFilter) return false;
    if (userSearch) {
      const search = userSearch.toLowerCase();
      const titleMatch = paper.title?.toLowerCase().includes(search);
      const descriptionMatch = paper.description
        ?.toLowerCase()
        .includes(search);
      if (!titleMatch && !descriptionMatch) {
        return false;
      }
    }

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

    router.push(`/papers/${paper.id}`);
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
      toast(<CustomToast msg="Downloaded successfully" />);
    } catch (err) {
      toast(<CustomToast msg="Error during downloading :(" />);
      console.error("Error during downloading :(", err);
    }
  };

  if (loading) {
    return <p className="text-center text-4xl mt-10">Loading papers...</p>;
  }

  if (papers.length === 0) {
    return (
      <div className="flex flex-col h-[80vh] justify-center items-center gap-4">
        <Image src={notFound} alt="404 Not Found!" width={400} height={700} />
        <p className="text-2xl text-center lg:text-4xl">
          You can't access the website unless my WiFi comes back. So Sorry
        </p>
        <p className="text-xl lg:text-3xl">Meanwhile, you can watch this!</p>
        <a
          target="_blank"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"
          className="mt-5 border-2 border-black px-4 py-2 uppercase font-bold sketchy-border hover:bg-black hover:text-white transition-colors"
        >
          Watch
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 min-h-screen md:h-screen md:overflow-hidden">
      <SearchBar userSearch={userSearch} setUserSearch={setUserSearch} />

      <div className="flex flex-col md:flex-row gap-5 md:flex-1 md:overflow-hidden">
        <button
          onClick={() => setFiltersOpen((prev) => !prev)}
          className="md:hidden text-xl sketchy-border rounded-xl flex items-center justify-center gap-2 border-2 border-black rounded-md py-2 cursor-pointer active:scale-95 transition-all"
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

        <div className="w-full md:flex-1 md:columns-2 lg:columns-3 xl:columns-4 md:gap-4 md:h-full md:overflow-y-auto md:pr-2">
          {filteredPapersss.map((paper) => {
            const filesizeinmb = (paper.file_size / 1024 / 1024).toFixed(1);
            const filesizeinkb = (paper.file_size / 1024).toFixed(1);

            return (
              <div key={paper.id} className="w-full mb-4 md:break-inside-avoid">
                <div
                  onClick={() => handlePaperClick(paper)}
                  className="sketchy-border p-4 rounded-xl w-full flex flex-col gap-2 cursor-pointer relative"
                >
                  <div>
                    <h1 className="lg:text-3xl text-2xl">
                      {paper.title.length > 20
                        ? paper.title.slice(0, 20) + "..."
                        : paper.title}
                    </h1>
                    {paper.description !== null && (
                      <p className="text-lg">
                        {paper.description.length > 40
                          ? paper.description.slice(0, 40) + "..."
                          : paper.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center flex-wrap">
                      <p className="text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
                        {"Class" + " " + paper.class}
                      </p>
                      <p className="text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
                        {paper.subject}
                      </p>
                    </div>

                    <div className="flex gap-1 flex-wrap">
                      <p className="text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
                        {paper.exam_name}
                      </p>

                      {(paper.exam_name === "State Boards" ||
                        paper.exam_name === "State Standardized Tests") && (
                        <p className="text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
                          {paper.state}
                        </p>
                      )}

                      <p className="text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
                        {paper.type}
                      </p>

                      <p className="text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
                        {paper.year}
                      </p>
                    </div>

                    <div className="flex gap-1 flex-wrap">
                      <p className="text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
                        {paper.page_count} Pages{" "}
                      </p>
                      <p className="text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
                        {filesizeinmb > 0.6
                          ? filesizeinmb + " MB"
                          : filesizeinkb + " KB"}
                      </p>
                    </div>
                  </div>

                  <hr className="mt-auto" />

                  <div className="flex justify-between gap-2">
                    <p className="text-lg lg:text-xl underline">
                      By: {paper.uploader_name}
                    </p>
                    <p className="text-lg lg:text-xl">
                      {new Date(paper.uploaded_at).toLocaleDateString("en-GB", {
                        day: "2-digit",

                        month: "2-digit",

                        year: "2-digit",
                      })}
                    </p>
                    <p className="flex items-center gap-2 text-xl">
                      {paper.download_count + " "}

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
    </div>
  );
}
