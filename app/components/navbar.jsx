'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/#about", label: "< ABOUT />" },
    { href: "/#experience", label: "< EXPERIENCE />" },
    { href: "/#skills", label: "< SKILLS />" },
    { href: "/#education", label: "< EDUCATION />" },
    { href: "/blog", label: "< BLOGS />" },
    { href: "/#projects", label: "< PROJECTS />" },
  ];

  // ✅ Disable background scroll on mobile when menu is open
  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup (important for route changes)
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-transparent relative">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-3xl font-bold"
          >
            {"< Sathick Batcha />"}
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex lg:space-x-1 lg:items-center">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href={item.href}
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-[#1a1443] z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          <button
            className="absolute top-6 right-6 text-white text-2xl hover:text-pink-600 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>

          <ul className="flex flex-col space-y-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  className="block py-4 no-underline outline-none hover:no-underline border-b border-gray-700"
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="text-lg text-white transition-colors duration-300 hover:text-pink-600 text-center">
                    {item.label}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pb-10 text-center">
            <div className="text-[#16f2b3] text-xl font-bold">
              {"< Sathick Batcha />"}
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Full Stack Developer
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
