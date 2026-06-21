import { useRef, useState } from "react";
import axios from "axios";
import { Upload, FileText } from "lucide-react";
import { Button } from "./button";

const USE_API = false; // 👈 خليها true لما تربط بالباك

const mockFiles = [
  {
    id: 1,
    name: "تحليل دم",
    date: "10 ديسمبر 2025",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },


];

const MedicalFilesSection = () => {
  const [medicalFiles, setMedicalFiles] = useState(mockFiles);

  const fileInputRef = useRef(null);

  // 🔹 رفع ملف
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      if (USE_API) {
        const formData = new FormData();
        formData.append("file", file);

        await axios.post("/api/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // 👇 mock add
      const newFile = {
        id: Date.now(),
        name: file.name,
        date: new Date().toLocaleDateString("ar-EG"),
        icon: FileText,
        color: "bg-blue-100 text-blue-600",
      };

      setMedicalFiles((prev) => [newFile, ...prev]);

    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <section className="w-full px-[100px] py-[32px] mb-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-[32px]">

        <h3 className="text-[28px] font-changa font-semibold text-[#5B5B5B]">
          الملفات الطبية
        </h3>

        <Button
          variant="primary"
          className="flex items-center gap-2 h-[42px] px-4"
          onClick={() => fileInputRef.current.click()}
        >
          <Upload size={16} />
          <span>رفع ملف جديد</span>
        </Button>

        {/* hidden input */}
        <input
          type="file"
          ref={fileInputRef}
          hidden
          onChange={handleUpload}
        />

      </div>

      {/* EMPTY STATE */}
      {medicalFiles.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          لا توجد ملفات حالياً
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {medicalFiles.map((file) => {
            const Icon = file.icon;

            return (
              <div
                key={file.id}
                className="bg-white p-6 rounded-[16px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center cursor-pointer"
              >

                <div className={`w-16 h-16 rounded-[16px] ${file.color} flex items-center justify-center mb-4`}>
                  <Icon size={28} />
                </div>

                <h4 className="font-semibold text-[#121212] mb-1">
                  {file.name}
                </h4>

                <p className="text-[#5B5B5B] text-sm">
                  {file.date}
                </p>

              </div>
            );
          })}

        </div>
      )}
    </section>
  );
};

export default MedicalFilesSection;