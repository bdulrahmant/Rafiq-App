import {
  User,
  Building2,
  ShieldCheck,
  Bell,
  KeyRound,
  Star,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorProfile } from "../../../../../../api/doctors.api";

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const { data } = await getDoctorProfile();

      console.log("Doctor Profile:", data);

      setProfile(data);
    } catch (error) {
      console.log("Get Profile Error:", error);
    }
  };

  fetchProfile();
}, []);
  return (
    <div
      dir="rtl"
      className="bg-blue-50 min-h-screen p-4 md:p-10 text-[#334155] font-sans antialiased"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Title Section */}
        <div className="text-center md:text-right space-y-1">
          <h1 className="text-[40px] font-bold text-[#4B8EF7] tracking-tight">
            الملف الشخصي
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            إدارة بياناتك الشخصية وإعدادات العيادة
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Spacer on the right to keep info centered on desktop */}
          <div className="hidden md:block w-24"></div>
          
          {/* Doctor Info */}
          <div className="text-center md:text-right space-y-1.5 flex-1 md:mr-12">
              <h2 className="font-bold text-2xl text-slate-800">
                د. {profile?.fullName || "جاري التحميل..."}
              </h2>
            <p className="text-[#4B8EF7] font-semibold text-base">
              استشاري جراحة العظام
            </p>
            <div className="flex justify-center md:justify-start items-center gap-1.5 text-sm mt-3">
              <span className="text-slate-400 font-medium">
                ({profile?.appointmentsCount || 0} حجز)
              </span>
              <div className="flex items-center">
                <Star size={16} fill="#FBBF24" color="#FBBF24" />
              </div>
              <span className="text-slate-700 font-bold">4.8</span>
            </div>
          </div>

          {/* Avatar Area (Left Side) */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-[#EBF3FF] border border-blue-100 flex items-center justify-center overflow-hidden">
              <User size={56} className="text-[#4B8EF7] opacity-90 mt-3" />
            </div>
            <button className="absolute bottom-0 left-0 bg-[#4B8EF7] text-white p-2 rounded-full border-2 border-white shadow-md hover:bg-blue-600 transition-all">
              <Camera size={12} fill="white" />
            </button>
          </div>
        </div>

        {/* Middle Section: Personal & Clinic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Personal Info Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/50 p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <User size={20} className="text-[#4B8EF7]" />
                <h3 className="font-bold text-lg text-slate-800">
                  المعلومات الشخصية
                </h3>
              </div>
                    <button
                      onClick={() => navigate("/doctor/settings/profile")}
                      className="text-[#4B8EF7] text-sm font-semibold hover:text-blue-600 transition"
                    >
                      تعديل البيانات
                    </button>
            </div>

            <div className="space-y-6">
              <Info title="الاسم الكامل"value={profile?.fullName || "-"}/>
              <Info title="البريد الإلكتروني" value="غير متاح"  />
              <Info title="رقم الهاتف" value="غير متاح" />
              <Info title="التخصص" value="عظام "/>
              <Info title="سنوات الخبرة" value={profile?.age || 0} />
            </div>
          </div>

          {/* Clinic Info Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/50 p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <Building2 size={20} className="text-[#4B8EF7]" />
                <h3 className="font-bold text-lg text-slate-800">
                  معلومات العيادة
                </h3>
              </div>
                      <button
                        onClick={() => navigate("/doctor/settings/clinic")}
                        className="text-[#4B8EF7] text-sm font-semibold hover:text-blue-600 transition"
                      >
                        تعديل بيانات العيادة
                      </button>
            </div>

            <div className="space-y-6">
              <Info title="اسم العيادة" value="د.مالك" />
              <Info title="العنوان" value="شارع البحر" />
              <Info title="هاتف العيادة" value="012XXXXXXX" />
              <Info title="ساعات العمل" value="09:00 ص - 05:00 م" />
            </div>
          </div>

        </div>

        {/* Bottom Section: Account & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Account Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/50 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck size={22} className="text-[#4B8EF7]" />
                <h3 className="font-bold text-lg text-slate-800">حسابي</h3>
              </div>
              <p className="text-slate-400 text-sm text-center max-w-sm mx-auto leading-relaxed mb-8">
                تحكم في وصولك إلى النظام أو قم بإغلاق حسابك بشكل نهائي. يرجى العلم أن حذف الحساب سيؤدي إلى فقدان جميع البيانات.
              </p>
            </div>

            <div className="space-y-4 w-full">
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("role");
                      navigate("/login");
                    }}
                    className="w-full border border-red-200 text-red-500 font-semibold rounded-xl py-3.5 text-sm hover:bg-red-50 transition duration-150"
                  >
                    تسجيل الخروج
                  </button>
              <button className="w-full text-slate-400 text-xs font-medium hover:text-slate-600 transition block text-center">
                حذف الحساب نهائياً
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/50 p-6 md:p-8 flex flex-col justify-between">
            <h3 className="font-bold text-lg text-slate-800 mb-6 text-right">
              إجراءات سريعة
            </h3>

            <div className="space-y-3 w-full mt-auto">
              {/* Row: Password & Notifications (Exactly like image layout) */}
              <div className="grid grid-cols-2 gap-4">
                {/* Right button in RTL */}
                <button
                    onClick={() => navigate("/doctor/settings/change-password")}
                    className="bg-[#4B8EF7] hover:bg-blue-600 text-white font-semibold rounded-xl py-3.5 text-sm shadow-sm transition"
                  >
                    تغيير كلمه المرور
                  </button>
                
                {/* Left button in RTL */}
               <button
                      onClick={() => navigate("/doctor/settings/notifications")}
                      className="border border-[#4B8EF7] text-[#4B8EF7] font-semibold rounded-xl py-3.5 text-sm hover:bg-blue-50/50 transition"
                    >
                      الاشعارات
                    </button>
              </div>

              {/* Full Width Green Button */}
                  <button
                    onClick={() => navigate("/doctor/settings/transactions")}
                    className="w-full border border-[#22C55E] text-[#16A34A] font-semibold rounded-xl py-3.5 text-sm hover:bg-emerald-50/40 transition mt-1"
                  >
                    الدفع والارباح
                  </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// مكوّن عرض البيانات المطور ليعكس الأماكن والخطوط بدقة
function Info({ title, value }) {
  return (
    <div className="flex flex-row-reverse justify-between items-center text-sm">
      {/* العنوان يظهر على اليسار بالرمادي الباهت */}
      <span className="text-slate-400 font-medium tracking-wide">
        {title}
      </span>
      {/* القيمة تظهر على اليمين بالأسود الداكن */}
      <span className="font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}