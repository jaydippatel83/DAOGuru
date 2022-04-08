import { Navigate, useRoutes } from "react-router-dom"; 
import DashboardLayout from "./layouts/dashboard";
import LendingPageLayout from "./layouts/LendingPageLayout";
 
import Products from "./pages/Products";  
import NotFound from "./pages/Page404";
import Agreement from "./pages/Agreement";
import ChatBox from "./pages/ChatBox";
import UserProfile from "./layouts/dashboard/UserProfile";
import Profile from "./pages/Profile"; 
import Lending from "./LendingPage/Lending";
import ProductDetail from "./ProductDetail/ProductDetail"; 
import DashboardApp from "./pages/DashboardApp";
 
import Subscription from "./pages/Subscribtion";
import SubscribtionDetails from "./pages/SubscribtionDetails";
import Invoice from "./pages/Invoice";
import { element } from "prop-types";
import InvoiceDetail from "./pages/InvoiceDetail";
import HiringPage from "./pages/Hiring"; 
import ProductsList from "./LendingPage/Landing_product/ProductsList";
import ServicesList from "./LendingPage/Landing_product/ServicesList"; 
import HiringLists from "./LendingPage/Landing_product/HiringLists";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [ 
        { path: "app", element: <DashboardApp /> }, 
        { path: "products", element: <Products /> }, 
        { path: "Agreement", element: <Agreement /> }, 
        { path: "chat/:id", element: <ChatBox /> },
        { path: "chat", element: <ChatBox /> },
        { path: "userProfile", element: <UserProfile /> }, 
        { path: "invoice", element: <Invoice /> },
        { path: "subscriptions", element: <Subscription /> },
        { path: "hiring", element: <HiringPage /> },
      ],
    }, 
    {
      path: "/productdetail",
      element: <ProductDetail />,
    },
    {
      path: "/",
      element: <LendingPageLayout />,
      children: [
        { path: "/", element: <Lending /> },
        { path: "/:name", element: <Profile /> },
        {
          path: "/:name/:productName",
          element: <ProductDetail />,
        }, 
        { path: "/invoice/:id", element: <InvoiceDetail /> },
        { path: "/subscribtion/:id", element: <SubscribtionDetails /> },

        { path: "/landingproduct", element: <ProductsList /> },
        { path: "/landingservice", element: <ServicesList /> },
        { path: "/landinghiring", element: <HiringLists /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> }, 
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
}
