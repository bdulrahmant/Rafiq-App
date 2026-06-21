
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Upload, Check } from "lucide-react";
import { updateMedicalProfile } from "../../api/patient.api.js";
import AuthMessageModal from "../../components/ui/AuthMessageModal";

import rafiqLogo from "../../assets/rafiq-white-logo.png";
import robot from "../../assets/rafiq-salam.png";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    governorate: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
  });

  const [chronicDiseases, setChronicDiseases] = useState({
    heart: false,
    none: false,
    diabetes: false,
    immunity: false,
    pressure: false,
    asthma: false,
  });

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDisease = (key) => {
    setChronicDiseases((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("حجم الملف يجب ألا يتجاوز 10 ميجابايت");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleContinue = async () => {

    if (
      !formData.governorate ||
      !formData.age ||
      !formData.gender ||
      !formData.weight ||
      !formData.height
    ) {

      setModal({

        open: true,

        title:
          "بيانات غير مكتملة",

        message:
          "من فضلك أكمل جميع البيانات المطلوبة",

        type:
          "error",
      });

      return;
    }

    try {

      setLoading(true);

      const selectedDiseases =

        Object.entries(
          chronicDiseases
        )

          .filter(
            ([, value]) =>
              value
          )

          .map(
            ([key]) =>
              key
          );

      const payload = {

        height:
          Number(
            formData.height
          ),

        weight:
          Number(
            formData.weight
          ),

        chronicDiseases:

          chronicDiseases.none

            ?

            []

            :

            selectedDiseases,

        allergy:
          "",

        bloodType:
          "",
      };

      console.log(
        "Medical Payload:",
        payload
      );

      await updateMedicalProfile(
        payload
      );

      setModal({

        open: true,

        title:
          "تم بنجاح",

        message:
          "تم حفظ بياناتك الطبية بنجاح",

        type:
          "success",
      });

      setTimeout(() => {

        navigate(
          "/patient-home"
        );

      }, 1500);

    }

    catch (error) {

      console.log(
        error
      );

      setModal({

        open: true,

        title:
          "فشل حفظ البيانات",

        message:

          error
            ?.response
            ?.data
            ?.message ||

          "حدث خطأ أثناء حفظ البيانات",

        type:
          "error",
      });
    }

    finally {

      setLoading(false);
    }
  };

  const handleCompleteLater = () => {
    navigate("/patient-home");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse font-cairo bg-[#F7FBFF]" dir="rtl">

      {/* LEFT (FORM) */}
      <div className="w-full lg:w-[60%] xl:w-[55%] flex flex-col items-center p-4 lg:p-10 overflow-y-auto">

        <div className="w-full max-w-[608px] flex flex-col gap-8">

          {/* Header */}
          <div className="flex flex-col items-end gap-0 text-right">
            <h1 className="w-full font-changa font-bold text-[40px] text-[#468EEC] leading-[1.1]">
              أكمل ملفك الشخصي
            </h1>

            <button
              onClick={handleCompleteLater}
              className="text-[#468EEC] font-semibold "
            >
              سأقوم بالإكمال لاحقًا
            </button>

            <p className="font-semibold text-[16px] text-[#5B5B5B] text-right w-full">
              ساعدنا نفهم حالتك الصحية بشكل أدق لتحسين دقة التوصيات الطبية
            </p>
          </div>

          {/* Card 1 */}
          <div className="bg-white rounded-[16px] shadow-[0px_6px_4px_rgba(0,0,0,0.25)] p-6 lg:p-9 flex flex-col gap-4">

            <h2 className="font-changa font-semibold text-[28px] text-[#5B5B5B] text-right">
              المعلومات الاساسية
            </h2>

            {/* Governorate */}
            <div className="flex flex-col gap-2 items-end">
              <label className="text-[18px] font-semibold text-right w-full">
                المحافظة <span className="text-[#A00505]">*</span>
              </label>

              <div className="relative w-full">
                <select
                  value={formData.governorate}
                  onChange={(e) => handleChange("governorate", e.target.value)}
                  className="w-full h-[48px] px-3 border border-[#C7C7C7] rounded-lg text-right appearance-none"
                >
                  <option value="">اختر المحافظة</option>
                  <option>الغربية</option>
                  <option>القاهرة</option>
                  <option>الإسكندرية</option>
                </select>

                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Age + Gender */}
            <div className="flex gap-5">
              <input
                type="number"
                placeholder="العمر"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                className="w-full h-[48px] border rounded-lg text-right px-3"
              />

              <select
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full h-[48px] border rounded-lg text-right px-3"
              >
                <option value="">النوع</option>
                <option>ذكر</option>
                <option>أنثى</option>
              </select>
            </div>

            {/* Weight + Height */}
            <div className="flex gap-5">
              <input
                type="number"
                placeholder="الوزن KG"
                value={formData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                className="w-full h-[48px] border rounded-lg text-right px-3"
              />

              <input
                type="number"
                placeholder="الطول CM"
                value={formData.height}
                onChange={(e) => handleChange("height", e.target.value)}
                className="w-full h-[48px] border rounded-lg text-right px-3"
              />
            </div>
          </div>

          {/* Diseases */}
          <div className="bg-white rounded-[16px] shadow-[0px_6px_4px_rgba(0,0,0,0.25)] p-9 flex flex-col gap-8">

            <h2 className="font-changa font-semibold text-[28px] text-[#5B5B5B] text-right">
              الامراض المزمنة
            </h2>

            <div className="flex justify-between">

              {/* Column 1 */}
              <div className="flex flex-col gap-5 items-end">
                {[
                  { key: "heart", label: "قلب" },
                  { key: "none", label: "لا يوجد" },
                ].map((item) => (
                  <div key={item.key} onClick={() => toggleDisease(item.key)} className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[18px] font-semibold text-[#121212]">
                      {item.label}
                    </span>
                    <div className="w-[32px] h-[32px] flex items-center justify-center">
                      <div className={`w-[24px] h-[24px] border rounded-sm flex items-center justify-center ${chronicDiseases[item.key]
                        ? "bg-[#468EEC] border-[#468EEC]"
                        : "border-[#C7C7C7]"
                        }`}>
                        {chronicDiseases[item.key] && (
                          <Check size={16} color="white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-5 items-center">
                {[
                  { key: "diabetes", label: "سكر" },
                  { key: "immunity", label: "مناعة" },
                ].map((item) => (
                  <div key={item.key} onClick={() => toggleDisease(item.key)} className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[18px] font-semibold text-[#121212]">
                      {item.label}
                    </span>
                    <div className="w-[32px] h-[32px] flex items-center justify-center">
                      <div className={`w-[24px] h-[24px] border rounded-sm flex items-center justify-center ${chronicDiseases[item.key]
                        ? "bg-[#468EEC] border-[#468EEC]"
                        : "border-[#C7C7C7]"
                        }`}>
                        {chronicDiseases[item.key] && (
                          <Check size={16} color="white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-5 items-start">
                {[
                  { key: "pressure", label: "ضغط" },
                  { key: "asthma", label: "ربو" },
                ].map((item) => (
                  <div key={item.key} onClick={() => toggleDisease(item.key)} className="flex items-center gap-2 cursor-pointer">
                    <span className="text-[18px] font-semibold text-[#121212]">
                      {item.label}
                    </span>
                    <div className="w-[32px] h-[32px] flex items-center justify-center">
                      <div className={`w-[24px] h-[24px] border rounded-sm flex items-center justify-center ${chronicDiseases[item.key]
                        ? "bg-[#468EEC] border-[#468EEC]"
                        : "border-[#C7C7C7]"
                        }`}>
                        {chronicDiseases[item.key] && (
                          <Check size={16} color="white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Upload */}
          <div className="bg-white rounded-[16px] shadow p-6">
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />

            <div onClick={handleFileClick} className="border-dashed border p-10 text-center cursor-pointer">
              <Upload className="mx-auto text-[#468EEC]" size={40} />
              {selectedFile && <p>{selectedFile.name}</p>}
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center">

            <button onClick={handleContinue} disabled={loading} className="w-[180px] h-[52px] bg-[#468EEC] text-white rounded-lg">
              {
                loading ? "جارٍ الحفظ..." : "استمرار"
              }
            </button>

          </div>
          <AuthMessageModal

            open={modal.open}

            title={modal.title}

            message={modal.message}

            type={modal.type}

            onClose={() =>
              setModal({
                ...modal,
                open: false,
              })
            }
          />

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="hidden lg:flex flex-1 flex-col items-center justify-center"
        style={{
          background: "linear-gradient(180deg, #003B88 45%, #1DA1F2 100%)",
        }}
      >
        <img src={rafiqLogo} className="w-[200px] mb-6" />
        <img src={robot} className="w-[500px] h-[500px]" />
        <h2 className="font-changa text-[40px] text-white text-center mt-6">
          مرحباً بك في رحلة صحية آمنة
        </h2>
      </div>

    </div>
  );
};

export default CompleteProfile;