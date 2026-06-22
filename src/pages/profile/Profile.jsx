import { Link } from "react-router-dom";
import { ArrowRight, User, CalendarDays, Activity, Scale, Ruler, Droplet, FileText, Syringe, Pill, FilePlus2 } from "lucide-react";
// import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../api/patient.api";
import { useEffect, useState } from "react";


export default function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        age: "",
        gender: "ذكر",
        weight: "80 كجم",
        height: "175 سم",
        bloodType: "A+",
    });

    useEffect(() => {

        const fetchProfile =
            async () => {

                try {

                    const data =
                        await getUserProfile();

                    console.log(
                        "Profile Data:",
                        data
                    );

                    setUser({
                        name:
                            data.fullName || "",

                        age:
                            data.age || "",

                        gender: "ذكر",

                        weight: "80 كجم",

                        height: "175 سم",

                        bloodType: "A+",
                    });

                }

                catch (error) {

                    console.log(
                        error
                    );
                }
            };

        fetchProfile();

    }, []);

    return (
        <div className={cn("min-h-screen bg-[#F7FBFF] font-cairo text-[#121212] flex flex-col")} dir="rtl">


            {/* Main */}
            <main className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 xl:px-24 py-8 flex-1 w-full">

                {/* Header */}

                <div className="w-full lg:w-[1000px] flex flex-col gap-6 shrink-0 ">
                    <div className="container mx-auto flex justify-between max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-5 sm:pt-10 sm:pb-6">
                        <div className="flex items-center justify-between gap-3">
                            <h1 className="text-2xl sm:text-3xl font-changa font-bold text-gray-900">
                                ملفي الشخصي
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


                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar */}
                    <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">

                        {/* Settings */}
                        <Card className="rounded-2xl shadow-sm p-6 flex flex-col gap-4 border-none bg-white">
                            <h2 className="font-changa font-semibold text-xl text-right">
                                الاعدادات
                            </h2>

                            <div className="flex flex-col gap-3">
                                <Link to="/edit-profile" className="bg-[#468EEC] text-white py-3 rounded-lg text-center font-semibold hover:bg-[#3A7AD9] transition-all">
                                    تعديل الملف الشخصي
                                </Link>

                                <Link to="/medical-profile" className="border border-[#468EEC] text-[#468EEC] py-3 rounded-lg text-center font-semibold hover:bg-blue-50 transition-all bg-white">
                                    تعديل الملف الطبي
                                </Link>

                                <Link to="/change-password" className="border border-[#FF9933] text-[#FF9933] py-3 rounded-lg text-center font-semibold hover:bg-orange-50 transition-all bg-white">
                                    تغير كلمة المرور
                                </Link>

                                <Link
                                    to="/saved-articles"
                                    className="border border-green-600 text-green-600 py-3 rounded-lg text-center w-full hover:bg-green-50 transition-all block font-semibold"
                                >
                                    المقالات المفضلة
                                </Link>

                                <button
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        localStorage.removeItem("role");

                                        navigate("/login");
                                    }}
                                    className="border border-red-600 text-red-600 py-3 rounded-lg text-center w-full hover:bg-red-50 transition-all block font-semibold"
                                >
                                    تسجيل الخروج
                                </button>
                            </div>
                        </Card>

                        {/* Upload */}
                        <Card className="rounded-2xl shadow-sm p-6 flex flex-col gap-4 border-none bg-white">
                            <div className="flex justify-between items-center">
                                <span
                                    onClick={() => navigate("/files")}
                                    className="text-[#468EEC] text-sm cursor-pointer hover:underline font-medium"
                                >
                                    عرض الكل
                                </span>                                <h2 className="font-semibold text-lg text-right">
                                    الملفات الطبية
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-2">
                                {/* File 1 */}
                                <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center gap-2 text-center shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-red-50 p-2.5 rounded-xl text-red-400">
                                        <Syringe className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-sm text-[#121212]">تحاليل دم</span>
                                    <span className="text-[10px] text-gray-500">ديسمبر 2025</span>
                                </div>
                                {/* File 2 */}
                                <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center gap-2 text-center shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-blue-50 p-2.5 rounded-xl text-[#468EEC]">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-sm text-[#121212]">روشتة طبية</span>
                                    <span className="text-[10px] text-gray-500">ديسمبر 2025</span>
                                </div>
                                {/* File 3 */}
                                <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center gap-2 text-center shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-blue-50 p-2.5 rounded-xl text-[#468EEC]">
                                        <Pill className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-sm text-[#121212]">روشتة طبية</span>
                                    <span className="text-[10px] text-gray-500">ديسمبر 2025</span>
                                </div>
                                {/* File 4 */}
                                <div className="border border-gray-100 rounded-xl p-3 flex flex-col items-center gap-2 text-center shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-green-50 p-2.5 rounded-xl text-green-500">
                                        <FilePlus2 className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-sm text-[#121212]">تقرير طبي</span>
                                    <span className="text-[10px] text-gray-500">ديسمبر 2025</span>
                                </div>
                            </div>

                            <Link
                                to="/upload-file"
                                className="py-3 mt-1 rounded-lg text-center w-full bg-[#468EEC] text-white block font-semibold hover:opacity-90 transition"
                            >
                                رفع ملف طبي
                            </Link>
                        </Card>

                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col gap-6 min-w-0">

                        {/* Personal Info */}
                        <Card className="rounded-2xl shadow-sm p-6 lg:p-8 border-none bg-white">
                            <h2 className="font-semibold text-xl text-right mb-8">
                                المعلومات الشخصية
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 text-center">
                                <Info label="الاسم" value={user.name} iconColor="bg-blue-100/50 text-[#468EEC]" Icon={User} />
                                <Info label="العمر" value={`${user.age} سنة`} iconColor="bg-emerald-100/50 text-emerald-500" Icon={CalendarDays} />
                                <Info label="الجنس" value={user.gender} iconColor="bg-purple-100/50 text-purple-500" Icon={Activity} />
                                <Info label="الوزن" value={user.weight} iconColor="bg-orange-100/50 text-orange-400" Icon={Scale} />
                                <Info label="الطول" value={user.height} iconColor="bg-blue-100/50 text-[#468EEC]" Icon={Ruler} />
                                <Info label="فصيلة الدم" value={user.bloodType} iconColor="bg-red-100/50 text-red-400" Icon={Droplet} />
                            </div>
                        </Card>

                        {/* Diseases */}
                        <Card className="rounded-2xl shadow-sm p-6 lg:p-8 border-none bg-white">
                            <h2 className="font-semibold text-xl text-right mb-6">
                                الامراض المزمنة
                            </h2>

                            <div className="flex flex-wrap gap-4 justify-end">
                                <Badge variant="outline" className={cn("px-6 py-2 border border-blue-400 text-blue-500 rounded-lg text-base bg-transparent font-medium")}>السكري</Badge>
                                <Badge variant="outline" className={cn("px-6 py-2 border border-orange-300 text-orange-400 rounded-lg text-base bg-transparent font-medium")}>حساسية الطعام</Badge>
                                <Badge variant="outline" className={cn("px-6 py-2 border border-red-500 text-red-600 rounded-lg text-base bg-transparent font-medium", "border-opacity-50 line-through decoration-transparent")}>ضغط الدم</Badge>
                            </div>

                            <div className="flex justify-start mt-6">
                                <button variant="outline" className="text-gray-500 border-gray-300 hover:bg-gray-50 font-cairo bg-white">
                                    اضافة مرض مزمن
                                </button>
                            </div>
                        </Card>

                        {/* History */}
                        <Card className="rounded-2xl shadow-sm p-6 lg:p-8 border-none bg-white">
                            <h2 className="font-semibold text-xl text-right mb-6">
                                التاريخ الطبي
                            </h2>

                            <div className="flex flex-col gap-4">
                                <div className="border border-gray-200 bg-[#F7FBFF]/60 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                                    <div className="absolute top-0 bottom-0 right-0 w-1 bg-[#468EEC]" />
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold text-[#121212] pr-2">عملية استئصال الزائدة الدودية</h3>
                                        <span className="text-gray-500 font-medium text-sm">2018</span>
                                    </div>
                                    <p className="text-gray-500 text-right text-sm pr-2">
                                        عملية جراحية بسيطة تمت بنجاح في مستشفى الملك فيصل
                                    </p>
                                </div>

                                <div className="border border-teal-200 bg-teal-50/40 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                                    <div className="absolute top-0 bottom-0 right-0 w-1 bg-teal-400" />
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold text-[#121212] pr-2">كسر في الذراع اليمنى</h3>
                                        <span className="text-gray-500 font-medium text-sm">2021</span>
                                    </div>
                                    <p className="text-gray-500 text-right text-sm pr-2">
                                        كسر بسيط تم علاجه بالجبس لمدة 6 اسابيع
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-start mt-6">
                                <button variant="outline" className="text-gray-500 border-gray-300 hover:bg-gray-50 font-cairo bg-white">
                                    اضافة تاريخ طبي
                                </button>
                            </div>

                        </Card>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

/* 🔹 Component */
function Info({ label, value, iconColor, Icon }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className={cn("w-14 h-14 rounded-full flex items-center justify-center", iconColor)}>
                {Icon && <Icon className="w-6 h-6 stroke-[1.5]" />}
            </div>
            <p className="text-gray-500 font-medium text-sm">{label}</p>
            <p className="font-bold text-[#121212]">{value}</p>
        </div>
    );
}