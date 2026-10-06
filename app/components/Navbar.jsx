"use client";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Logo from "./Logo";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Experience",
    path: "#experience",
  },
  {
    title: "Music",
    path: "#spotify",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed mx-auto top-0 left-0 right-0 z-10 bg-ink/80 backdrop-blur border-b border-blue-300/15">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <a href="/" aria-label="Christian Rodrigues, home">
          <Logo />
        </a>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              aria-label="Open menu"
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-blue-300/30 text-blue-200 hover:text-white hover:border-signal"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              aria-label="Close menu"
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-blue-300/30 text-blue-200 hover:text-white hover:border-signal"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
