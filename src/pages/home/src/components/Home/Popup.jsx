
function Popup({ isOpen, title, icon, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white w-96 rounded-2xl p-6 shadow-lg text-right">

        {/* Header */}
        <div className="text-center mb-4">

          {icon && (
            <img
              src={icon}
              alt=""
              className="w-26 h-26 mx-auto mb-2"
            />
          )}

          {title && (
            <h2 className="text-green-600 font-bold text-xl">
              {title}
            </h2>
          )}

        </div>

        {/* Content (dynamic بالكامل) */}
        {children}

      </div>
    </div>
  );
}

export default Popup;