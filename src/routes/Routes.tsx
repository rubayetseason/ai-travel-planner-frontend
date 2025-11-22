import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { ProtectedRoute, AuthRoute } from "./RouteGuards";
import { routesList } from "@/constants/routeList";
import BaseLayout from "@/layouts/BaseLayout";
import BaseLoader from "@/components/loaders/BaseLoader";
import NotFoundPage from "@/components/common/NotFoundPage";

// auth
const LoginPage = lazy(() => import("../app/dashboard/Login/Login"));

// public pages
const HomePage = lazy(() => import("../app/system/Home/Home"));
const SearchResultPage = lazy(
  () => import("../app/system/SearchResult/SearchResult")
);

// dashboard (protected)
const DashboardPage = lazy(
  () => import("../app/dashboard/Dashboard/DashboardHome")
);

export default function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* ---------- Public routes (always accessible) ---------- */}
        <Route
          path="/"
          element={
            <Suspense fallback={<BaseLoader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/search-result"
          element={
            <Suspense fallback={<BaseLoader />}>
              <SearchResultPage />
            </Suspense>
          }
        />

        {/* ---------- Auth route (only redirect to dashboard if already logged in) ---------- */}
        <Route
          path={routesList.auth}
          element={
            <AuthRoute>
              <Suspense fallback={<BaseLoader />}>
                <LoginPage />
              </Suspense>
            </AuthRoute>
          }
        />

        {/* ---------- Protected routes (only accessible when logged in) ---------- */}
        <Route element={<ProtectedRoute />}>
          {/* Put protected pages under whatever path you prefer (here: /dashboard) */}
          <Route path={routesList.dashboard} element={<BaseLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<BaseLoader />}>
                  <DashboardPage />
                </Suspense>
              }
            />
            {/* add other nested protected routes here, e.g.
                <Route path="orders" element={<OrdersPage />} />
            */}
          </Route>
        </Route>

        {/* Optional: catch-all route (404) */}
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}
