import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorSignupSuccess = ({ onClose }) => {
  const navigate = useNavigate();

  // منع الاسكرول في الصفحة اللي ورا
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
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[16px] p-8 lg:p-12 flex flex-col items-center gap-6 max-w-[600px] w-full shadow-lg text-center"
        dir="rtl"
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-changa font-bold text-[40px] text-[#468EEC] leading-tight">
            شكراً لانضمامك إلينا!
          </h2>

          <p className="font-changa font-semibold text-[28px] text-[#5B5B5B] leading-relaxed">
            جاري الآن مراجعة بياناتك الطبية والمهنية، وسيتم تفعيل حسابك خلال 24
            ساعة.
          </p>

          <p className="font-cairo font-semibold text-[20px] text-[#FF9933]">
            سنعلمك فور الانتهاء.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={onClose}
            className="w-[180px] h-[52px] border border-[#468EEC] text-[#468EEC] rounded-lg font-semibold text-[16px] hover:bg-blue-50 transition-colors"
          >
            تعديل البيانات
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-[180px] h-[52px] bg-[#468EEC] text-white rounded-lg font-semibold text-[16px] shadow-[0px_4px_4px_rgba(0,0,0,0.15)] hover:bg-[#357bd8] transition-colors"
          >
            عرض ملفي المهني
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignupSuccess;
