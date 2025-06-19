import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Context } from "../Context/UserContext";
import { useContext } from "react";

const Header = ({ user, isLoggedIn, setisLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userdata } = useContext(Context);

  const getImageSrc = () => {
    if (userdata.image && userdata.image.data) {
      return `data:image/jpeg;base64,${btoa(
        new Uint8Array(userdata.image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      )}`;
    }
    return defaultProfileImage; // Use default image if no profile picture is available
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-blue-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              className="w-10 h-10 object-cover rounded-lg"
              src={Logo}
              alt="Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                >
                  Dashboard
                </Link>
                <Link
                  to="/Logout"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                >
                  Logout
                </Link>

                {/* User Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500"
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={getImageSrc()}
                      alt="User Profile"
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link
                        to="/User/Profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/Visualization"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Visualization
                      </Link>
                      <Link
                        to="/User/Settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <Link
                        to="/HowToUse"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        How To Use
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/Register"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  Register
                </Link>
                <Link
                  to="/Login"
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  Login
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-blue-600 py-4">
            {isLoggedIn ? (
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  className="block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/Logout"
                  className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Logout
                </Link>

                {/* Mobile User Menu */}
                <div className="border-t border-blue-600 pt-3 mt-3">
                  <div className="flex items-center mb-3">
                    <img
                      className="h-8 w-8 rounded-full object-cover mr-3"
                      src={
                        user?.image
                          ? `data:image/jpeg;base64,${user.image}`
                          : "/images/profile.png"
                      }
                      alt="User Profile"
                    />
                    <span className="text-white text-sm">
                      {user?.name || "User"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Link
                      to="/User/Profile"
                      className="block text-gray-200 hover:text-white px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/Visualization"
                      className="block text-gray-200 hover:text-white px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Visualization
                    </Link>
                    <Link
                      to="/User/Settings"
                      className="block text-gray-200 hover:text-white px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      to="/HowToUse"
                      className="block text-gray-200 hover:text-white px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      How To Use
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/Register"
                  className="block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/Login"
                  className="block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
