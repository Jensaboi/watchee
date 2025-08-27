import MenuDropdown from "./ui/MenuDropdown";

export default function SearchAndResults() {
  return (
    <div>
      <div>
        <MenuDropdown>
          {(isOpen, toggle, open, close) => (
            <>
              <button onClick={toggle}>All</button>
              {isOpen && (
                <div>
                  <div></div>
                </div>
              )}
            </>
          )}
        </MenuDropdown>
        <div>
          <input />
        </div>
      </div>
    </div>
  );
}
