import { useEffect, useRef } from "react";
import { Check } from "lucide-react";

export default function SuccessModal({
  isOpen,
  onClose,
  message = "تم تحديث البيانات بنجاح",
}) {
  const closeTimerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    document.body.style.overflow = "hidden";

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, 2000);

    return () => {
      document.body.style.overflow = "";
      if (closeTimerRef.current != null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isOpen, onClose]);

  const handleBackdropClose = () => {
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white px-10 py-12 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        dir="rtl"
      >
        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-sky-400 bg-white">
          <Check
            className="h-14 w-14 text-sky-400"
            strokeWidth={2.25}
            aria-hidden
          />
        </div>

        <p
          id="success-modal-title"
          className="font-changa text-xl font-semibold leading-relaxed text-sky-400 sm:text-2xl"
        >
          {message}
        </p>
      </div>
    </div>
  );
}
