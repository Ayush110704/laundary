export default function FloatingCard({
  icon,
  text,
  className = "",
}) {
  return (
    <div
      className={`
        hidden lg:flex
        absolute
        ${className}

        items-center
        gap-3

        bg-white/95
        backdrop-blur-md

        px-6
        py-4

        rounded-2xl

        shadow-xl

        z-30
      `}
    >
      <div className="text-[#16C7C5]">
        {icon}
      </div>

      <p className="font-semibold text-slate-800">
        {text}
      </p>
    </div>
  );
}