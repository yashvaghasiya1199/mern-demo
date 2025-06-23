import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../assets/css/navbar.css"
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { userlogout } from '../store/redusers/user.reduser';

export function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  // if here i write boolean then not work
  const isUserLogIn = useSelector((state:any) => state.user.userLogin);
  const isDriverLogin = useSelector((state:any) => state.driver.driverLogin);

  // Toggle mobile menu
  const toggleMenu = () => setOpen(!open);

  // Logout handler
  const logoutUser = ():void => {
    dispatch(userlogout());
    Cookies.remove("usertoken");
  };

  function close():void{
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
              <NavLink to="/" onClick={logoutUser} >
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
