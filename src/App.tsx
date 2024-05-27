import { Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Transaction = lazy(() => import("./pages/Transaction"));
const Customers = lazy(() => import("./pages/Customers"));
const NewProduct = lazy(() => import("./pages/management/NewProduct"));
const ProductManagement = lazy(
  () => import("./pages/management/ProductManagement")
);
const TransactionManagement = lazy(
  () => import("./pages/management/TransactionManagement")
);

const Daily = lazy(() => import("./pages/charts/Daily"));
const Monthly = lazy(() => import("./pages/charts/Monthly"));
const Breakdown = lazy(() => import("./pages/charts/Breakdown"));


const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to="/dashboard">
              </Navigate>
            }
          />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Products />} />
          <Route path="/customer" element={<Customers />} />
          <Route path="/transaction" element={<Transaction />} />

          {/* Charts */}

          <Route path="/analytics/daily" element={<Daily />} />
          <Route path="/analytics/monthly" element={<Monthly />} />
          <Route path="/analytics/breakdown" element={<Breakdown />} />



          {/* Management */}
          <Route path="/product/new" element={<NewProduct />} />
          <Route path="/product/:id" element={<ProductManagement />} />
          <Route
            path="/transaction/:id"
            element={<TransactionManagement />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
