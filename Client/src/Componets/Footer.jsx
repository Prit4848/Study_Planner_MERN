import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    // Disable navigation links if current path matches
    const currentUrl = window.location.pathname;
    const homeButton = document.getElementById("home-button");
    const dashboardButton = document.getElementById("dashboard-button");

    if (currentUrl === "/home" && homeButton) {
      homeButton.classList.add("bg-gray-300", "cursor-not-allowed");
      homeButton.href = "javascript:void(0)";
    }

    if (currentUrl === "/dashboard" && dashboardButton) {
      dashboardButton.classList.add("bg-gray-300", "cursor-not-allowed");
      dashboardButton.href = "javascript:void(0)";
    }
  }, []);

  const toggleDropdown = () => {
    const dropdown = document.getElementById("user-dropdown");
    if (dropdown) dropdown.classList.toggle("hidden");
  };

  const closeDropdownOnClickOutside = (event) => {
    if (!event.target.closest("#user-menu-button")) {
      const dropdown = document.getElementById("user-dropdown");
      if (dropdown && !dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeDropdownOnClickOutside);
    return () => window.removeEventListener("click", closeDropdownOnClickOutside);
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-500 p-4">
      <div className="md:w-2/3 w-full text-white flex flex-col animate-fade-in">
        <div className="w-full text-4xl md:text-6xl font-bold animate-slide-in-left">
          <h1 className="w-full md:w-2/3 text-center md:text-left">
            How can we help you? Get in touch
          </h1>
        </div>
        <div className="flex flex-col mt-4 md:flex-row md:justify-between">
          <p className="w-full md:w-2/3 text-gray-300 text-center md:text-left animate-slide-in-right">
            Any query? Contact us and ask. We will reach a solution as soon as possible.
          </p>
          <div className="w-full md:w-44 pt-6 md:pt-0 animate-bounce flex justify-center md:justify-end">
            <Link
              to={'/ContactUs'}
              className="bg-red-500 text-center rounded-lg shadow px-10 py-3 flex items-center justify-center hover:animate-pulse"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-28 mt-8 mb-8 justify-center md:justify-start animate-fade-in">
          {[
            { to:'/AboutUs', label: "About" },
            { to:'/Features', label: "Features" },
            { to:'/WhyUs', label: "Why Us" },
            { to:'/Support', label: "Support" },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="cursor-pointer text-gray-300 hover:text-white uppercase hover:animate-pulse text-center"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <hr className="border-gray-600 my-4 w-full" />
        <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0">
          <div className="flex justify-center md:justify-start space-x-8">
            {/* Social media icons can be added here */}
          </div>
          <p className="w-full text-center text-xs md:text-base text-gray-300 animate-slide-in-up">
            Copyright © 2024 prit415
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
