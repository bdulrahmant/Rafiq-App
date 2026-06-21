import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-right hover:bg-gray-50 transition-colors"
      >
        <ChevronDown
          className={`w-6 h-6 text-[#121212] transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />

        <h3 className="text-lg font-cairo font-medium text-[#121212] mr-4">
          {question}
        </h3>
      </button>

      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-base font-cairo text-gray-500 leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
