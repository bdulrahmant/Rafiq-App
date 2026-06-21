import { useEffect } from "react";

function DonePopup({
  isOpen,
  onClose,
  message = "تم بنجاح",
  color = "blue",
}) {
  const colors = {
    blue: "text-blue-500 border-blue-500 font-bold",
    green: "text-green-500 border-green-500 font-bold",
    red: "text-red-500 border-red-500",
    gray: "text-gray-500 border-gray-500",
  };

  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-2xl h-56 max-w-md rounded-2xl p-8 text-center shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Circle */}
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-full border-2 flex items-center justify-center ${colors[color]}`}
        >
          <span className={`text-2xl font-bold ${colors[color]}`}>
            ✓
          </span>
        </div>

        {/* Message */}
        <p className={`text-lg font-medium ${colors[color]}`}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default DonePopup;