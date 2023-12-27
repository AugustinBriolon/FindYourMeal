import {
  Outlet,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";

import "./index.css";
import Header from "./components/Header";
import Home from "./pages/home";
import Test from "./pages/test";
import ErrorPage from "./error-page";


export default function App() {

  const Layout = () => {
    return (
      <div className="max-w-default">
        <Header />
        <Outlet />
      </div>
    );
  }

  const BrowserRoutes = createBrowserRouter([
    { path: "/", element: <Layout />, children: [
      { path: "/", element: <Home /> },
      { path: "/test", element: <Test /> },
      { path: "*", element: <ErrorPage /> }
    ] }
  ])

  return (
    <RouterProvider router={BrowserRoutes}/>
  );

}