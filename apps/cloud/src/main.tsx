import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./auth/login";
import SignupPage from "./auth/signup";
import OnboardingLayout from "./onboarding/index";
import DashboardLayoutWrapper from "./dashboard/index";
import DashboardAnalytics from "./websites/analytics";
import DashboardProducts from "./websites/products";
import DashboardOrders from "./websites/orders";
import DashboardCustomers from "./websites/customers";
import DashboardContent from "./websites/cms";
import DashboardOnlineStore from "./websites/list";
import DashboardOnlineStoreDetail from "./websites/dashboard";
import DashboardDiscounts from "./websites/discounts";
import DashboardSettings from "./websites/settings";

import "@fontsource/instrument-serif/400.css";
import "@fontsource-variable/inter/index.css";
import "./index.css";
import { syncProfileFromServer } from "./lib/onboarding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingLayout />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayoutWrapper />,
    children: [
      {
        path: "analytics",
        element: <DashboardAnalytics />,
      },
      {
        path: "products",
        element: <DashboardProducts />,
      },
      {
        path: "orders",
        element: <DashboardOrders />,
      },
      {
        path: "customers",
        element: <DashboardCustomers />,
      },
      {
        path: "content",
        element: <DashboardContent />,
      },
      {
        path: "online-store",
        element: <DashboardOnlineStore />,
      },
      {
        path: "online-store/:websiteId",
        element: <DashboardOnlineStoreDetail />,
      },
      {
        path: "discounts",
        element: <DashboardDiscounts />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-bold text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    ),
  },
]);

syncProfileFromServer();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
