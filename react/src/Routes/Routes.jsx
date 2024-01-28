import { createBrowserRouter } from "react-router-dom";

import Login from "./Login";
import Main from "../layouts/Main";
import About from "./About";

import ComputersComponent from "../components/ComputersComponent";
import Layout from "../layouts/Layout";
import UsersComponent from "../components/UsersComponent";
import ProtectedRoute from "./ProtectedRoute";
import HideIfNotAdmin from "../components/auth/HideIfNotAdmin";
import SignupForm from "../components/auth/SignupForm";
import UrlShortnerComponent from "../components/UrlShortnerComponent";
import ShortenedUIComponent from "../components/ShortenedUIComponent";
import PricingComponent from "../components/PricingComponent";
import QrCodesComponent from "../components/QrCodesComponent";
import ResourcesComponent from "../components/ResourcesComponent";
import HomeComponent from "../components/HomeComponent";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <HomeComponent />,
      },
      {
        path: "computers",
        element: (
          <ProtectedRoute>
            <ComputersComponent />
          </ProtectedRoute>
        ), // Wrap protected routes with this
      },
      {
        path: "url-shortner",
        element: (
          <ProtectedRoute>
            <UrlShortnerComponent />
          </ProtectedRoute>
        ), // Wrap protected routes with this
      },
      {
        path: "shortened-link",
        element: (
          <ProtectedRoute>
            <ShortenedUIComponent />
          </ProtectedRoute>
        ), // Wrap protected routes with this
      },
      {
        path: "qr-codes",
        element: (
          <ProtectedRoute>
            <QrCodesComponent />
          </ProtectedRoute>
        ), // Wrap protected routes with this
      },
      {
        path: "pricing",
        element: <PricingComponent />, // Wrap protected routes with this
      },
      {
        path: "resources",
        element: <ResourcesComponent />, // Wrap protected routes with this
      },
      {
        path: "about",
        element: <About />, // Wrap protected routes with this
      },
      {
        path: "admin",
        element: (
          <HideIfNotAdmin>
            <UsersComponent />
          </HideIfNotAdmin>
        ),
      },
      // Add other child routes as needed
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
