export default function Button({ children, onClick, variant, size, ...rest }) {
  const variants = { icon: "" };
  const sizes = { sm: "", md: "", lg: "" };
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
