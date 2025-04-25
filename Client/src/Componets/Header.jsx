import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"

const Header = ({ user, isLoggedIn,setisLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-blue-500 p-2 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <img
          className="w-12 h-12  object-cover"
          src={Logo}
          alt="Logo"
        />

        {/* Hamburger menu for mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation menu */}
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } flex-col lg:flex lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-2 mb-2`}
        >
          {isLoggedIn ? (
            <>
              <Link
                to={'/Logout'}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out block"
              >
                Logout
              </Link>
              <a
                href="/dashboard"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out block mt-2"
              >
                Dashboard
              </a>
              <div className="relative mt-2 ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      user?.image
                        ? `data:image/jpeg;base64,${user.image}`
                        : "/images/profile.png"
                    }
                    alt="User Profile"
                  />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 z-50 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                  >
                    <Link
                    to={'/User/Profile'}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to={'/Visualization'}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Visualization
                    </Link>
                    <Link
                      to={'/User/Settings'}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <Link
                    to={"/HowToUse"}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      How To Use
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center mt-2">
                <Link
                to="/Register"
                className="bg-blue-600 hover:bg-gray-400 text-white py-2 px-4 rounded-md mr-4 transition duration-300 block"
              >
                Register
              </Link>
              <Link
                to="/Login"
                className="bg-green-600 hover:bg-gray-400 text-white py-2 px-4 rounded-md mr-4 transition duration-300 block"
              >
                Login
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
