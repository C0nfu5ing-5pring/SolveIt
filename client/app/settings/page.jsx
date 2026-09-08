"use client";
import { useState, useEffect } from "react";
import laughingCat from "../../public/images/laughingCat.jpg";
import Image from "next/image";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";

const page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState("");
  const [updating, setUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [myPapers, setMyPapers] = useState([]);
  const [papersLoading, setPapersLoading] = useState(true);
  const [deletePaperId, setDeletePaperId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMyPapers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setPapersLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/papers/my-papers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const data = await res.json();
        if (data.success) {
          setMyPapers(data.papers);
        }
      } catch (err) {
        console.error("Failed to fetch your papers :(", err);
        toast(<CustomToast msg="Failed to fetch papers :(" />);
      } finally {
        setPapersLoading(false);
      }
    };
    fetchMyPapers();
  }, []);

  if (loading) {
    return <p className="text-center text-4xl mt-10">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="flex flex-col h-[80vh] justify-center items-center gap-4">
        <Image src={laughingCat} alt="Laughing Cat" width={400} height={700} />
        <p className="text-2xl text-center lg:text-4xl">
          This guy is trying to access the site without logging in. LOL
        </p>
      </div>
    );
  }

  const handleEmailUpdate = async () => {
    if (!newEmail) {
      toast(<CustomToast msg="Please enter an email address" />);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast(<CustomToast msg="Please enter a valid email address" />);
      return;
    }

    const token = localStorage.getItem("token");
    setUpdating(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-email`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: newEmail }),
        },
      );

      if (!res.ok && res.status >= 500) {
        throw new Error("Server error");
      }

      const data = await res.json();
      if (data.success) {
        setUser((prev) => ({ ...prev, email: data.email }));
        setNewEmail("");
        toast(<CustomToast msg="Email updated successfully" />);
      } else {
        toast(<CustomToast msg={data.message} />);
      }
    } catch (err) {
      console.error("Failed to update email", err);
      toast(
        <CustomToast msg="Couldn't reach the server. Check your connection OR, maybe my WiFi isn't working" />,
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast(<CustomToast msg="Please enter your password" />);
      return;
    }

    const token = localStorage.getItem("token");
    setDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete-me`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: deletePassword }),
        },
      );

      if (!res.ok && res.status >= 500) {
        throw new Error("Server error");
      }

      const data = await res.json();

      if (data.success) {
        toast(<CustomToast msg="Account deleted successfully" />);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast(<CustomToast msg={data.message} />);
      }
    } catch (err) {
      console.error("Failed to delete account", err);
      toast(
        <CustomToast msg="Couldn't reach the server. Check your connection." />,
      );
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setDeletePassword("");
    }
  };

  const handleDeletePaper = async (paperId) => {
    const token = localStorage.getItem("token");
    setDeletePaperId(paperId);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/papers/${paperId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!res.ok && res.status >= 500) {
        throw new Error("Server error :(");
      }

      const data = await res.json();

      if (data.success) {
        setMyPapers((prev) => prev.filter((p) => p.id !== paperId));
        toast(<CustomToast msg="Paper deleted" />);
      } else {
        toast(<CustomToast msg={data.message} />);
      }
    } catch (err) {
      console.error("Failed to delete paper :(", err);
      toast(<CustomToast msg="Couldn't reach server :(" />);
    } finally {
      setDeletePaperId(null);
    }
  };

  return (
    <div className=" flex flex-col lg:px-5 gap-5 pb-10">
      <div>
        <h1 className="text-4xl lg:text-5xl">Settings</h1>
        <p className="text-xl lg:text-2xl">
          Manage your account and preferences
        </p>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 lg:gap-5">
        <div className="sketchy-border p-5 rounded-xl flex flex-col gap-2 lg:gap-3 mb-5 break-inside-avoid">
          <h1 className="text-2xl lg:text-3xl">Profile</h1>
          <div className="flex gap-5 lg:gap-10">
            <button className="rounded-full w-20 h-20 lg:w-25 lg:h-25 sketchy-border shrink-0">
              Edit
            </button>

            <div className="flex flex-col lg:gap-2 ">
              <p className="text-xl">Name: {user.name}</p>
              <p className="text-xl">Email: {user.email}</p>
              <p className="text-xl">
                Joined:{" "}
                {new Date(user.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="sketchy-border p-5 rounded-xl flex flex-col gap-2 lg:gap-3 mb-5 break-inside-avoid">
          <h1 className="text-2xl lg:text-3xl">Account</h1>

          <div className="flex flex-col gap-1 lg:gap-2 ">
            <div className="flex justify-between">
              <p className="text-xl">Email</p>
              <p className="text-xl">{user.email}</p>
            </div>
            <hr className="sketchy-divider" />
            <div className="flex justify-between">
              <p className="text-xl">Change Email</p>

              <input
                className="text-xl mb-3 cursor-pointer px-1"
                type="email"
                placeholder="Enter new email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              ></input>
            </div>
          </div>
          <button
            disabled={updating}
            onClick={handleEmailUpdate}
            className="text-lg md:text-xl lg:text-2xl sketchy-border w-fit ml-auto bg-[#9EDC7A] hover:bg-[#70c042] px-3 py-1 rounded-xl cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </div>

        <div className="sketchy-border p-5 rounded-xl flex flex-col gap-2 lg:gap-3 mb-5 break-inside-avoid">
          <h1 className="text-2xl lg:text-3xl">Appearance</h1>

          <div>
            <h1 className="text-xl lg:text-2xl">Theme</h1>
          </div>
          <div className="flex gap-5">
            <div className="text-lg md:text-xl lg:text-2xl hover:text-[#fffef9] sketchy-border w-fit bg-[#fffef9] hover:bg-[#171717] px-3 py-1 rounded-xl cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Light
            </div>
            <div className="text-lg md:text-xl lg:text-2xl hover:text-[#fffef9] sketchy-border w-fit bg-[#fffef9] hover:bg-[#171717] px-3 py-1 rounded-xl cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Dark
            </div>
            <div className="text-lg md:text-xl lg:text-2xl hover:text-[#fffef9] sketchy-border w-fit bg-[#fffef9] hover:bg-[#171717] px-3 py-1 rounded-xl cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              System
            </div>
          </div>
        </div>
      </div>

      <div className="sketchy-border p-5 rounded-xl flex flex-col gap-2 lg:gap-3 mb-5 overflow-y-auto overflow-x-hidden min-w-0 w-full box-border">
        <h1 className="text-2xl lg:text-3xl">Your Uploads</h1>

        {papersLoading ? (
          <p className="text-lg">Loading your papers...</p>
        ) : myPapers.length === 0 ? (
          <p className="text-lg">You haven't uploaded any papers yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full pr-1">
            {myPapers.map((paper) => (
              <div
                key={paper.id}
                onClick={() => router.push(`papers/${paper.id}`)}
                className="sketchy-border p-5 rounded-xl flex flex-col gap-2 min-w-0 w-full box-border"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <h1 className="lg:text-3xl text-2xl truncate">
                    {paper.title}
                  </h1>
                  <p className="px-2 text-lg md:text-xl lg:text-2xl sketchy-border w-fit rounded-xl">
                    {paper.subject}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <p className="text-lg md:text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap w-fit">
                    {"Class " + paper.class}
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl sketchy-border px-2 rounded-full whitespace-nowrap w-fit">
                    {paper.exam_name}
                  </p>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="text-lg md:text-xl lg:text-2xl whitespace-nowrap w-fit">
                    {new Date(paper.uploaded_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </p>
                  <button
                    disabled={deletePaperId === paper.id}
                    onClick={() => handleDeletePaper(paper.id)}
                    className="sketchy-border px-2 py-2 rounded-xl bg-[#F05A5A] hover:bg-[#e94b4b] text-lg cursor-pointer active:scale-95 transition-all disabled:opacity-50 shrink-0"
                  >
                    {deletePaperId === paper.id ? (
                      "..."
                    ) : (
                      <HugeiconsIcon
                        icon={Delete02Icon}
                        size={24}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sketchy-border-del p-5 rounded-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-1 flex-col">
            <h1 className="text-2xl lg:text-3xl  text-[#e94b4b]">
              Delete Account
            </h1>
            <p className="text-lg lg:text-xl leading-4">
              Once you delete your account, it won't be available again
            </p>
          </div>

          <div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="text-lg md:text-xl lg:text-2xl sketchy-border w-fit  bg-[#F05A5A] hover:bg-[#e94b4b] px-6 py-2 rounded-xl cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-[#17171751] flex items-center justify-center z-50 px-4">
          <div className="sketchy-border-del bg-[#fffef9] p-6 rounded-xl max-w-sm w-full flex flex-col gap-4">
            <h2 className="text-2xl lg:text-3xl">Confirm Delete</h2>
            <p className="text-lg">
              Enter your password to permanently delete your account and all
              uploaded papers.
            </p>
            <input
              type="password"
              placeholder="Your password"
              value={deletePassword}
              onChange={(e) => {
                setDeletePassword(e.target.value);
              }}
              className="sketchy-border px-3 py-2 rounded-xl text-lg"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="sketchy-border px-4 py-2 rounded-xl text-lg  cursor-pointer active:scale-95 transition-all disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Forever"}
              </button>
              <button
                className="sketchy-border px-4 bg-[#f05a5a] hover:bg-[#e94b4b] py-2 rounded-xl text-lg cursor-pointer active:scale-95 transition-all"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
