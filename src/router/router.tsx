import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ROUTE_PATH from "@/constants/ROUTE_PATH";
import Layout from "@/components/Layout/Layout";
import GlobalFallback from "@/components/fallback/GlobalFallback";
import PageFallback from "@/components/fallback/PageFallback";
import DiaryFallback from "@/components/pages/diary/diary/Fallback/DiaryFallback";
import AlbumFallback from "@/components/pages/main/album/fallback/AlbumFallback";

/* Main */
const HomePage = lazy(() => import("@/pages/main/Home"));
const ExplorePage = lazy(() => import("@/pages/main/Explore"));
const AlbumPage = lazy(() => import("@/pages/main/Album"));
const Mypage = lazy(() => import("@/pages/main/Mypage"));

/* User */
const LoginPage = lazy(() => import("@/pages/user/Login"));
const StatPage = lazy(() => import("@/pages/user/Stat"));
const LikedPage = lazy(() => import("@/pages/user/Like"));

/* Diary */
const DiaryPage = lazy(() => import("@/pages/diary/Diary"));
const DiaryFlowPage = lazy(() => import("@/pages/diary/DiaryFlow"));

/* Error */
const ErrorPage = lazy(() => import("@/pages/error/Error"));
const NotFoundErrorPage = lazy(() => import("@/pages/error/NotFoundError"));

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
            <LoginPage />
          </Suspense>
        ),
      },

      {
        path: ROUTE_PATH.STAT,
        element: (
          <Suspense fallback={<PageFallback />}>
            <StatPage />
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
            <DiaryPage />
          </Suspense>
        ),
      },

      {
        path: ROUTE_PATH.DIARY,
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <DiaryFlowPage />
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
