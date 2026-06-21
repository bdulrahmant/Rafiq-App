import { Link } from "react-router-dom";

export default function SettingsCard({ title, icon, links }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-full">

      {/* الهيدر */}
      <div className="flex flex-row-reverse items-center gap-2 mb-4">
  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
    {icon}
  </div>
  <h2 className="font-bold">{title}</h2>
</div>

      {/* اللينكات */}
      <div className="flex flex-col gap-3">
        {links.map((item, index) => (
         <Link
  key={index}
  to={item.path}
  className="flex flex-row-reverse justify-between items-center text-gray-600 hover:text-blue-500 hover:bg-gray-50 p-2 rounded-lg transition"
>
  <span className="text-right">{item.title}</span>
  <span className="text-lg">{'<'}</span>
</Link>
        ))}
      </div>
    </div>
  );
}