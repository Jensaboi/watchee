import Button from "./ui/Button";
import MenuDropdown from "./ui/MenuDropdown";

import { Search, ArrowLeft } from "lucide-react";

export default function SearchAndResults() {
  return (
    <div>
      <div className="flex">
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
          <Search />
          <input />
        </div>
        <Button variant="icon">
          <ArrowLeft />
        </Button>
      </div>
    </div>
  );
}
