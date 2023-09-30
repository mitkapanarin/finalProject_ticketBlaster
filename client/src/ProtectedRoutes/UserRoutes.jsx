import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoutes = () => {
  const { token, role } = useSelector((state) => state.User);

  return token && role === "user" ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
};

export default UserRoutes;
