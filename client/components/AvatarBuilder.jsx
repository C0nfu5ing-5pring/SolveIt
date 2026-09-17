"use client";
import { useState } from "react";
import Avatar from "./Avatar";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";
import { handleAuthError } from "../lib/handleAuthError";
import { useRouter } from "next/navigation";

const bg_colours = [
  "#ffd93d",
  "#9edc7a",
  "#7ac7ec",
  "#f05a5a",
  "#c97aec",
  "#ec9e7a",
  "#7aecc4",
  "#ec7ab8",
];
const eyes = ["happy", "dot", "wink", "angry"];
const mouth = ["smile", "flat", "open", "smirk"];

export default function AvatarBuilder({ currentConfig, onClose, onSave }) {
  const [config, setConfig] = useState(
    currentConfig || {
      bg: "#ffd93d",
      eyes: "happy",
      mouth: "smile",
    },
  );
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    setSaving(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-avatar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ avatarConfig: config }),
        },
      );

      if (res.status === 400 || res.status === 401) {
        handleAuthError(router);
        return;
      }
      const data = await res.json();
      if (data.success) {
        toast(<CustomToast msg="Avatar updated!" />);
        onSave(config);
        onClose();
      } else {
        toast(<CustomToast msg={data.message} />);
      }
    } catch (err) {
      console.error("Failed to update avatar :(", err);
      toast(<CustomToast msg="Couldn't reach the server :(" />);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#17171751] flex items-center justify-center z-50 px-4">
      <div className="sketchy-border bg-[#fffef9] p-6 rounded-xl max-w-md w-full flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="flex flex-col items-center gap-2">
          <Avatar config={config} size={100} />
          <h2 className="text-2xl">Build Your Avatar</h2>
        </div>

        <div>
          <p className="text-lg mb-2">Background</p>
          <div className="flex gap-2 flex-wrap">
            {bg_colours.map((color) => (
              <button
                key={color}
                onClick={() => setConfig((prev) => ({ ...prev, bg: color }))}
                className={`w-10 h-10 sketchy-border rounded-full cursor-pointer transition-all active:scale-90 ${
                  config.bg === color ? "ring-2 ring-[#171717]" : ""
                }`}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg mb-2">Eyes</p>
          <div className="flex gap-2 flex-wrap">
            {eyes.map((eye) => (
              <button
                key={eye}
                onClick={() => setConfig((prev) => ({ ...prev, eyes: eye }))}
                className={`px-3 py-1 rounded-xl text-lg sketchy-border cursor-poi adf nter active:scale-95 transition-all capitalize ${
                  config.eyes === eye ? "bg-[#171717] text-[#fffef9]" : ""
                }`}
              >
                {eye}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-lg mb-2">Mouth</p>
          <div className="flex gap-2 flex-wrap">
            {mouth.map((mth) => (
              <button
                key={mth}
                onClick={() => setConfig((prev) => ({ ...prev, mouth: mth }))}
                className={`px-3 py-1 rounded-xl text-lg sketchy-border cursor-pointer active:scale-95 transition-all capitalize ${
                  config.mouth === mth ? "bg-[#171717] text-[#fffef9]" : ""
                }`}
              >
                {mth}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-2">
          <button
            onClick={onClose}
            className="sketchy-border px-4 py-2 rounded-xl text-lg cursor-pointer active:scale-95 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="sketchy-border px-4 py-2 rounded-xl text-lg bg-[#9edc7a] hover:bg-[#70c042] cursor-pointer active:scale-95 transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
