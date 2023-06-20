import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
// import { resetUserData, registerUser } from "../../../store/Slices/UserData";
import { logout } from "../../store/Slices/userSlice";
import { UserIcon } from "@heroicons/react/24/outline"

const NavBar = () => {

  const { token, role } = useSelector((state) => state.User);

  const dispatch = useDispatch();
  // const handleLogout = () => {
  //   dispatch(resetUserData());
  // };

  const handleLogin = () => {
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
                >
                  Log in
                </Link>
                <Link to="/create-user" className="create-account-button">
                  Create Account
                </Link>
              </>
            )}
            {token !== "" && (
              <>
                <Link to="/user-profile">
                  <UserIcon className="h-6 w-6" strokeWidth={2} />
                </Link>
                <button className="logout-button" onClick={() => dispatch(logout())}>
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
