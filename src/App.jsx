import { Outlet } from "react-router-dom";
import ConfigProvider from "./context/ConfigContext";
import GenreProvider from "./context/GenreContext";
import AgeRatingExplanationProvider from "./context/AgeRatingExplanationsContext";
import ScrollToTop from "./hooks/scrollToTop";

function App() {
  return (
    <>
      <ConfigProvider>
        <GenreProvider>
          <AgeRatingExplanationProvider>
            <ScrollToTop />
            <Outlet />
          </AgeRatingExplanationProvider>
        </GenreProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
