import { useState, useEffect } from 'react';
import img from "../assets/logo-no-background.png";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import {HashLink} from "react-router-hash-link";


function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by reading from session storage
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userData');
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between bg-zinc-100 p-6">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <img src={img} alt="logo" className="mr-2 h-18 w-20 fill-current" />
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center rounded border border-slate-900 px-3 py-2 hover:border-black hover:text-slate-600"
          >
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`w-full flex-grow lg:flex lg:w-auto lg:items-center ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          {/* Navigation links */}
          <div className="text-sm lg:flex-grow">
            <Link to={"/"}><a
              
              className="mr-4 mt-4 block text-neutral-800 hover:text-neutral-600 lg:mt-0 lg:inline-block"
            >
              Home
            </a>
            </Link>
            <HashLink to={"/#about"}>
            <a
             
              className="mr-4 mt-4 block text-neutral-800 hover:text-neutral-600 lg:mt-0 lg:inline-block"
            >
              About Us
            </a>
            </HashLink>
            <Link to={"/design"}>
            <a
             className="mt-4 block text-neutral-800 hover:text-neutral-600 lg:mt-0 lg:inline-block"
            >
              Design
            </a>
            </Link>
          </div>
          {/* Conditionally render Sign up button or user menu based on login state */}
          {isLoggedIn ? (
            <Menu>
              <MenuHandler>
                <IconButton variant="text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                  </svg>
                </IconButton>
              </MenuHandler>
              <MenuList>
              <Link to={"/profile"}><MenuItem>Profile</MenuItem></Link> 
                <MenuItem>Tracker</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/register" className="mt-4 inline-block rounded border border-black px-4 py-2 text-sm leading-none text-neutral-800 hover:border-transparent hover:bg-black hover:text-white lg:mt-0">
              Sign Up
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
