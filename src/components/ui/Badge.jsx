export default function Badge({ children, variant, className, ...rest }) {
  const variants = {
    underline:
      "text-text-400 text-sm tracking-wider font-normal inline-flex items-center gap-sm px-[2px] rounded-sm",
    ageRating:
      "border inline-flex items-center gap-sm border-text-400 text-text-400 text-sm tracking-wider font-normal px-[4px] rounded-sm",
    dot: "size-[4px] rounded-full bg-text-500",
    genre:
      "bg-bg-300 py-1 px-2 rounded-md border border-bg-500 text-text-300 text-xs tracking-wider font-light",
  };
  return (
    <span className={`${className} ${variants[variant]}`} {...rest}>
      {children}
    </span>
  );
}
