import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("props", props.mode)
  return (
    <nav className="bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Left section (Logo or Menu toggle on small screens) */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:justify-start">
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  Book Home
                </Link>
                <Link to="/booktableshow" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                  Books Address Show
                </Link>
              </div>
            </div>
          </div>

          {/* Dark/Light Mode toggle mode 🌙☀️ */}
          <div className="flex items-center">
            <button onClick={props.toggleMode}
              type="button"
              className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="absolute -inset-1.5"></span>
              {/* <p onClick={modeChange}>☀️'</p> */}
              <p  className="cursor-pointer text-xl px-4" title="Toggle Dark Mode">
                {props.mode === "light" ? "🌙" : "☀️"}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu  */}
      {isMobileMenuOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 space-y-1" id="mobile-menu">
          <Link to="/" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Book Home
          </Link>
          <Link to="/booktableshow" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Books Address Show
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
