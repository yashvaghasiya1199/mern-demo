import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./css/navbar.css"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from 'react-redux';
import {userlogout } from '../store/redusers/user.reduser';
export function Navbar() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    const dispatch = useDispatch()

    const isUserLogIn = useSelector(state => state.userlogin.userLogin)
    // console.log(isUserLogIn);
  
    function logoutuser(){
        dispatch(userlogout())
        Cookies.remove("usertoken")
    }

    return (
        <header className="navbar">
            <div className="navbar-brand">Uber</div>

            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>

            <ul className={`nav-links ${open ? 'open' : ''}`}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                </li>
                <li>
                   { isUserLogIn || <NavLink to="/driver/document" className={({ isActive }) => (isActive ? 'active' : '')}>driver document</NavLink>}
                </li>
                <li>
                    {!isUserLogIn && <NavLink to="/driver/signup" className={({ isActive }) => (isActive ? 'active' : '')}>Driver Signup</NavLink>}
                </li>
                <li>
                    <NavLink to={isUserLogIn ? "/findride" : "/user/signup"} className={({ isActive }) => (isActive ? "active" : "")}>{isUserLogIn ? "Book Ride" : "User Signup"}</NavLink>

                </li>
                <li>
                    <NavLink to={isUserLogIn ? "/previousrides" : "/user/login"} className={({ isActive }) => (isActive ? 'active' : '')} >{isUserLogIn ? "Rides" : "User Login"}</NavLink>
                </li>
                <li>
                {isUserLogIn && <NavLink onClick={logoutuser} >Logout</NavLink>}
                </li>
            </ul>
        </header>
    );
}


