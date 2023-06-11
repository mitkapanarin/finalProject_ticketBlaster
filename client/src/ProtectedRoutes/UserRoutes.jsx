import React from "react";

const UserRoutes = () => {
  const token = "skdjciksd";
  const role = "User";
  return token && role === "User" ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
};

export default UserRoutes;