import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="w-11/12 mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              (Smart Asset) Asset Management System helps businesses track and manage
              their assets efficiently. Simplify your operations with our
              reliable solutions.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col justify-center items-center text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/joinAsEmployee"
                  className="hover:text-white transition-colors duration-200"
                >
                  Join as Employee
                </Link>
              </li>
              <li>
                <Link
                  to="/joinAsHrManager"
                  className="hover:text-white transition-colors duration-200"
                >
                  Join as HR Manager
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className="text-sm">Email: support@xyz.com</p>
            <p className="text-sm">Phone: +1-234-567-890</p>
            <p className="text-sm">Address: 123 Business Lane, NY</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            &copy; 2025 (SmartAsset) Asset Management System. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
