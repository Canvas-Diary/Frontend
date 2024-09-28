import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import GlobalFallback from "../components/layout/fallback/GlobalFallback";
import PageFallback from "../components/layout/fallback/PageFallback";
import Layout from "../components/layout/Layout";
import RoutePaths from "../constants/routePath";

const HomePage = lazy(() => import("../pages/Home"));
const ExplorePage = lazy(() => import("../pages/Explore"));
const AlbumPage = lazy(() => import("../pages/Album"));
const Mypage = lazy(() => import("../pages/Mypage"));
const DiaryPage = lazy(() => import("../pages/diary/Diary"));
const ErrorPage = lazy(() => import("../pages/error/Error"));
const NotFoundErrorPage = lazy(() => import("../pages/error/NotFoundError"));

const routes: RouteObject[] = [
  {
    path: RoutePaths.home,
    element: (
      <Suspense fallback={<GlobalFallback />}>
        <Layout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<GlobalFallback />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.explore,
        element: (
          <Suspense fallback={<PageFallback />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.album,
        element: (
          <Suspense fallback={<PageFallback />}>
            <AlbumPage />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.mypage,
        element: (
          <Suspense fallback={<PageFallback />}>
            <Mypage />
          </Suspense>
        ),
      },
      {
        path: `${RoutePaths.diary}/:diaryID`,
        element: (
          <Suspense fallback={<PageFallback />}>
            <DiaryPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<GlobalFallback />}>
        <NotFoundErrorPage />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
