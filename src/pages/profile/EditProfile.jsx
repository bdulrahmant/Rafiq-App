import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import Footer from "../../components/layout/Footer";
// import { Button } from "../../components/ui/button";
import SuccessModal from "../../components/ui/SuccessModal";
import { updateUserProfile } from "../../api/patient.api";
import AuthMessageModal from "../../components/ui/AuthMessageModal";


const MAX_AVATAR_BYTES = 800 * 1024;

// function readFileAsDataUrl(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = () => reject(new Error("read failed"));
//     reader.readAsDataURL(file);
//   });
// }

export default function EditProfile() {
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);
  const previewBlobRef = useRef(null);
  const initialSnapshotRef = useRef({
    fullName: "",
    email: "",
    phone: "",
    gender: "male",
    avatarUrl: null,
    profileImage: null,
  });

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({ open: false, title: "", message: "", type: "error" });

  const revokeBlobPreview = () => {
    if (previewBlobRef.current) {
      URL.revokeObjectURL(previewBlobRef.current);
      previewBlobRef.current = null;
    }
  };

  useEffect(() => {
    let saved = {};
    try {
      const raw = localStorage.getItem("patientProfile");
      if (raw) saved = JSON.parse(raw);
    } catch {
      saved = {};
    }

    let loadedGender = "male";
    if (saved.gender === "female" || saved.gender === "أنثى") {
      loadedGender = "female";
    } else if (saved.gender === "male" || saved.gender === "ذكر") {
      loadedGender = "male";
    }

    const loadedAvatar =
      saved.avatarUrl && typeof saved.avatarUrl === "string"
        ? saved.avatarUrl
        : null;

    initialSnapshotRef.current = {
      fullName: saved.fullName ?? "",
      email: saved.email ?? "",
      phone: saved.phone ?? "",
      gender: loadedGender,
      avatarUrl: loadedAvatar,
      profileImage: null,
    };

    setFullName(initialSnapshotRef.current.fullName);
    setEmail(initialSnapshotRef.current.email);
    setPhone(initialSnapshotRef.current.phone);
    setGender(initialSnapshotRef.current.gender);
    setProfileImage(null);

    if (loadedAvatar) {
      revokeBlobPreview();
      setImagePreview(loadedAvatar);
    } else {
      setImagePreview(null);
    }
  }, []);

  useEffect(() => {
    return () => revokeBlobPreview();
  }, []);

  const openAvatarPicker = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!/^image\/(jpeg|png)$/i.test(file.type)) {
      alert("يُسمح فقط بملفات JPG أو PNG");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      alert("حجم الصورة يجب ألا يتجاوز 800 كيلوبايت");
      return;
    }

    revokeBlobPreview();
    const url = URL.createObjectURL(file);
    previewBlobRef.current = url;
    setProfileImage(file);
    setImagePreview(url);
  };

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    navigate("/patient-home");
  }, [navigate]);

  const handleSubmit = async () => {

    const initial =
      initialSnapshotRef.current;

    const hasChanges =

      fullName !==
      initial.fullName ||

      email !==
      initial.email ||

      phone !==
      initial.phone ||

      gender !==
      initial.gender ||

      profileImage !==
      initial.profileImage ||

      (imagePreview ||
        null) !==

      (initial.avatarUrl ||
        null);

    if (!hasChanges) {

      setModal({

        open: true,

        title:
          "لا توجد تعديلات",

        message:
          "لم تقم بإجراء أي تغييرات على البيانات",

        type:
          "error",
      });

      return;
    }

    if (!fullName?.trim()) {

      setModal({

        open: true,

        title:
          "بيانات غير مكتملة",

        message:
          "يرجى إدخال الاسم بالكامل",

        type:
          "error",
      });

      return;
    }

    if (!email?.trim()) {

      setModal({

        open: true,

        title:
          "بيانات غير مكتملة",

        message:
          "يرجى إدخال البريد الإلكتروني",

        type:
          "error",
      });

      return;
    }

    try {

      const formData =
        new FormData();

      formData.append(
        "Name",
        fullName
      );

      formData.append(
        "Email",
        email
      );

      formData.append(
        "PhoneNumber",
        phone || ""
      );

      formData.append(
        "Gender",
        gender || ""
      );

      formData.append(
        "Age",
        "23"
      );

      if (profileImage) {

        formData.append(
          "Image",
          profileImage
        );
      }

      await updateUserProfile(
        formData
      );

      setModal({

        open: true,

        title:
          "تم بنجاح",

        message:
          "تم تحديث البيانات بنجاح",

        type:
          "success",
      });

    }

    catch (error) {

      console.log(
        "Update Error:",
        error?.response
          ?.data || error
      );

      setModal({

        open: true,

        title:
          "فشل التحديث",

        message:

          error?.response
            ?.data?.message ||

          error?.response
            ?.data ||

          "حدث خطأ أثناء تحديث البيانات",

        type:
          "error",
      });
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F7FBFF] font-cairo flex flex-col"
    >
      <SuccessModal isOpen={showModal} onClose={handleCloseModal} />

      <main className="flex-1 w-full">
        <div className="w-full border-gray-200/80 ">
          <div className="container mx-auto flex justify-start max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-5 sm:pt-10 sm:pb-6">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-2xl sm:text-3xl font-changa font-bold text-gray-900">
                تعديل الملف الشخصي
              </h1>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-lg bg-[#468EEC] flex items-center justify-center  hover:bg-[#3A7AD9] transition-colors shrink-0"
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
          <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 lg:p-10 shadow-lg space-y-10">
            <div>
              <h2 className="text-lg font-changa font-bold text-[#468EEC] mb-6 text-right">
                الصورة الشخصية
              </h2>

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleAvatarChange}
                aria-hidden="true"
              />

              <div className="flex flex-row flex-wrap items-center gap-6 sm:gap-10 justify-start">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#E8F2FE] border-2 border-[#468EEC]/20 flex items-center justify-center overflow-hidden shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="الصورة الشخصية"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User
                      className="w-14 h-14 sm:w-16 sm:h-16 text-[#468EEC]/70"
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                <div className="flex flex-col items-end gap-4 text-right min-w-[200px] flex-1">
                  <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                    يسمح بملفات JPG او PNG بحد اقصى 800KB
                  </p>
                  <button
                    type="button"
                    variant="outline"
                    size="md"
                    className="border-[#468EEC] text-[#468EEC] hover:bg-[#468EEC]/10"
                    onClick={openAvatarPicker}
                  >
                    رفع صورة
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-10">
              <h2 className="text-xl font-changa font-bold text-gray-800 mb-8 text-right">
                المعلومات الشخصية
              </h2>

              <div className="space-y-6 max-w-none">
                <div>
                  <label
                    htmlFor="edit-fullName"
                    className="block text-sm font-semibold text-gray-800 mb-2 text-right"
                  >
                    الاسم بالكامل<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="edit-fullName"
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="محمد طه"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:border-[#468EEC] focus:ring-2 focus:ring-[#468EEC]/20 outline-none transition-all text-right"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-email"
                    className="block text-sm font-semibold text-gray-800 mb-2 text-right"
                  >
                    البريد الإلكتروني<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="edit-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="MohamedTaha@gmail.com"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:border-[#468EEC] focus:ring-2 focus:ring-[#468EEC]/20 outline-none transition-all text-right"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-phone"
                    className="block text-sm font-semibold text-gray-800 mb-2 text-right"
                  >
                    رقم الهاتف<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="edit-phone"
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 01289463174"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white focus:border-[#468EEC] focus:ring-2 focus:ring-[#468EEC]/20 outline-none transition-all text-right"
                  />
                </div>

                <div>
                  <span className="block text-sm font-semibold text-gray-800 mb-2 text-right">
                    الجنس<span className="text-red-500">*</span>
                  </span>
                  <div className="flex gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => setGender("male")}
                      className={`flex-1 py-3.5 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 border-2 ${gender === "male"
                        ? "border-[#468EEC] text-[#468EEC] bg-white shadow-sm"
                        : "border-gray-200 text-gray-500 bg-gray-50 hover:bg-gray-100"
                        }`}
                    >
                      <svg
                        className="w-5 h-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      ذكر
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender("female")}
                      className={`flex-1 py-3.5 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 border-2 ${gender === "female"
                        ? "border-[#468EEC] text-[#468EEC] bg-white shadow-sm"
                        : "border-gray-200 text-gray-500 bg-gray-50 hover:bg-gray-100"
                        }`}
                    >
                      <svg
                        className="w-5 h-5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      أنثى
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center pb-4 sm:pb-6">
            <button
              type="button"
              variant="primary"
              className="w-full max-w-2xl py-4 rounded-2xl text-lg font-bold shadow-md"
              onClick={handleSubmit}
            >
              حفظ التعديلات
            </button>
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
