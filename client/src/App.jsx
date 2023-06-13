import React from "react";
import {
  Home,
  AdminDashboard,
  ErrorPage,
  Login,
  ProfileDashboard,
  ForgotPassword,
  Signup,
} from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminRoutes, UserRoutes } from "./ProtectedRoutes";
import { NavBar, Footer } from "./components/Layout/index";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<UserRoutes />}>
            <Route path="/user-profile" element={<ProfileDashboard />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/user-profile" element={<ProfileDashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
