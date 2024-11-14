import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RoutePaths from "../constants/routePath";
import GlobalFallback from "../pages/fallback/GlobalFallback";
import Layout from "../pages/Layout/Layout";
import PageFallback from "../pages/fallback/PageFallback";
import DiaryWriteFlowLayout from "../pages/write/Layout/DiaryWriteFlowLayout";
import { ErrorBoundary } from "react-error-boundary";
import AlbumFallback from "../components/pages/album/fallback/AlbumFallback";
import DiaryFallback from "../pages/diary/Fallback/DiaryFallback";
import DiaryModifyFlowLayout from "@/pages/write/Layout/DiaryModifyFlowLayout";
import Modify from "@/pages/write/Modify";
import StatsLayout from "@/pages/stats/Layout/StatsLayout";

const HomePage = lazy(() => import("../pages/Home"));
const ExplorePage = lazy(() => import("../pages/Explore"));
const AlbumPage = lazy(() => import("../pages/Album"));
const Mypage = lazy(() => import("../pages/Mypage"));
const Login = lazy(() => import("../pages/Login"));

const DiaryLayout = lazy(() => import("../pages/diary/Layout/DiaryLayout"));

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
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Suspense fallback={<GlobalFallback />}>
          <Layout />
        </Suspense>
      </ErrorBoundary>
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
          <Suspense fallback={<AlbumFallback />}>
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
        path: `${RoutePaths.mypage}/stats`,
        element: (
          <Suspense fallback={<PageFallback />}>
            <StatsLayout />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: `${RoutePaths.diary}/:diaryID`,
    element: (
      <Suspense fallback={<DiaryFallback />}>
        <DiaryLayout />
      </Suspense>
    ),
  },
  {
    path: RoutePaths.diary,
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Suspense fallback={<GlobalFallback />}>
          <DiaryWriteFlowLayout />
        </Suspense>
      </ErrorBoundary>
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
    path: RoutePaths.login,
    element: (
      <Suspense fallback={<PageFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/diary/:diaryID/modify",
    element: (
      <Suspense fallback={<PageFallback />}>
        <Modify />
      </Suspense>
    ),
  },
  {
    path: RoutePaths.diary,
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Suspense fallback={<GlobalFallback />}>
          <DiaryModifyFlowLayout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/diary/:diaryID/style",
        element: (
          <Suspense fallback={<PageFallback />}>
            <Style />
          </Suspense>
        ),
      },
      {
        path: "/diary/:diaryID/draw",
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
