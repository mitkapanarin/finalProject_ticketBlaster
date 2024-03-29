import React from "react";
import {
  Home,
  AdminDashboard,
  ErrorPage,
  Login,
  ProfileDashboard,
  ForgotPassword,
  ResetPassword,
  Signup,
  ShoppingCart,
  TicketHistory,
  AllUsers,
  UpdateUserDetails,
  StandUpComedies,
  MusicalConcerts,
  EditEvent,
  DisplaySearchResult,
  EventDetails,
  Checkout,
  Purchase,
  // UpdatePasword,
} from "./Pages";
import NavBar from "../src/Components/Navbar/Navbar";
import Footer from "../src/Components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AdminRoutes, UserRoutes } from "./ProtectedRoutes";
import GetAllEvents from "./Pages/GetAllEvents/GetAllEvents";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/musical-concerts" element={<MusicalConcerts />} />
          <Route path="/stand-up-comedies" element={<StandUpComedies />} />
          <Route
            path="/DisplaySearchResult"
            element={<DisplaySearchResult />}
          />

          <Route element={<UserRoutes />}>
            <Route path="/user-profile" element={<ProfileDashboard />} />
            <Route path="/user-purchase-ticket" element={<Purchase />} />
            <Route path="/user-shopping-cart" element={<ShoppingCart />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create-event" element={<AdminDashboard />} />
            <Route path="/admin-purchase-ticket" element={<Purchase />} />
            <Route path="/get-all-events" element={<GetAllEvents />} />
            <Route path="/update-event/:eventId" element={<EditEvent />} />
            <Route path="/admin-shopping-cart" element={<ShoppingCart />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/ticket-history" element={<TicketHistory />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/update-user-details" element={<UpdateUserDetails />} />
          {/* <Route path="/change-password" element={<UpdatePasword />} /> */}
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
