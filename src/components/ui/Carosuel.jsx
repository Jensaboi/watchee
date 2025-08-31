export default function Carosuel({ children }) {
  return (
    <div>
      <div className="flex w-full gap-xl overflow-hidden overflow-x-scroll">
        {children}
      </div>
    </div>
  );
}
