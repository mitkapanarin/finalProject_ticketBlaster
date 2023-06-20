import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
// import { resetUserData, registerUser } from "../../../store/Slices/UserData";
import { logout } from "../../store/Slices/userSlice";
import {
  UserIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

const NavBar = () => {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.User);

  const handleLogin = () => {
    dispatch(
      registerUser({
        token: "lsidjciuhsdyuweduhweiudh",
        role: "User",
      })
    );
  };

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
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
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
              <Link to="/user-profile">
                <UserIcon className="user-profile-button" strokeWidth={2} />
              </Link>
            )}

            {token !== "" && role === "admin" && (
              <Link to="/admin-dashboard">
                <PresentationChartLineIcon className="user-profile-button" />
              </Link>
            )}

            {token !== "" && (
              <button
                className="logout-button"
                onClick={() => dispatch(logout())}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;