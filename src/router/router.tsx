import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import ROUTE_PATH from "../constants/ROUTE_PATH";
import GlobalFallback from "../components/fallback/GlobalFallback";
import Layout from "../pages/Layout/Layout";
import PageFallback from "../components/fallback/PageFallback";
import { ErrorBoundary } from "react-error-boundary";
import AlbumFallback from "../components/pages/album/fallback/AlbumFallback";
import DiaryFallback from "../components/pages/diary/Fallback/DiaryFallback";
import DiaryFlow from "@/pages/diary/DiaryFlow";

const HomePage = lazy(() => import("../pages/main/Home"));
const ExplorePage = lazy(() => import("../pages/main/Explore"));
const AlbumPage = lazy(() => import("../pages/main/Album"));
const Mypage = lazy(() => import("../pages/main/Mypage"));
const Login = lazy(() => import("../pages/user/Login"));

const StatsLayout = lazy(() => import("@/pages/user/Stat"));
const LikedPage = lazy(() => import("@/pages/user/Like"));

const DiaryLayout = lazy(() => import("../pages/diary/Diary"));

const ErrorPage = lazy(() => import("../pages/error/Error"));
const NotFoundErrorPage = lazy(() => import("../pages/error/NotFoundError"));

const routes: RouteObject[] = [
  {
    path: ROUTE_PATH.INDEX,
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Suspense fallback={<GlobalFallback />}>
          <Layout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: (
          <Suspense fallback={<PageFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATH.EXPLORE,
        element: (
          <Suspense fallback={<PageFallback />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATH.ALBUM,
        element: (
          <Suspense fallback={<AlbumFallback />}>
            <AlbumPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATH.MYPAGE,
        element: (
          <Suspense fallback={<PageFallback />}>
            <Mypage />
          </Suspense>
        ),
      },

      {
        path: ROUTE_PATH.LOGIN,
        element: (
          <Suspense fallback={<PageFallback />}>
            <Login />
          </Suspense>
        ),
      },

      {
        path: ROUTE_PATH.STAT,
        element: (
          <Suspense fallback={<PageFallback />}>
            <StatsLayout />
          </Suspense>
        ),
      },

      {
        path: ROUTE_PATH.LIKE,
        element: (
          <Suspense fallback={<PageFallback />}>
            <LikedPage />
          </Suspense>
        ),
      },

      {
        path: `${ROUTE_PATH.DIARY}/:diaryID`,
        element: (
          <Suspense fallback={<DiaryFallback />}>
            <DiaryLayout />
          </Suspense>
        ),
      },

      {
        path: ROUTE_PATH.DIARY,
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <DiaryFlow />
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
