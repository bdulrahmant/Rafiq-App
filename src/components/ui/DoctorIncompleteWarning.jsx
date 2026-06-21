import { useEffect } from "react";

const DoctorIncompleteWarning = ({ onClose, onGoUpload }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/30 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[16px] p-8 lg:p-10 max-w-[520px] w-full shadow-lg text-center flex flex-col gap-6"
      >
        <h2 className="font-changa font-bold text-[28px] text-[#C62828]">
          لم يتم رفع أي مستندات
        </h2>

        <p className="font-cairo font-semibold text-[18px] text-[#5B5B5B] leading-relaxed">
          لإتمام التوثيق وتفعيل حسابك، يجب رفع الشهادات الطبية وبطاقة الترخيص.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
          <button
            onClick={onClose}
            className="w-[180px] h-[48px] border border-[#468EEC] text-[#468EEC] rounded-lg font-semibold hover:bg-blue-50"
          >
            تعديل لاحقًا
          </button>

          <button
            onClick={onGoUpload}
            className="w-[180px] h-[48px] bg-[#468EEC] text-white rounded-lg font-semibold hover:bg-[#357bd8]"
          >
            رفع المستندات الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorIncompleteWarning;
