import React from "react";
import {
  Home,
  AdminDashboard,
  ErrorPage,
  Login,
  ProfileDashboard,
  ForgotPassword,
  Signup,
  ShoppingCart,
} from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminRoutes, UserRoutes } from "./ProtectedRoutes";
import { NavBar, Footer } from "./components/Layout/index";
import MusicalConcerts from "./Pages/MusicalConcerts/MusicalConcerts";
import StandUpComedies from "./Pages/StandUpComedies/StandUpComedies";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/musical-concerts" element={<MusicalConcerts />} />
          <Route path="/stand-up-comedies" element={<StandUpComedies />} />

          <Route element={<UserRoutes />}>
            <Route path="/user-profile" element={<ProfileDashboard />} />
            <Route path="/shopping-cart" element={<ShoppingCart/>}/>
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/shopping-cart" element={<ShoppingCart/>}/>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
