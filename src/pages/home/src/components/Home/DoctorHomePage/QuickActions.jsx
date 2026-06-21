import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup.jsx";
import DonePopup from "../DonePopup.jsx";
import promocode from "../../../assets/images/Home/Doctor/icon/promocode.png";

export default function QuickActions() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const [form, setForm] = useState({
    code: "",
    count: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!form.code) newErrors.code = "مطلوب";
    if (!form.count) newErrors.count = "مطلوب";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setOpenModal(false);
      setShowDone(true);

      // reset form
      setForm({ code: "", count: "" });

      setTimeout(() => {
        setShowDone(false);
      }, 1000);
    }
  };

  const actions = [
    {
      title: "إضافة مواعيد متاحة",
      className: "border border-blue-500 text-blue-500 hover:bg-blue-50",
      onClick: () => navigate("/doctor/appointments"),
    },
    {
      title: "إنشاء كوبون خصم",
      className: "border border-green-500 text-green-600 hover:bg-green-50",
      onClick: () => setOpenModal(true),
    },
    {
      title: "مشاركة الملف الشخصي",
      className: "border border-orange-400 text-orange-500 hover:bg-orange-50",
      onClick: () => console.log("share profile"),
    },
  ];

  return (
    <>
      <div className="bg-white p-5 rounded-2xl shadow-md">
        <h2 className="font-bold mb-4 text-center text-gray-600 text-xl">
          إجراءات سريعة
        </h2>

        <div className="flex flex-col gap-3">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className={`${action.className} px-4 py-2 rounded-lg transition cursor-pointer`}
            >
              {action.title}
            </button>
          ))}
        </div>
      </div>

      {/* Popup */}
      <Popup
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="إنشاء بروموكود"
        icon={promocode}
      >
        <div className="space-y-4">

          <div className="text-right">
            <label className="block mb-1 text-sm font-medium">
              كود الكوبون
            </label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="مثال: KH100"
              className="w-full border p-2 rounded-lg text-right"
            />
            {errors.code && (
              <p className="text-red-500 text-sm">{errors.code}</p>
            )}
          </div>

          <div className="text-right">
            <label className="block mb-1 text-sm font-medium">
              عدد المستخدمين
            </label>
            <input
              type="number"
              name="count"
              value={form.count}
              onChange={handleChange}
              placeholder="مثال: 100"
              className="w-full border p-2 rounded-lg text-right"
            />
            {errors.count && (
              <p className="text-red-500 text-sm">{errors.count}</p>
            )}
          </div>

          <div className="flex justify-evenly mt-4">
            <button
              onClick={() => setOpenModal(false)}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              رجوع
            </button>

            <button
              onClick={handleSubmit}
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
            >
              إنشاء
            </button>
          </div>

        </div>
      </Popup>

      {/* Done Popup */}
      <DonePopup
        isOpen={showDone}
        onClose={() => setShowDone(false)}
        message="تم إنشاء الكوبون بنجاح"
        color="green"
      />
    </>
  );
}