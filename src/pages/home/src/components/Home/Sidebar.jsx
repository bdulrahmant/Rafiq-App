import { NavLink, useNavigate } from "react-router-dom";
import {
  House,
  CalendarDays,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
function Sidebar() {
  const navigate = useNavigate();
  const menuItems = [
    {
      path: "/doctor",
      label: "الرئيسية",
      icon: House,
    },
    {
      path: "/doctor/appointments",
      label: "المواعيد",
      icon: CalendarDays,
    },
    {
      path: "/doctor/patients",
      label: "المرضى",
      icon: Users,
    },
    {
      path: "/doctor/articles",
      label: "المقالات",
      icon: FileText,
    },
  ];
  return (
    <aside className="w-64 min-h-screen rounded-b-sm bg-white shadow-md flex flex-col p-6">

      {/* main menu */}
      <nav className="flex flex-col gap-3">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/doctor"}
            className={({ isActive }) =>
              `flex flex-row-reverse items-center gap-3 p-3 rounded-xl transition-all duration-200
                ${isActive ? "bg-[#4399f6] text-white" : "hover:bg-gray-100"}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}

      </nav>

      {/* divider */}
      <hr className="my-4" />

      {/* settings + logout */}
      <div className="flex flex-col gap-3">

        <NavLink
          to="/doctor/settings"
          className={({ isActive }) =>
            `flex flex-row-reverse items-center gap-3 p-3 rounded-xl transition-all duration-200
                ${isActive ? "bg-[#1692eb] text-white" : "hover:bg-gray-100"}`
          }
        >
          <Settings size={20} />
          <span>الإعدادات</span>
        </NavLink>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");

            navigate("/login");
          }}
          className="flex flex-row-reverse items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
        >
          <LogOut size={20} />
          تسجيل الخروج
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;