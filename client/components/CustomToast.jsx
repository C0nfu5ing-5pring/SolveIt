const CustomToast = ({ msg }) => {
  return (
    <div className="flex items-center gap-3">
      <p
        className=" text-black text-lg lg:text-xl"
        style={{ fontFamily: "kiddos" }}
      >
        {msg}
      </p>
    </div>
  );
};

export default CustomToast;
