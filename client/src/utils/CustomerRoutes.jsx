import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const CustomerRoutes = () => {
  // token check
  // role check
  const token = "sujicjhsdcbhjsdchbsd";
  const role = "User";
  // case 1 is, you are logged in
  // case 2 is you are not logged in 
  return token && role == "User" ? <Outlet /> : token ? <Navigate to="/admin-panel" /> : <Navigate to="/login" />;
};

export default CustomerRoutes;
