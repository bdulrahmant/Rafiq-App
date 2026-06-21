import { Outlet, useLocation } from "react-router-dom";
import { User, CreditCard, Building2 } from "lucide-react";
import SettingsCard from "../../../components/Home/SettingsCard.jsx";
import NotificationsCard from "../Doctor/setting/NotificationsCard.jsx";

export default function Settings() {
  const location = useLocation();
  const isMainSettings = location.pathname === "/doctor/settings";

  const accountLinks = [
    { title: "تعديل الملف الشخصي", path: "profile" },
    { title: "تغيير كلمة المرور", path: "change-password" },
  ];

  const clinicLinks = [
    { title: "تعديل معلومات العيادة", path: "clinic" },
  ];

  const paymentLinks = [
    { title: "بيانات التحويلات البنكية", path: "bank" },
    { title: "سجل المعاملات", path: "transactions" },
  ];

  return (
    <div className="bg-blue-50 opacity-75 min-h-screen p-6">

      {isMainSettings ? (
        <div className="max-w-5xl mx-auto space-y-6">

          {/* 🔹 Title */}
          <div className="text-right">
            <h1 className="text-3xl font-bold text-blue-600">
              الإعدادات
            </h1>
            <p className="text-gray-500 font-bold text-sm mt-1">
              تحكم في تفاصيل حسابك، بيانات العيادة وإعدادات المواعيد.
            </p>
          </div>

          {/* 🔹 Cards */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">

            {/* الحساب الشخصي → يمين */}
            <div className="md:col-start-2 md:row-start-1">
              <SettingsCard
                title="الحساب الشخصي"
                icon={<User size={18} />}
                links={accountLinks}
              />
            </div>

            {/* بيانات العيادة → شمال */}
            <div className="md:col-start-1 md:row-start-1">
              <SettingsCard
                title="بيانات العيادة"
                icon={<Building2 size={18} />}
                links={clinicLinks}
              />
            </div>

            {/* الدفع → يمين تحت */}
            <div className="md:col-start-2 md:row-start-2">
              <SettingsCard
                title="الدفع والأرباح"
                icon={<CreditCard size={18} />}
                links={paymentLinks}
              />
            </div>

            {/* Notifications */}
            <div className="md:col-span-2">
              <NotificationsCard />
            </div>

          </div>

        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}