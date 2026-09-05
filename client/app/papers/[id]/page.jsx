"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CustomToast from "../../../components/CustomToast.jsx";
import Image from "next/image.js";
import notFound from "../../public/images/404.png";

export default function PaperPage() {
  const { id } = useParams();
  const router = useRouter();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/papers/${id}`,
        );
        const data = await res.json();

        if (data.success) {
          setPaper(data.paper);
        }
      } catch (err) {
        console.error("Failed to fetch paper", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaper();
  }, [id]);

  const handleDownloadButtonClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/papers/${id}/download`,
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
    return <p className="text-center text-4xl mt-10">Loading paper...</p>;
  }

  if (!paper) {
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

  const filesizeinmb = (paper.file_size / 1024 / 1024).toFixed(1);
  const filesizeinkb = (paper.file_size / 1024).toFixed(1);

  return (
    <div className="flex flex-col md:flex-row gap-5 h-[83vh]">
      <button
        onClick={() => router.push("/browse")}
        className="md:hidden text-xl sketchy-border flex items-center justify-center gap-2 border-2 border-black rounded-xl py-2 cursor-pointer active:scale-95 transition-all"
      >
        Back
      </button>

      <div className="w-full md:flex-1 h-[60vh] md:h-full sketchy-border rounded-xl overflow-hidden p-1">
        <iframe
          src={`${process.env.NEXT_PUBLIC_API_URL}${paper.file_path}`}
          className="w-full h-full rounded-xl"
          title={paper.title}
        />
      </div>

      <div className="w-full md:w-96 md:h-full md:overflow-y-auto flex flex-col gap-3 lg:gap-3">
        <h1 className="lg:text-5xl text-4xl leading-10">{paper.title}</h1>

        {paper.description && (
          <p className="text-xl lg:text-2xl text-gray-700">
            {paper.description}
          </p>
        )}

        <div className="flex gap-2 flex-wrap">
          <p className="text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
            {"Class " + paper.class}
          </p>
          <p className="text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
            {paper.subject}
          </p>
          <p className="text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
            {paper.exam_name}
          </p>
          {(paper.exam_name === "State Boards" ||
            paper.exam_name === "State Standardized Tests") && (
            <p className="text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
              {paper.state}
            </p>
          )}
          <p className="text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
            {paper.type}
          </p>
          <p className="text-2xl sketchy-border px-2 rounded-full whitespace-nowrap">
            {paper.year}
          </p>
        </div>

        <hr className="sketchy-divider" />
        <div className="flex flex-col gap-1">
          <p className="text-2xl rounded-full whitespace-nowrap">
            Size:{" "}
            {filesizeinmb > 0.6 ? filesizeinmb + " MB" : filesizeinkb + " KB"}
          </p>
          <p className="text-2xl rounded-full whitespace-nowrap">
            Length: {paper.page_count} Pages
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-xl">Uploaded By:</p>
            <p className="text-4xl underline">{paper.uploader_name}</p>
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-2xl">
              Date:{" "}
              {new Date(paper.uploaded_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              })}
            </p>
            <p className="text-2xl">
              Downloads: {paper.download_count} downloads
            </p>
          </div>
        </div>
        <hr className="sketchy-divider" />

        <div className="flex flex-col gap-3">
          <button
            onClick={handleDownloadButtonClick}
            className="text-lg sketchy-border flex items-center justify-center gap-2 bg-[#9EDC7A] hover:bg-[#70c042] active:scale-95 transition-all mt-2 px-4 py-2 rounded-xl cursor-pointer w-full"
          >
            Download
          </button>
          <button
            onClick={() => router.push("/browse")}
            className="hidden md:flex text-lg sketchy-border items-center justify-center gap-2 border-2 border-black rounded-xl py-2 cursor-pointer active:scale-95 transition-all w-full px-5"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
