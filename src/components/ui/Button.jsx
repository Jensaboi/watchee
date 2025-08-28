export default function Button({
  className,
  children,
  onClick,
  variant = null,
  size = null,
  ...rest
}) {
  const variants = {
    icon: "inline-flex items-center justify-center  gap-xs p-md rounded-full hover:bg-bg-400 transition-colors ease-in duration-300 color-text-100",
    solid:
      "bg-bg-300 text-text-300 hover:text-text-100 hover:bg-bg-400 active:bg-bg-200 inline-flex items-center justify-center gap-xs rounded-full transistion-all ease-in duration-200 shadow-lg hover:scale-102",
    ghost: "",
  };
  const sizes = { sm: "py-xs px-sm", md: "py-sm px-lg", lg: "py-md px-xl" };
  return (
    <button
      className={`${className} ${variant && variants[variant]} ${sizes && sizes[size]} `}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
