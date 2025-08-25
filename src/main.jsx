import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Tv from "./pages/Tv.jsx";
import MediaLayout, {
  loader as mediaLayoutLoader,
} from "./layouts/MediaLayout.jsx";
import MediaDetails from "./pages/MediaDetails.jsx";
import MediaReviews from "./pages/MediaReviews.jsx";
import PersonDetails from "./pages/PersonDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./index.css";
import App from "./App.jsx";
import Discover from "./pages/Discover.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

const rotuer = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: MainLayout,
        children: [
          { index: true, Component: Home },
          { path: "movie", Component: Movie },
          { path: "tv", Component: Tv },
          { path: "discover", Component: Discover },
          {
            path: ":mediaType/:id",
            Component: MediaLayout,
            children: [
              { index: true, Component: MediaDetails },
              { path: "reviews", Component: MediaReviews },
            ],
            loader: mediaLayoutLoader,
          },
          { path: "person", Component: PersonDetails },
          { path: "*", Component: NotFound },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rotuer} />
  </StrictMode>
);
