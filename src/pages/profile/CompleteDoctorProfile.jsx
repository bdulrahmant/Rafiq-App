
import { useRef, useState } from "react";
import {
  ChevronDown,
  Upload,
  User,
  CreditCard,
  Building,
  MapPin,
  Clock,
  Plus,
} from "lucide-react";

import DoctorSignupSuccess from "../../components/ui/DoctorSignupSuccess";
import DoctorIncompleteWarning from "../../components/ui/DoctorIncompleteWarning";
import AuthMessageModal from "../../components/ui/AuthMessageModal";
import { updateClinicInfo, updateDoctorProfile } from "../../api/doctors.api";
import balto from "../../assets/balto.png";
import rafiqLogo from "../../assets/rafiq-white-logo.png";


const CompleteDoctorProfile = () => {
  const personalPhotoRef = useRef(null);
  const certificatesRef = useRef(null);
  const licenseRef = useRef(null);
  const extraFilesRef = useRef(null);

  // files
  const [photoFile, setPhotoFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [extraFiles, setExtraFiles] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);

  const [form, setForm] = useState({
    specialty: "",
    age: "",
    experience: "",
    licenseNumber: "",
    hospital: "",
    address: "",
    workFrom: "",
    price: "",
    bio: "",
  });

  const [, setLoading] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkFile = (file) => {
    const max = 10 * 1024 * 1024;
    if (file.size > max) {
      alert("حجم الملف يجب ألا يزيد عن 10 ميجا");
      return false;
    }
    return true;
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!checkFile(file)) return;
    setPhotoFile(file);
  };

  const handleCert = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!checkFile(file)) return;
    setCertFile(file);
  };

  const handleLicense = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!checkFile(file)) return;
    setLicenseFile(file);
  };

  const handleExtraFiles = (e) => {
    const files = Array.from(e.target.files);
    const valid = files.filter((f) => checkFile(f));
    setExtraFiles((prev) => [...prev, ...valid]);
  };

  const validateForm = () => {
    if (
      !form.specialty ||
      !form.age ||
      !form.experience ||
      !form.licenseNumber ||
      !form.hospital ||
      !form.address ||
      !form.workFrom ||
      !form.price
    ) {
      return false;
    }

    if (!photoFile) return false;
    if (!certFile) return false;
    if (!licenseFile) return false;

    return true;
  };


  // const handleSubmit = async () => {

  //   if (!validateForm()) {

  //     setModal({

  //       open: true,

  //       title:
  //         "بيانات غير مكتملة",

  //       message:
  //         "من فضلك أكمل جميع البيانات المطلوبة",

  //       type:
  //         "error",
  //     });

  //     return;
  //   }

  //   try {

  //     setLoading(true);

  //     // =========================
  //     // Logged User Data
  //     // =========================

  //     const user = JSON.parse(
  //       localStorage.getItem("user")
  //     );

  //     // =========================
  //     // 1) Update Clinic Info
  //     // =========================

  //     const clinicPayload = {

  //       medicalLicense:
  //         form.licenseNumber,

  //       clinicName:
  //         form.hospital,

  //       address:
  //         form.address,

  //       workHours:
  //         form.workFrom,

  //       price:
  //         Number(form.price),
  //     };

  //     console.log(
  //       "Clinic Payload:",
  //       clinicPayload
  //     );

  //     await updateClinicInfo(
  //       clinicPayload
  //     );

  //     // =========================
  //     // 2) Update Doctor Profile
  //     // =========================

  //     const profileFormData =
  //       new FormData();

  //     profileFormData.append(
  //       "FullName",
  //       user?.displayName ||
  //       "Doctor"
  //     );

  //     profileFormData.append(
  //       "Email",
  //       user?.email || ""
  //     );

  //     profileFormData.append(
  //       "Phone",
  //       "01000000000"
  //     );

  //     profileFormData.append(
  //       "Bio",
  //       form.bio || ""
  //     );

  //     if (photoFile) {

  //       profileFormData.append(
  //         "Image",
  //         photoFile
  //       );
  //     }

  //     console.log(
  //       "Profile FormData Ready"
  //     );

  //     await updateDoctorProfile(
  //       profileFormData
  //     );

  //     // =========================
  //     // 3) Upload Certificate
  //     // =========================

  //     if (certFile) {

  //       const certData =
  //         new FormData();

  //       certData.append(
  //         "File",
  //         certFile
  //       );

  //       certData.append(
  //         "FileType",
  //         "Certificate"
  //       );

  //       certData.append(
  //         "FileName",
  //         certFile.name
  //       );

  //       certData.append(
  //         "Notes",
  //         "Doctor Certificate"
  //       );

  //       await uploadFile(
  //         certData
  //       );
  //     }

  //     // =========================
  //     // 4) Upload License
  //     // =========================

  //     if (licenseFile) {

  //       const licenseData =
  //         new FormData();

  //       licenseData.append(
  //         "File",
  //         licenseFile
  //       );

  //       licenseData.append(
  //         "FileType",
  //         "License"
  //       );

  //       licenseData.append(
  //         "FileName",
  //         licenseFile.name
  //       );

  //       licenseData.append(
  //         "Notes",
  //         "Medical License"
  //       );

  //       await uploadFile(
  //         licenseData
  //       );
  //     }

  //     // =========================
  //     // 5) Upload Extra Files
  //     // =========================

  //     for (const file of extraFiles) {

  //       const extraData =
  //         new FormData();

  //       extraData.append(
  //         "File",
  //         file
  //       );

  //       extraData.append(
  //         "FileType",
  //         "Extra"
  //       );

  //       extraData.append(
  //         "FileName",
  //         file.name
  //       );

  //       extraData.append(
  //         "Notes",
  //         "Extra File"
  //       );

  //       await uploadFile(
  //         extraData
  //       );
  //     }

  //     setModal({

  //       open: true,

  //       title:
  //         "تم بنجاح",

  //       message:
  //         "تم حفظ بيانات الطبيب بنجاح",

  //       type:
  //         "success",
  //     });

  //     setTimeout(() => {

  //       setShowSuccess(true);

  //     }, 1000);

  //   }

  //   catch (error) {

  //     console.log(error);

  //     setModal({

  //       open: true,

  //       title:
  //         "فشل حفظ البيانات",

  //       message:

  //         error?.response
  //           ?.data
  //           ?.message ||

  //         "حدث خطأ أثناء حفظ البيانات",

  //       type:
  //         "error",
  //     });
  //   }

  //   finally {

  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {

    if (!validateForm()) {

      setModal({
        open: true,
        title: "بيانات غير مكتملة",
        message: "من فضلك أكمل جميع البيانات المطلوبة",
        type: "error",
      });

      return;
    }

    try {

      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      // =========================
      // 1) Update Clinic Info
      // =========================

      const clinicPayload = {

        medicalLicense:
          form.licenseNumber,

        clinicName:
          form.hospital,

        address:
          form.address,

        workHours:
          form.workFrom,

        price:
          Number(form.price),
      };

      await updateClinicInfo(
        clinicPayload
      );

      // =========================
      // 2) Update Doctor Profile
      // =========================

      const profileFormData =
        new FormData();

      profileFormData.append(
        "FullName",
        user?.displayName ||
        user?.fullName ||
        "Doctor"
      );

      profileFormData.append(
        "Email",
        user?.email || ""
      );

      profileFormData.append(
        "Phone",
        user?.phone || ""
      );

      profileFormData.append(
        "Bio",
        form.bio || ""
      );

      if (photoFile) {

        profileFormData.append(
          "Image",
          photoFile,
          photoFile.name
        );
      }

      await updateDoctorProfile(
        profileFormData
      );

      setModal({

        open: true,

        title:
          "تم بنجاح",

        message:
          "تم حفظ بيانات الطبيب بنجاح",

        type:
          "success",
      });

      setTimeout(() => {

        setShowSuccess(true);

      }, 1000);

    }

    catch (error) {

      console.log(error);

      setModal({

        open: true,

        title:
          "فشل حفظ البيانات",

        message:

          error?.response?.data?.message ||

          error?.response?.data ||

          "حدث خطأ أثناء حفظ البيانات",

        type:
          "error",
      });
    }

    finally {

      setLoading(false);
    }
  };

  return (
    <>
      <div
        // className="min-h-screen flex flex-row font-cairo bg-[#F7FBFF]"
        className="min-h-screen flex flex-row-reverse font-cairo bg-[#F7FBFF]"
        dir="rtl"
      >
        {/* Right Side */}
        <div className="w-full lg:w-[60%] xl:w-[55%] flex flex-col items-center p-4 lg:p-10 overflow-y-auto">
          <div className="w-full max-w-[808px] flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col items-end gap-4 text-right">
              {/* <h1 className="font-changa font-bold text-[40px] text-[#468EEC]"> */}
              <h1 className="w-full text-right font-changa font-bold text-[40px] text-[#468EEC]">
                أكمل ملفك الشخصي
              </h1>
              <p className="w-full text-right font-semibold text-[16px] text-[#5B5B5B]">
                أدخل بياناتك المهنية والشخصية للانضمام إلى منصتنا
              </p>
            </div>

            {/* ================= Card 1 ================= */}
            <div className="bg-white rounded-[16px] shadow-[0px_6px_4px_rgba(0,0,0,0.25)] p-6 lg:p-9 flex flex-col gap-4">
              <h2 className="font-changa font-semibold text-[28px] text-[#5B5B5B] text-right">
                المعلومات المهنية
              </h2>

              <div className="flex flex-col gap-2 items-end">
                <label className="w-full text-right text-[18px] font-semibold mb-2">
                  التخصص <span className="text-[#A00505]">*</span>
                </label>
                <div className="relative w-full">
                  <select
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    className="w-full h-[48px] px-3 border rounded-lg appearance-none"
                  >
                    <option value="">اختر التخصص</option>
                    <option value="قلب">قلب</option>
                    <option value="أسنان">أسنان</option>
                    <option value="عيون">عيون</option>
                  </select>
                  <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="flex flex-col gap-2 items-end flex-1">
                  <label className="w-full text-right text-[18px] font-semibold mb-2">
                    العمر <span className="text-[#A00505]">*</span>
                  </label>
                  <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full h-[48px] px-3 border rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-2 items-end flex-1">
                  <label className="w-full text-right text-[18px] font-semibold mb-2">
                    سنوات الخبرة <span className="text-[#A00505]">*</span>
                  </label>
                  <div className="relative w-full">
                    <select
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      className="w-full h-[48px] px-3 border rounded-lg appearance-none"
                    >
                      <option value="">اختر</option>
                      <option value="1-3">1-3 سنوات</option>
                      <option value="3-5">3-5 سنوات</option>
                      <option value="5-10">5-10 سنوات</option>
                      <option value="+10">+10 سنوات</option>
                    </select>
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <label className="w-full text-right text-[18px] font-semibold mb-2">
                  رقم الترخيص الطبي <span className="text-[#A00505]">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    name="licenseNumber"
                    value={form.licenseNumber}
                    onChange={handleChange}
                    className="w-full h-[48px] px-3 border rounded-lg pr-10"
                  />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C7C7C7]" />
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <label className="w-full text-right text-[18px] font-semibold mb-2">
                  المستشفى / العيادة <span className="text-[#A00505]">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    name="hospital"
                    value={form.hospital}
                    onChange={handleChange}
                    className="w-full h-[48px] px-3 border rounded-lg pr-10"
                  />
                  <Building className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C7C7C7]" />
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <label className="w-full text-right text-[18px] font-semibold mb-2">
                  العنوان <span className="text-[#A00505]">*</span>
                </label>
                <div className="relative w-full">
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full h-[48px] px-3 border rounded-lg pr-10"
                  />
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C7C7C7]" />
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <label className="w-full text-right text-[18px] font-semibold mb-0">
                  مواعيد العمل <span className="text-[#A00505]">*</span>
                </label>

                <div className="flex gap-5 w-full">
                  <div className="flex flex-col gap-2 items-end flex-1">
                    <label className="text-sm text-[#5B5B5B]">من</label>

                    <div className="relative w-full">
                      <input
                        type="time"
                        name="workFrom"
                        value={form.workFrom}
                        onChange={handleChange}
                        className="w-full h-[48px] px-3 border rounded-lg pr-10 text-right"
                      />
                      <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C7C7C7]" />
                    </div>
                  </div>

                  {/* الى (شمال) */}
                  <div className="flex flex-col gap-2 items-end flex-1">
                    <label className="text-sm text-[#5B5B5B]">الى</label>

                    <div className="relative w-full">
                      <input
                        type="time"
                        className="w-full h-[48px] px-3 border rounded-lg pr-10 text-right"
                      />
                      <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C7C7C7]" />
                    </div>
                  </div>

                </div>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <label className="w-full text-right text-[18px] font-semibold mb-2">
                  سعر الكشف <span className="text-[#A00505]">*</span>
                </label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="مثال : 150 جنيه"
                  className="w-full h-[48px] px-3 border rounded-lg"
                />
              </div>
            </div>

            {/* ================= Card 2 ================= */}

            <div className="bg-white rounded-[16px] shadow-[0px_6px_4px_rgba(0,0,0,0.25)] p-6 lg:p-9 flex flex-col gap-6">

              <h2 className="font-changa font-semibold text-[28px] text-[#5B5B5B] text-right">
                الصورة الشخصية
              </h2>

              <input
                ref={personalPhotoRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhoto}
              />

              {/* الجزء المتظبط */}
              <div className="w-full flex justify-end">
                <div className="flex items-center gap-40 justify-end w-full">

                  {/* الصورة (يمين خالص) */}
                  <div className="w-24 h-24 bg-[#DBEAFE] rounded-full flex items-center justify-center shrink-0">
                    <User className="text-[#468EEC]" size={40} />
                  </div>

                  {/* النص */}
                  <div className="flex flex-col items-end text-right gap-2 max-w-[300px]">
                    <button
                      type="button"
                      onClick={() => personalPhotoRef.current.click()}
                      className="bg-[#F5F5F5] text-[#468EEC] px-5 py-2 rounded-lg font-semibold"
                    >
                      رفع صورة شخصية مهنية
                    </button>

                    {photoFile && (
                      <span className="text-sm text-[#468EEC]">
                        {photoFile.name}
                      </span>
                    )}

                    <p className="text-[#5B5B5B] font-semibold text-[16px]">
                      الصورة تساعد المرضى على التعرف عليك
                    </p>
                  </div>

                </div>
              </div>

              {/* نبذة */}
              <div className="flex flex-col gap-2 items-end">
                <label className="w-full text-right text-[18px] font-semibold mb-2">
                  أضف نبذة عنك
                </label>

                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full h-[176px] p-3 border rounded-[16px] resize-none text-right"
                  placeholder="عرّف بنفسك هنا كطبيب..."
                />
              </div>

            </div>


            {/* ================= Card 3 ================= */}
            <div className="bg-white rounded-[16px] shadow-[0px_6px_4px_rgba(0,0,0,0.25)] p-6 lg:p-9 flex flex-col gap-6">
              <h2 className="font-changa font-semibold text-[28px] text-[#5B5B5B] text-right">
                لتوثيق الحساب
              </h2>

              <p className="text-[#5B5B5B] font-semibold text-[16px] text-right">
                رفع الشهادات يساعد المرضى على الوثوق بملفك المهني
              </p>


              <input
                ref={certificatesRef}
                type="file"
                accept="image/*,.pdf"
                hidden
                onChange={handleCert}
              />

              <input
                ref={licenseRef}
                type="file"
                accept="image/*,.pdf"
                hidden
                onChange={handleLicense}
              />

              <input
                ref={extraFilesRef}
                type="file"
                accept="image/*,.pdf"
                hidden
                multiple
                onChange={handleExtraFiles}
              />

              <div className="flex gap-8">
                <div
                  onClick={() => certificatesRef.current.click()}
                  className="flex-1 border border-dashed rounded-[16px] p-6 flex flex-col items-center justify-center gap-3 cursor-pointer"
                >
                  <Upload className="text-[#468EEC]" />
                  <p className="font-semibold">رفع الشهادات الطبية</p>
                  {certFile && (
                    <span className="text-sm text-[#468EEC]">
                      {certFile.name}
                    </span>
                  )}
                </div>

                <div
                  onClick={() => licenseRef.current.click()}
                  className="flex-1 border border-dashed rounded-[16px] p-6 flex flex-col items-center justify-center gap-3 cursor-pointer"
                >
                  <CreditCard className="text-[#468EEC]" />
                  <p className="font-semibold">رفع بطاقة الترخيص</p>
                  {licenseFile && (
                    <span className="text-sm text-[#468EEC]">
                      {licenseFile.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div className="flex gap-6 justify-center items-center flex-wrap">

                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      onClick={() => extraFilesRef.current.click()}
                      className="w-[84px] h-[84px] bg-[#DBEAFE] rounded-[16px] flex  items-center justify-center cursor-pointer hover:bg-[#cce0fd]"
                    >
                      <Plus className="text-[#468EEC]" size={32} />
                    </div>
                  ))}
                </div>

                {extraFiles.length > 0 && (
                  <div className="text-right text-sm text-[#468EEC]">
                    {extraFiles.map((f, i) => (
                      <div key={i}>{f.name}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 mb-10">
              <button
                onClick={handleSubmit}
                className="w-[180px] h-[52px] bg-[#468EEC] text-white rounded-lg font-semibold"
              >
                حفظ وإكمال
              </button>

              <button
                onClick={() => setShowIncomplete(true)}
                className="text-[#468EEC] font-semibold hover:underline"
              >
                سأقوم بالإكمال لاحقًا
              </button>
            </div>
          </div>
        </div>

        {/* Left side */}
        {/* <div className="hidden lg:flex flex-1 bg-gradient-to-b from-[#003B88] to-[#1DA1F2] items-center justify-center"> */}
        <div className="hidden lg:flex flex-1 items-center justify-center"
          style={{ background: "linear-gradient(180deg, #003B88 45%, #1DA1F2 100%)" }}
        >

          <div className="flex flex-col items-center text-center px-10">
            <img
              src={rafiqLogo}
              alt="logo"
              className="w-[180px] mb-6"
            />
            <div className="mb-8 w-72 h-72 lg:w-[500px] lg:h-[500px] flex items-center justify-center">
              <img
                src={balto}
                alt="balto"
                // className="w-full h-full object-contain"
                className="w-full h-full object-contain scale-x-[-1]"
              />
            </div>

            <h2 className="font-changa font-semibold text-[40px] text-white mb-4">
              انضم إلى منصتنا الطبية
            </h2>

            <p className="font-semibold text-[16px] text-[#DBEAFE] max-w-md">
              ابدأ رحلتك معنا وقدم خدمات طبية متميزة لآلاف المرضى
            </p>
          </div>
        </div>
      </div>

      {showSuccess && (
        <DoctorSignupSuccess onClose={() => setShowSuccess(false)} />
      )}

      {showIncomplete && (
        <DoctorIncompleteWarning
          onClose={() => setShowIncomplete(false)}
          onGoUpload={() => setShowIncomplete(false)}
        />
      )}
      <AuthMessageModal

        isOpen={modal.open}

        onClose={() =>

          setModal((prev) => ({
            ...prev,
            open: false,
          }))

        }

        title={modal.title}

        message={modal.message}

        type={modal.type}
      />
    </>
  );
};

export default CompleteDoctorProfile;


