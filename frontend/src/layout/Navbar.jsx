import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../assets/css/navbar.css"
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { userlogout } from '../store/redusers/user.reduser';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Redux selectors
  const isUserLogIn = useSelector(state => state.user.userLogin);
  const isDriverLogin = useSelector(state => state.driver.driverLogin);

  // Toggle mobile menu
  const toggleMenu = () => setOpen(!open);

  // Logout handler
  const logoutUser = () => {
    dispatch(userlogout());
    Cookies.remove("usertoken");
  };

  function close(){
    setOpen(false)
  }
  // If driver is logged in, hide the navbar (based on your original logic)
  if (isDriverLogin) return null;

  return (
    <header className="navbar">
      <NavLink className="navbar-brand" to="/">
        Uber
      </NavLink>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        ☰
      </button>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} onClick={close} >
            Home
          </NavLink>
        </li>

        {!isUserLogIn && (
          <li>
            <NavLink to="/driver/signup" className={({ isActive }) => (isActive ? 'active' : '')} onClick={close} >
              Driver Signup
            </NavLink>
          </li>
        )}

        {!isUserLogIn && (
          <li>
            <NavLink to="/driver/login" className={({ isActive }) => (isActive ? 'active' : '')} onClick={close} >
              Driver Login
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to={isUserLogIn ? "/findride" : "/user/signup"}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={close}
          >
            {isUserLogIn ? "Book Ride" : "User Signup"}
          </NavLink>
        </li>

        <li>
          <NavLink
            to={isUserLogIn ? "/previousrides" : "/user/login"}
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={close}
          >
            {isUserLogIn ? "Rides" : "User Login"}
          </NavLink>
        </li>

        {isUserLogIn && (
          <>
            <li>
              <NavLink to="/profile" onClick={close} >Profile</NavLink>
            </li>
            <li>
              <NavLink onClick={logoutUser} >
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
