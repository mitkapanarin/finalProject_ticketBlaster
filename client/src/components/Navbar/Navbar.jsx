import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
// import { resetUserData, registerUser } from "../../../store/Slices/UserData";
import { logout } from "../../store/Slices/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((x) => x);
  const token = state.User.token;
  // const handleLogout = () => {
  //   dispatch(resetUserData());
  // };

  const handleLogin = () => {
    dispatch(
      registerUser({
        token: "lsidjciuhsdyuweduhweiudh",
        role: "User"
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
            {token !== "" && (
              <button className="logout-button" onClick={() => dispatch(logout())}>
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
