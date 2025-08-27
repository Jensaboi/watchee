import { Outlet } from "react-router-dom";
import ConfigProvider from "./context/ConfigContext";
import GenreProvider from "./context/GenreContext";

function App() {
  return (
    <>
      <ConfigProvider>
        <GenreProvider>
          <Outlet />
        </GenreProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
