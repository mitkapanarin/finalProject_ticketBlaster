import React from "react";
import {
  Home,
  AdminDashboard,
  ErrorPage,
  Login,
  ProfileDashboard,
} from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminRoutes, UserRoutes } from "./ProtectedRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<UserRoutes />}>
          <Route path="/user-profile" element={<ProfileDashboard />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;