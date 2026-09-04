"use client";
import { useState, useEffect } from "react";

const page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Please log in to view settings</p>;
  }

  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <div className="h-[83vh] flex flex-col lg:px-5 gap-5">
      <div>
        <h1 className="text-4xl lg:text-5xl">Settings</h1>
        <p className="text-xl lg:text-2xl">
          Manage your account and preferences
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20">
        <div className="sketchy-border h-50 p-5 rounded-xl flex flex-col gap-2 lg:gap-3">
          <h1 className="text-2xl lg:text-3xl">Profile</h1>
          <div className="flex gap-5 lg:gap-10">
            <button className="rounded-full w-20 h-20 lg:w-25 lg:h-25 sketchy-border">
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

        <div className="sketchy-border h-50 p-5 rounded-xl flex flex-col gap-3">
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
              ></input>
            </div>
          </div>
          <button className="sketchy-border w-fit px-2 text-xl cursor-pointer rounded-xl ml-auto bg-black text-white hover:bg-white hover:text-black transition-all ">
            Update
          </button>
        </div>

        <div className="sketchy-border h-50 p-5 rounded-xl flex flex-col gap-2">
          <h1 className="text-2xl lg:text-3xl">Appearance</h1>

          <div>
            <h1 className="text-xl">Theme</h1>
          </div>
          <div className="flex gap-5">
            <div className="sketchy-border px-2 py-1 rounded-xl active:scale-95 cursor-pointer hover:bg-black hover:text-white text-xl lg:text-2xl">
              Light
            </div>
            <div className="sketchy-border px-2 py-1 rounded-xl active:scale-95 cursor-pointer hover:bg-black hover:text-white text-xl lg:text-2xl">
              Dark
            </div>
            <div className="sketchy-border px-2 py-1 rounded-xl active:scale-95 cursor-pointer hover:bg-black hover:text-white text-xl lg:text-2xl">
              System
            </div>
          </div>
        </div>
      </div>
      <div className="sketchy-border p-5 rounded-xl">
        <div className="flex justify-between items-center gap-2">
          <div className="flex lg:gap-1 flex-col">
            <h1 className="text-2xl lg:text-3xl">Delete Account</h1>
            <p className="text-lg lg:text-xl leading-4">
              Once you delete your account, it won't be available again
            </p>
          </div>

          <div>
            <button className="text-md lg:text-xl sketchy-border leading-3 py-2 px-3 rounded-xl bg-[#F05A5A] hover:bg-[#ea3737] cursor-pointer active:scale-95 transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
