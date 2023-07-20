import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
// import { resetUserData, registerUser } from "../../../store/Slices/UserData";
//import React, { useState } from 'react'; // for search
import {
  UserIcon,
  PresentationChartLineIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { SearchEvents } from "../../Pages/Search/SearchEvents";

const NavBar = () => {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.User);

  const handleLogin = () => {
    // dispatch(
    //   registerUser({
    //     token: "lsidjciuhsdyuweduhweiudh",
    //     role: "User",
    //   }),
    // );
  };
  //const [searchTerm, setSearchTerm] = useState('');

  //const handleSearch = () => {
  // Implement the search logic here
  //  console.log('Searching for:', searchTerm);
  //};
  //
  return (
    <div className="">
      <nav className="navbar">
        <div className="nav-container container">
          <div className="left-container">
            <ul className="nav-list">
              <li>
                <Link to="/" className="nav-link" aria-current="page">
                  ticketBlaster
                </Link>
              </li>
              <li>
                <Link to="/musical-concerts" className="nav-link">
                  Musical Concerts
                </Link>
              </li>
              <li>
                <Link to="/stand-up-comedies" className="nav-link">
                  Stand-Up Comedies
                </Link>
              </li>
            </ul>
          </div>
          <div className="right-container">
            <div className="search-container">
              <SearchEvents />
            </div>
            {token === "" && (
              <>
                <Link
                  to="/login"
                  className="login-button"
                  onClick={handleLogin}
                >
                  Log in
                </Link>
                <Link to="/create-user" className="create-account-button">
                  Create Account
                </Link>
              </>
            )}
            {token !== "" && role === "user" && (
              <>
                <Link to="/shopping-cart">
                  <ShoppingCartIcon className="user-shopping-button" />
                </Link>
                <Link to="/user-profile">
                  <UserIcon className="user-profile-button" strokeWidth={2} />
                </Link>
              </>
            )}

            {token !== "" && role === "admin" && (
              <>
                <Link to="/shopping-cart">
                  <ShoppingCartIcon className="user-shopping-button" />
                </Link>
                <Link to="/get-all-events">
                  <PresentationChartLineIcon className="user-profile-button" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
