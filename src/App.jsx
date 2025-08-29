import { Outlet } from "react-router-dom";
import ConfigProvider from "./context/ConfigContext";
import GenreProvider from "./context/GenreContext";
import AgeRatingExplanationProvider from "./context/AgeRatingExplanationsContext";

function App() {
  return (
    <>
      <ConfigProvider>
        <GenreProvider>
          <AgeRatingExplanationProvider>
            <Outlet />
          </AgeRatingExplanationProvider>
        </GenreProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
