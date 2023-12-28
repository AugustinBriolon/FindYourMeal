import {
  Outlet,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import "./index.css";
import Header from "./components/Header";
import Home from "./pages/home";
import Meal from "./pages/meal";
import Area from "./pages/area";
import Category from "./pages/category";
import ErrorPage from "./error-page";


export default function App() {

  const location = useLocation();

  const Layout = () => {
    return (
      <div className="max-w-default mx-auto">
        <Header />
        <Outlet />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname} >
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/meal/:meal" element={<Meal />} />
          <Route path="/area/:area" element={<Area />} />
          <Route path="/category/:category" element={<Category />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );

}