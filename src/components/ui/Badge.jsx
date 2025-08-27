export default function Badge({ children, variant, className, ...rest }) {
  const variants = {
    underline:
      "text-text-500 inline-flex items-center gap-sm px-[2px] rounded-sm",
    ageRating:
      "border inline-flex items-center gap-sm border-text-500 px-[2px] rounded-sm text-sm",
    dot: "size-[4px] rounded-full bg-text-500",
  };
  return (
    <span className={`${className} ${variants[variant]}`} {...rest}>
      {children}
    </span>
  );
}
