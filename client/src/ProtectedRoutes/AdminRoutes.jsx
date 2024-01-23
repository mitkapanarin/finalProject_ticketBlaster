import React from "react";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
  const { token, role } = useSelector((state) => state.User);

  return token && role === "admin" ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
