import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-1 w-full min-h-full flex flex-col gap-3xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
