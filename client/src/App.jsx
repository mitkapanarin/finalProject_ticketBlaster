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
  // GetAllEvents,
  StandUpComedies,
  MusicalConcerts,
  AdminCreateEvent,
  CartPage,
} from "./Pages";
import { EventPage } from "./components/DetailedEvent/EventPage";
import { EventDetails } from "./components/DetailedEvent/EventDetails";
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
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/ticket-history" element={<TicketHistory/>}/>
          <Route path="/all-users" element={<AllUsers/>}/>
          <Route path="/create-event" element={<AdminCreateEvent />} />
          {/* <Route path="/all-events" element={<GetAllEvents/>}/> */}
          <Route path="/update-user-details" element={<UpdateUserDetails/>}/>
          <Route exact path="/events" element={<EventPage/>} />
          <Route exact path="/events/:eventId" element={<EventDetails/>} />
          <Route exact path="/cart-page" element={<CartPage />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
