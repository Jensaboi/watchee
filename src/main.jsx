import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App, { loader as rootLoader } from "./App.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Movie, { loader as movieLoader } from "./pages/Movie.jsx";
import Tv, { loader as tvLoader } from "./pages/Tv.jsx";
import MediaDetails, {
  loader as mediaDetailsLoader,
} from "./pages/MediaDetails.jsx";

import MediaCasts, { loader as mediaCastsLoader } from "./pages/MediaCasts.jsx";
import MediaReviews, {
  loader as mediaReviewsLoader,
} from "./pages/MediaReviews.jsx";
import PersonDetails from "./pages/PersonDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import Discover, { loader as discoverLoader } from "./pages/Discover.jsx";
import MediaWatchProviders, {
  loader as mediaWatchProvidersLoader,
} from "./pages/MediaWatchProviders.jsx";

const rotuer = createBrowserRouter([
  {
    path: "/",
    Component: App,
    loader: rootLoader,
    hydrateFallbackElement: (
      <div className="w-full h-screen flex-center">
        <h1>Loading page...</h1>
      </div>
    ),
    id: "root",
    children: [
      {
        Component: MainLayout,
        children: [
          { index: true, Component: Home },
          { path: "movie", Component: Movie, loader: movieLoader },
          { path: "tv", Component: Tv, loader: tvLoader },
          {
            path: "discover/:mediaType",
            Component: Discover,
            loader: discoverLoader,
          },
          {
            path: ":mediaType/:id",
            Component: MediaDetails,
            loader: mediaDetailsLoader,
            children: [
              { index: true, Component: MediaCasts, loader: mediaCastsLoader },
              {
                path: "watch",
                Component: MediaWatchProviders,
                loader: mediaWatchProvidersLoader,
              },
              {
                path: "reviews",
                Component: MediaReviews,
                loader: mediaReviewsLoader,
              },
            ],
          },
          { path: "person/:id", Component: PersonDetails },
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
