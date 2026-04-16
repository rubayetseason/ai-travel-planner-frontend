import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { routesList } from "@/constants/routeList";
import BaseLayout from "@/layouts/BaseLayout";
import BaseLoader from "@/components/loaders/BaseLoader";
import NotFoundPage from "@/components/common/NotFoundPage";

// auth pages
const LoginPage = lazy(() => import("../app/dashboard/Login/Login"));
const RegisterPage = lazy(() => import("../app/dashboard/Register/Register"));

// system pages
const HomePage = lazy(() => import("../app/system/Home/Home"));
const SearchResultPage = lazy(
  () => import("../app/system/SearchResult/SearchResult")
);

// admin dashboard pages
const DashboardLayout = lazy(() => import("../app/dashboard/Admin/DashboardLayout"));
const CityPage = lazy(() => import("../app/dashboard/Admin/CityPage"));
const TravelConnectorPage = lazy(
  () => import("../app/dashboard/Admin/TravelConnectorPage")
);
const HotelPage = lazy(() => import("../app/dashboard/Admin/HotelPage"));
const AttractionPage = lazy(
  () => import("../app/dashboard/Admin/AttractionPage")
);
const AttractionConnectorPage = lazy(
  () => import("../app/dashboard/Admin/AttractionConnectorPage")
);

export default function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* ---------- Auth routes ---------- */}
        <Route
          path={routesList.auth}
          element={
            <Suspense fallback={<BaseLoader />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={<Navigate to={routesList.auth} replace />}
        />
        <Route
          path={routesList.register}
          element={
            <Suspense fallback={<BaseLoader />}>
              <RegisterPage />
            </Suspense>
          }
        />

        {/* ---------- System routes ---------- */}
        <Route
          path={routesList.system}
          element={<BaseLayout />}
        >
          <Route
            index
            element={
              <Suspense fallback={<BaseLoader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="search-result"
            element={
              <Suspense fallback={<BaseLoader />}>
                <SearchResultPage />
              </Suspense>
            }
          />
        </Route>

        {/* ---------- Admin routes ---------- */}
        <Route
          path={routesList.dashboard}
          element={
            <Suspense fallback={<BaseLoader />}>
              <DashboardLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={<Navigate to={routesList.dashboardCity} replace />}
          />
          <Route
            path="city"
            element={
              <Suspense fallback={<BaseLoader />}>
                <CityPage />
              </Suspense>
            }
          />
          <Route
            path="travel-connector"
            element={
              <Suspense fallback={<BaseLoader />}>
                <TravelConnectorPage />
              </Suspense>
            }
          />
          <Route
            path="hotel"
            element={
              <Suspense fallback={<BaseLoader />}>
                <HotelPage />
              </Suspense>
            }
          />
          <Route
            path="attraction"
            element={
              <Suspense fallback={<BaseLoader />}>
                <AttractionPage />
              </Suspense>
            }
          />
          <Route
            path="attraction-connector"
            element={
              <Suspense fallback={<BaseLoader />}>
                <AttractionConnectorPage />
              </Suspense>
            }
          />
        </Route>

        {/* ---------- Catch-all route ---------- */}
        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}
