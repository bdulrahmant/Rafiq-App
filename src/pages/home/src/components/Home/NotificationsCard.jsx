import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationsCard() {
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [app, setApp] = useState(true);

  const Toggle = ({ value, onChange }) => (
    <div
      onClick={() => onChange(!value)}
      className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition ${
        value ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          value ? "translate-x-5" : ""
        }`}
      />
    </div>
  );

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">

      {/* الهيدر */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
          <Bell size={18} />
        </div>
        <h2 className="font-bold">إشعارات</h2>
      </div>

      {/* العناصر */}
      <div className="flex flex-col gap-5">

        <div className="flex justify-between items-center">
          <div value={email} onChange={setEmail} />
          <div className="text-right">
            <p className="font-medium">إشعارات البريد الإلكتروني</p>
            <p className="text-sm text-gray-400">
              لتلقي مواعيد والتقارير عبر البريد
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div value={sms} onChange={setSms} />
          <div className="text-right">
            <p className="font-medium">تنبيهات الرسائل النصية (SMS)</p>
            <p className="text-sm text-gray-400">
              تنبيه فوري بالمواعيد العاجلة
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div value={app} onChange={setApp} />
          <div className="text-right">
            <p className="font-medium">إشعارات التطبيق</p>
            <p className="text-sm text-gray-400">
              تلقي التنبيهات داخل التطبيق
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}