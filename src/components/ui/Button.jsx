export default function Button({
  className,
  children,
  onClick,
  variant = null,
  size = null,
  ...rest
}) {
  const variants = {
    icon: "inline-flex items-center justify-center  gap-xs p-md rounded-full hover:shadow-lg hover:bg-bg-400 transition-colors ease-in duration-300 color-text-100",
    solid:
      "bg-bg-300 shadow-2xl text-text-300 hover:text-text-100 hover:bg-bg-400 active:bg-bg-200 inline-flex items-center justify-center gap-xs rounded-full transistion-all ease-in duration-300 shadow-lg hover:scale-101",
    ghost: "",
    page: "border-1 border-bg-400 size-12 inline-flex justify-center items-center ",
    carosuel:
      "top-1/3 inline-flex items-center justify-center text-lg absolute z-2 p-xs bg-bg-300/60 hover:bg-bg-300/90 transistion-all duration-300 ease-in-out rounded-md border border-transparent hover:border-accent/50 w-12 h-22",
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
