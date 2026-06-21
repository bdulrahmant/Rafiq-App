import { useEffect } from "react";

const AuthMessageModal = ({
  open,
  title,
  message,
  type = "error",
  buttonText = "حسناً",
  onClose,
}) => {

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/30 flex items-center justify-center p-4"
      onClick={onClose}
    >

      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="
        bg-white
        rounded-[16px]
        p-8
        max-w-[520px]
        w-full
        text-center
        shadow-lg
        "
      >

        <h2
          className={`
          text-[30px]
          font-bold
          mb-5

          ${
            type === "success"
              ? "text-[#34C759]"
              : "text-[#C62828]"
          }
          `}
        >
          {title}
        </h2>

        <p
          className="
          text-[18px]
          text-[#5B5B5B]
          leading-relaxed
          mb-8
          "
        >
          {message}
        </p>

        <button
          onClick={onClose}
          className="
          w-[200px]
          h-[52px]
          bg-[#468EEC]
          text-white
          rounded-lg
          font-semibold
          "
        >
          {buttonText}
        </button>

      </div>

    </div>
  );
};

export default AuthMessageModal;