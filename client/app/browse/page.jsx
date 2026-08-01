"use client";
import Sidebar from "../../components/Sidebar.jsx";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";

export default function BrowsePage() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto overflow-x-hidden">
        {papers.map((paper) => (
          <>
            <div
              key={paper.id}
              onClick={() => handlePaperClick(paper)}
              className="border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all flex flex-col gap-1"
            >
              <h2>{paper.title}</h2>
              <p>
                {paper.subject}.{paper.state}.{paper.country}
              </p>
              <p>{paper.year}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
