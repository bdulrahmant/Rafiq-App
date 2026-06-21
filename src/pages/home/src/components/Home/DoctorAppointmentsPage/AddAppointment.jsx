import { useState } from "react";
import { X } from "lucide-react";

export default function AddAppointmentModal({
  isOpen,
  onClose,
  onConfirm,
}) {

const [formData, setFormData] = useState({
  patientName: "",
  date: "",
  startTime: ""
});
  if (!isOpen) return null;

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("SUBMIT CLICKED");
console.log(formData);

if (
  !formData.patientName
) {
  return;
}
    onConfirm(formData);
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-xs
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-3xl
          p-6
          shadow-xl
        "
      >

        {/* header */}
        <div className="flex items-center justify-between mb-6">

          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-full
              bg-gray-100
              flex
              items-center
              justify-center
              hover:bg-gray-200
              transition
            "
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold text-[#4A84E8]">
            اضافه موعد متاح
          </h2>

        </div>

        {/* form */}
        <div className="space-y-5">
          <div>
  <label className="block mb-2 font-medium text-gray-700">
    اسم المريض
  </label>

  <input
    type="text"
    name="patientName"
    value={formData.patientName}
    onChange={handleChange}
    placeholder="أدخل اسم المريض"
    className="
      w-full
      border
      border-gray-300
      rounded-xl
      px-4
      py-3
      outline-none
      focus:border-[#4A84E8]
    "
  />
</div>

          {/* date */}

          {/* start time */}



        </div>

        {/* buttons */}
        <div className="flex gap-3 mt-8">

          <button
            onClick={handleSubmit}
            className="
              flex-1
              bg-[#4A84E8]
              text-white
              py-3
              rounded-xl
              font-medium
              hover:opacity-90
              transition
            "
          >
            تأكيد
          </button>

          <button
            onClick={onClose}
            className="
              flex-1
              border
              border-gray-300
              py-3
              rounded-xl
              font-medium
              hover:bg-gray-100
              transition
            "
          >
            إلغاء
          </button>

        </div>

      </div>

    </div>
  );
}