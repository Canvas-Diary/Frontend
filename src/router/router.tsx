import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RoutePaths from "../constants/routePath";
import GlobalFallback from "../pages/fallback/GlobalFallback";
import Layout from "../pages/Layout/Layout";
import PageFallback from "../pages/fallback/PageFallback";
import DiaryLayout from "../pages/write/Layout/DiaryLayout";

const HomePage = lazy(() => import("../pages/Home"));
const ExplorePage = lazy(() => import("../pages/Explore"));
const AlbumPage = lazy(() => import("../pages/Album"));
const Mypage = lazy(() => import("../pages/Mypage"));

const DiaryPage = lazy(() => import("../pages/diary/Diary"));

const Draw = lazy(() => import("../pages/write/Draw"));
const Review = lazy(() => import("../pages/write/Review"));
const Style = lazy(() => import("../pages/write/Style"));
const Write = lazy(() => import("../pages/write/Write"));

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
    path: RoutePaths.home,
    element: (
      <Suspense fallback={<GlobalFallback />}>
        <DiaryLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<GlobalFallback />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: RoutePaths.diaryWrite,
        element: (
          <Suspense fallback={<PageFallback />}>
            <Write />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.diaryStyle,
        element: (
          <Suspense fallback={<PageFallback />}>
            <Style />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.diaryReview,
        element: (
          <Suspense fallback={<PageFallback />}>
            <Review />
          </Suspense>
        ),
      },
      {
        path: RoutePaths.diaryDraw,
        element: (
          <Suspense fallback={<PageFallback />}>
            <Draw />
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
