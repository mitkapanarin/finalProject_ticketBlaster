import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";

import {
  UserIcon,
  PresentationChartLineIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { SearchEvents } from "../../Pages/Search/SearchEvents";

const NavBar = () => {
  const { token, role } = useSelector((state) => state.User);

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
                <Link to="/user-shopping-cart">
                  <ShoppingCartIcon className="user-shopping-button" />
                </Link>
                <Link to="/user-profile">
                  <UserIcon className="user-profile-button" />
                </Link>
              </>
            )}

            {token !== "" && role === "admin" && (
              <>
                <Link to="/admin-shopping-cart">
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



