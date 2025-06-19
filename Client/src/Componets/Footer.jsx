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
    <footer className="w-full bg-blue-500 py-12 px-4 mt-auto">
      <div className="max-w-6xl mx-auto text-white">
        {/* Main CTA Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <div className="flex-1 mb-6 lg:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center lg:text-left animate-slide-in-left">
              How can we help you? Get in touch
            </h2>
            <p className="text-gray-300 text-center lg:text-left animate-slide-in-right">
              Any query? Contact us and ask. We will reach a solution as soon as possible.
            </p>
          </div>
          <div className="animate-bounce">
            <Link
              to="/ContactUs"
              className="bg-red-500 text-center rounded-lg shadow px-8 py-3 inline-block hover:animate-pulse transition-all duration-300 hover:bg-red-600"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8 animate-fade-in">
          {[
            { to: "/AboutUs", label: "About" },
            { to: "/Features", label: "Features" },
            { to: "/WhyUs", label: "Why Us" },
            { to: "/Support", label: "Support" },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="text-gray-300 hover:text-white uppercase hover:animate-pulse transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-gray-600 mb-6" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            {/* Social media icons placeholder */}
            <div className="text-gray-400 text-sm">
              Follow us on social media
            </div>
          </div>
          <p className="text-gray-300 text-sm animate-slide-in-up">
            Copyright © 2024 prit415
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;