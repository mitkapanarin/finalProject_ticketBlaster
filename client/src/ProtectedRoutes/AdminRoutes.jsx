import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const { token, role } = useSelector((state) => state.User);

  return token && role === "Admin" ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/admin-dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
