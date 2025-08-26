export default function Button({
  className,
  children,
  onClick,
  variant = null,
  size = null,
  ...rest
}) {
  const variants = {
    icon: "inline-flex items-center justify-center p-md rounded-full hover:bg-bg-400 transition-colors ease-in duration-300",
    primary: "",
    secondary: "",
  };
  const sizes = { sm: "py-xs px-sm", md: "py-sm px-md", lg: "py-md px-lg" };
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
