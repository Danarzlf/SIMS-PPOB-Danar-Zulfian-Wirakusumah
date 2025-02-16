import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Images
import Logo from "../../assets/img/Logo.png";

export const Navbar = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-300 py-4 fixed w-full top-0 z-50">
      <div className="w-[90%] max-w-7xl flex items-center justify-between mx-auto">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="Flowbite Logo" />
          <p className="text-lg font-semibold text-slate-600 md:text-xl">
            SIMS PPOB
          </p>
        </a>

        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 z-60" 
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden md:flex md:space-x-8">
          <Link
            to={"/top-up"}
            className={`${
              location.pathname === "/top-up"
                ? "text-orange-600"
                : "text-slate-700"
            } font-semibold`}
          >
            Top Up
          </Link>
          <Link
            to={"/history"}
            className={`${
              location.pathname === "/history"
                ? "text-orange-600"
                : "text-slate-700"
            } font-semibold`}
          >
            Transaction
          </Link>
          <Link
            to={"/account"}
            className={`${
              location.pathname === "/account"
                ? "text-orange-600"
                : "text-slate-700"
            } font-semibold`}
          >
            Akun
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40"
        ></div>
      )}

      <NavbarToggle isOpen={isOpen} location={location} />
    </nav>
  );
};

const NavbarToggle = ({ isOpen, location }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <ul className="flex flex-col p-4 mt-16 space-y-4 border-t border-gray-200">
        <li>
          <Link
            to={"/top-up"}
            className={`${
              location.pathname === "/top-up"
                ? "text-orange-600"
                : "text-slate-700"
            } block font-semibold`}
            onClick={() => window.scrollTo(0, 0)}
          >
            Top Up
          </Link>
        </li>
        <li>
          <Link
            to={"/history"}
            className={`${
              location.pathname === "/history"
                ? "text-orange-600"
                : "text-slate-700"
            } block font-semibold`}
            onClick={() => window.scrollTo(0, 0)}
          >
            Transaction
          </Link>
        </li>
        <li>
          <Link
            to={"/account"}
            className={`${
              location.pathname === "/account"
                ? "text-orange-600"
                : "text-slate-700"
            } block font-semibold`}
            onClick={() => window.scrollTo(0, 0)}
          >
            Akun
          </Link>
        </li>
      </ul>
    </div>
  );
};
