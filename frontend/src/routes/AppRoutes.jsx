import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ProductPage from "../pages/product/ProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Protected Product Module */}
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;