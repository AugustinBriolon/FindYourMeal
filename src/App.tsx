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
import Test from "./pages/test";
import ErrorPage from "./error-page";


export default function App() {

  const location = useLocation();

  const Layout = () => {
    return (
      <div className="max-w-default">
        <Header />
        <Outlet />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname} >
        <Route index element={<Home />} />
        <Route path="/" element={<Layout />}>
          <Route path="/test" element={<Test />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AnimatePresence>
  );

}