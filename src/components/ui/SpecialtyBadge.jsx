export default function SpecialtyBadge({
  icon,
  label,
  onClick,
  href,
}) {
  const baseClasses =
    "flex items-center gap-3 px-6 py-3 bg-white border border-[#468EEC] rounded-full hover:bg-[#468EEC]/5 transition-all duration-200 font-cairo font-medium text-[#468EEC] text-base";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        aria-label={`رابط تصميم ${label}`}
      >
        <div className="w-6 h-6 text-[#468EEC]">{icon}</div>
        <span>{label}</span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      <div className="w-6 h-6 text-[#468EEC]">{icon}</div>
      <span>{label}</span>
    </button>
  );
}
