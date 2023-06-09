import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  // token check
  // role check
  const token = "sujicjhsdcbhjsdchbsd";
  const role = "Admin";
  return token && role == "Admin" ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/customer-dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
