import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Tv from "./pages/Tv.jsx";
import MediaDetails, {
  loader as mediaDetailsLoader,
} from "./pages/MediaDetails.jsx";

import MediaCasts, { loader as mediaCastsLoader } from "./pages/MediaCasts.jsx";
import MediaReviews from "./pages/MediaReviews.jsx";
import PersonDetails from "./pages/PersonDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import Discover from "./pages/Discover.jsx";
import MediaDetailsWatch from "./pages/MediaDetailsWatch.jsx";

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
            Component: MediaDetails,
            loader: mediaDetailsLoader,
            children: [
              { index: true, Component: MediaCasts, loader: mediaCastsLoader },
              { path: "watch", Component: MediaDetailsWatch },
              { path: "reviews", Component: MediaReviews },
            ],
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
