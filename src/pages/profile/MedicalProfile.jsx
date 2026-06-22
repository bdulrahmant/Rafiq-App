import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";
import { updateMedicalProfile } from "../../api/patient.api";
import Footer from "../../components/layout/Footer";
// import { Button } from "../../components/ui/button";
import { Button } from "../../components/ui/Button";
import SuccessModal from "../../components/ui/SuccessModal";
import AuthMessageModal from "../../components/ui/AuthMessageModal";



const BLOOD_TYPES = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const DISEASE_OPTIONS = [
  { id: "pressure", label: "ضغط" },
  { id: "diabetes", label: "سكر" },
  { id: "heart", label: "قلب" },
  { id: "asthma", label: "ربو" },
  { id: "immunity", label: "مناعة" },
  { id: "none", label: "لا يوجد" },
];

const NONE_LABEL = "لا يوجد";

function chronicObjectToLabels(obj) {
  if (!obj || typeof obj !== "object") return [];
  const out = [];
  if (obj.pressure) out.push("ضغط");
  if (obj.diabetes) out.push("سكر");
  if (obj.heart) out.push("قلب");
  if (obj.asthma) out.push("ربو");
  if (obj.immunity) out.push("مناعة");
  if (obj.none) out.push(NONE_LABEL);
  return out;
}

function normalizeDiseasesList(arr) {
  return [...(arr || [])].filter(Boolean).sort();
}

function diseasesEqual(a, b) {
  const x = normalizeDiseasesList(a).join("|");
  const y = normalizeDiseasesList(b).join("|");
  return x === y;
}

export default function MedicalProfile() {
  const navigate = useNavigate();

  const initialSnapshotRef = useRef({
    height: "",
    weight: "",
    diseases: [],
    allergies: "",
    bloodType: "",
  });

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [allergies, setAllergies] = useState("");
  const [bloodType, setBloodType] = useState("");

  const [modal, setModal] = useState({ open: false, title: "", message: "", type: "error" });

  useEffect(() => {
    let saved = {};
    try {
      const raw = localStorage.getItem("patientProfile");
      if (raw) saved = JSON.parse(raw);
    } catch {
      saved = {};
    }

    const loadedHeight = saved.height != null ? String(saved.height) : "";
    const loadedWeight = saved.weight != null ? String(saved.weight) : "";
    const fromChronic = chronicObjectToLabels(saved.chronicDiseases);
    const loadedDiseases =
      Array.isArray(saved.medicalDiseases) && saved.medicalDiseases.length
        ? saved.medicalDiseases
        : fromChronic;
    const loadedAllergies =
      saved.allergies != null ? String(saved.allergies) : "";
    const loadedBlood =
      saved.bloodType != null ? String(saved.bloodType) : "";

    initialSnapshotRef.current = {
      height: loadedHeight,
      weight: loadedWeight,
      diseases: normalizeDiseasesList(loadedDiseases),
      allergies: loadedAllergies,
      bloodType: loadedBlood,
    };


    setHeight(loadedHeight);
    setWeight(loadedWeight);
    setDiseases(loadedDiseases.length ? [...loadedDiseases] : []);
    setAllergies(loadedAllergies);
    setBloodType(loadedBlood);
  }, []);

  const toggleDisease = (label) => {
    if (label === NONE_LABEL) {
      setDiseases([NONE_LABEL]);
      return;
    }

    setDiseases((prev) => {
      const filtered = prev.filter((d) => d !== NONE_LABEL);
      if (filtered.includes(label)) {
        return filtered.filter((d) => d !== label);
      }
      return [...filtered, label];
    });
  };

  const handleSubmit = async () => {

    const initial = initialSnapshotRef.current;

    const hasChanges =
      height !== initial.height ||
      weight !== initial.weight ||
      !diseasesEqual(diseases, initial.diseases) ||
      allergies !== initial.allergies ||
      bloodType !== initial.bloodType;

    if (!hasChanges) {

      setModal({
        open: true,
        title: "لا توجد تعديلات",
        message: "لم تقم بإجراء أي تغييرات على البيانات",
        type: "error",
      });

      return;
    }

    if (!height || !weight) {

      setModal({
        open: true,
        title: "بيانات غير مكتملة",
        message: "يرجى إدخال الطول والوزن",
        type: "error",
      });

      return;
    }

    try {

      const payload = {

        chronicDiseases: diseases,

        allergy: allergies,

        bloodType: bloodType,

        height: Number(height),

        weight: Number(weight),
      };

      const response =
        await updateMedicalProfile(
          payload
        );

      console.log(
        "Medical Profile Updated:",
        response
      );

      initialSnapshotRef.current = {
        height,
        weight,
        diseases: normalizeDiseasesList(diseases),
        allergies,
        bloodType,
      };

      setModal({
        open: true,
        title: "تم بنجاح",
        message:
          response?.message ||
          "تم تحديث البيانات بنجاح",
        type: "success",
      });

    }

    catch (error) {

      console.log(
        "Medical Profile Error:",
        error?.response?.data || error
      );

      setModal({
        open: true,
        title: "فشل التحديث",
        message:
          error?.response?.data?.message ||
          "حدث خطأ أثناء تحديث الملف الطبي",
        type: "error",
      });
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F7FBFF] font-cairo flex flex-col"
    >
      {/* <SuccessModal isOpen={showModal} onClose={handleCloseModal} /> */}

      <main className="flex-1 w-full">
        <div className="w-full border-gray-200/80">
          <div className="container mx-auto flex justify-between max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-5 sm:pt-10 sm:pb-6">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-2xl sm:text-3xl font-changa font-bold text-gray-900">
                تعديل الملف الطبي
              </h1>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-lg bg-[#468EEC] flex items-center justify-center hover:bg-[#3A7AD9] transition-colors shrink-0"
                aria-label="رجوع"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 lg:p-10 shadow-lg">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <div>
                <label
                  htmlFor="med-weight"
                  className="mb-2 block text-right text-sm font-semibold text-gray-800"
                >
                  الوزن<span className="text-red-500">*</span>
                </label>
                <input
                  id="med-weight"
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="78 KG"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-right outline-none transition-all focus:border-[#468EEC] focus:ring-2 focus:ring-[#468EEC]/20"
                />
              </div>
              <div>
                <label
                  htmlFor="med-height"
                  className="mb-2 block text-right text-sm font-semibold text-gray-800"
                >
                  الطول<span className="text-red-500">*</span>
                </label>
                <input
                  id="med-height"
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="180 CM"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-right outline-none transition-all focus:border-[#468EEC] focus:ring-2 focus:ring-[#468EEC]/20"
                />
              </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-10">
              <h2 className="mb-4 text-right text-base font-bold text-gray-800 font-changa">
                الأمراض المزمنة
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {DISEASE_OPTIONS.map(({ id, label }) => {
                  const checked = diseases.includes(label);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleDisease(label)}
                      className={`flex items-center justify-end gap-3 rounded-2xl border px-4 py-3 text-right text-sm font-semibold transition-all ${checked
                        ? "border-[#468EEC] bg-[#468EEC]/10 text-[#468EEC]"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                        }`}
                    >
                      <span>{label}</span>
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${checked
                          ? "border-[#468EEC] bg-[#468EEC]"
                          : "border-gray-300 bg-white"
                          }`}
                      >
                        {checked && (
                          <Check
                            className="h-3.5 w-3.5 text-white"
                            strokeWidth={3}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-10">
              <label
                htmlFor="med-allergies"
                className="mb-2 block text-right text-sm font-semibold text-gray-800"
              >
                الحساسية
              </label>
              <input
                id="med-allergies"
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="الفول السوداني"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-right outline-none transition-all focus:border-[#468EEC] focus:ring-2 focus:ring-[#468EEC]/20"
              />
            </div>

            <div className="mt-10 border-t border-gray-100 pt-10">
              <label
                htmlFor="med-blood"
                className="mb-2 block text-right text-sm font-semibold text-gray-800"
              >
                فصيلة الدم
              </label>
              <div className="relative">
                <select
                  id="med-blood"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 py-3.5 pr-4 pl-12 text-right outline-none transition-all focus:border-[#468EEC] focus:ring-2 focus:ring-[#468EEC]/20"
                >
                  <option value="">اختر فصيلة الدم</option>
                  {BLOOD_TYPES.map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center pb-4 sm:pb-6">
            <Button
              type="button"
              variant="primary"
              className="w-full max-w-2xl py-4 rounded-2xl text-lg font-bold shadow-md"
              onClick={handleSubmit}
            >
              حفظ التعديلات
            </Button>
          </div>
          <AuthMessageModal
            open={modal.open}
            title={modal.title}
            message={modal.message}
            type={modal.type}
            onClose={() => {
              setModal({
                ...modal,
                open: false,
              });

              if (modal.type === "success") {
                navigate("/profile");
              }
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
