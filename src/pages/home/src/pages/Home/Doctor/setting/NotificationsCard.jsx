import { useState } from "react";
import { Mail, MessageSquare, Bell } from "lucide-react";

export default function NotificationsCard() {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    app: true,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "email",
      title: "إشعارات البريد الإلكتروني",
      desc: "تلقي ملخص المواعيد والتقارير عبر البريد",
      icon: <Mail size={16} />,
    },
    {
      key: "sms",
      title: "تنبيهات الرسائل النصية (SMS)",
      desc: "تنبيهات فورية بالمواعيد العاجلة",
      icon: <MessageSquare size={16} />,
    },
    {
      key: "app",
      title: "إشعارات التطبيق",
      desc: "تلقي التنبيهات أثناء تصفح التطبيق",
      icon: <Bell size={16} />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      {/* header */}
      <div className="flex flex-row-reverse items-center gap-2 mb-6">
        <div className="bg-blue-100 p-2 rounded-full text-blue-500">
          <Bell size={16} />
        </div>
        <h3 className="font-bold text-lg">الإشعارات</h3>
      </div>

      {/* items */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex flex-row-reverse items-center justify-between"
          >

            {/* content */}
            <div className="flex items-center gap-4">
              

              <div className="text-right">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm font-medium text-[#4571A1]">{item.desc}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full text-blue-500">
                {item.icon}
              </div>

            </div>

            {/* toggle */}
            <button
              onClick={() => toggle(item.key)}
              className={`w-12 cursor-pointer h-6 flex items-center rounded-full p-1 transition ${
                settings[item.key] ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white cursor-pointer w-4 h-4 rounded-full shadow transform transition ${
                  settings[item.key]
                    ? "translate-x-6"
                    : "translate-x-0"
                }`}
              />
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}