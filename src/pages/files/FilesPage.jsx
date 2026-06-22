import { CloudUpload, FileText, Pill, Activity, Syringe, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { Button } from "../../components/ui/button";
import Footer from "../../components/layout/Footer";
import { useEffect, useState } from "react";
import { getPatientFiles } from "../../api/patient.api";

// Components
function FileCardIcon({ type }) {
  if (type === "report") return <FileText className="w-10 h-10 text-green-400 stroke-[#4ade80]" strokeWidth={1.5} />;
  if (type === "prescription") return <Pill className="w-10 h-10 text-blue-400 stroke-[#60a5fa]" strokeWidth={1.5} />;
  if (type === "xray") return <Activity className="w-10 h-10 text-gray-500 stroke-[#9ca3af]" strokeWidth={1.5} />;
  return <Syringe className="w-10 h-10 text-red-400 stroke-[#f87171]" strokeWidth={1.5} />;
}

const FILTERS = ["الكل", "تحاليل", "اشعة", "تقارير"];

function getFileIcon(type) {

  switch (type) {

    case "تحاليل":
      return {
        icon: "lab",
        iconBg: "bg-red-50",
      };

    case "أشعة":
    case "اشعة":
      return {
        icon: "xray",
        iconBg: "bg-gray-100",
      };

    case "تقارير":
      return {
        icon: "report",
        iconBg: "bg-green-50",
      };

    default:
      return {
        icon: "report",
        iconBg: "bg-blue-50",
      };
  }
}

function FileCard({
  title,
  date,
  iconBg,
  icon,
  filePath,
}) {
  return (
    <div
      onClick={() => filePath && window.open(filePath, "_blank")}
      className="flex flex-col items-center gap-6 rounded-2xl bg-white p-8 shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div
        className={`w-full aspect-[2/1] flex items-center justify-center rounded-xl ${iconBg}`}
      >
        <FileCardIcon type={icon} />
      </div>

      <div className="text-center flex flex-col gap-1">
        <p className="font-bold text-[#121212] text-lg">
          {title}
        </p>

        <p className="text-xs font-semibold text-gray-500">
          {date}
        </p>
      </div>
    </div>
  );
}

// Main
export default function FilesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredFiles = files;

  useEffect(() => {

    const fetchFiles = async () => {

      try {

        setLoading(true);

        const apiFileType =
          activeFilter === "الكل"
            ? null
            : activeFilter;

        const data =
          await getPatientFiles(
            apiFileType
          );

        console.log(
          "Medical Files:",
          data
        );

        const mappedFiles = data.map((file) => {

          const { icon, iconBg } =
            getFileIcon(file.fileType);

          return {
            id: file.id,
            title: file.title,
            date: file.formattedDate,
            icon,
            iconBg,
            filePath: file.filePath,
            category: file.fileType,
            notes: file.notes,
          };
        });

        setFiles(mappedFiles);
      }

      catch (error) {

        console.log(error);
      }

      finally {

        setLoading(false);
      }
    };

    fetchFiles();

  }, [activeFilter]);


  return (
    <div className="min-h-screen bg-[#F7FBFF] font-cairo flex flex-col text-[#121212]" dir="rtl">

      {/* Header */}

      <div className="w-full lg:w-[1000px] flex flex-col gap-6 shrink-0 ">
        <div className="container mx-auto flex justify-between max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-5 sm:pt-10 sm:pb-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl font-changa font-bold text-gray-900">  ملفاتي الطبية </h1>
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


      <div className="p-8 max-w-6xl mx-auto w-full flex-1">

        {/* Filters */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">

          <div className="flex gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2 rounded-lg border font-semibold transition-colors ${activeFilter === f
                  ? "bg-[#468EEC] text-white border-[#468EEC]"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button  variant="primary"
            onClick={() => navigate("/upload-file")}
            className="bg-[#468EEC] hover:bg-[#3A7AD9] text-white px-6 py-3 rounded-lg shadow-sm">
            <CloudUpload className="w-5 h-5 ml-2" />
            رفع ملف جديد
          </button >

        </div>

        {/* Grid */}

        {loading ? (

          <div className="text-center py-20 text-lg">
            جاري تحميل الملفات...
          </div>

        ) : filteredFiles.length === 0 ? (

          <div className="text-center py-20 text-gray-500">
            لا توجد ملفات طبية مرفوعة
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredFiles.map((file) => (
              <FileCard
                key={file.id}
                {...file}
              />
            ))}

          </div>

        )}

      </div>

      <Footer />

    </div>
  );
}