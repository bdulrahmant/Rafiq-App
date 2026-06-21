export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  form,
}) {
  const baseStyles =
    "rounded-lg font-cairo font-semibold transition-all duration-200 flex items-center justify-center gap-2";

//   const variants = {
//     primary: "bg-primary text-white hover:bg-[#3A7AD9]",
//     secondary:
//       "bg-white text-primary border border-primary hover:bg-gray-50",
//     outline:
//       "bg-transparent text-primary border border-primary hover:bg-primary/10",
//   };

const variants = {
  primary: "bg-[#468EEC] text-white hover:bg-[#3A7AD9]",
  secondary: "bg-white text-[#468EEC] border border-[#468EEC] hover:bg-gray-50",
  outline: "bg-transparent text-[#468EEC] border border-[#468EEC] hover:bg-[#468EEC]/10",
};


  const sizes = {
    sm: "px-4 py-2 text-sm h-[42px]",
    md: "px-6 py-2.5 text-base h-[52px]",
    lg: "px-8 py-3 text-lg h-[60px]",
  };

  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
