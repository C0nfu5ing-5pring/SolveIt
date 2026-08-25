const CustomToast = ({ msg, type = "info" }) => {
  const colors = {
    sucess: "border-green-500 text-green-400",
    error: "border-red-500 text-red-400",
    info: "border-blue-500 text-blue-400",
  };

  return (
    <div className={`flex items-center gap-3 ${colors[type]} `}>
      <p className="text-white text-sm">{msg}</p>
    </div>
  );
};
