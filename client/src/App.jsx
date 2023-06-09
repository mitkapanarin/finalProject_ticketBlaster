import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage, Home, Login, Admin, CustomerDashboard } from "./Pages";
import { CustomerRoutes, AdminRoutes } from "./utils";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<AdminRoutes />}>
          <Route path="/admin-panel" element={<Admin />} />
        </Route>

        <Route element={<CustomerRoutes />}>
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
