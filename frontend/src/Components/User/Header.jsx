import React, { useState, useEffect } from "react";

function Header(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) props.setActive(1);
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-blue-900 text-white py-4">
      <div className="container px-3 mx-auto">
        <div className="flex items-center justify-between">
          <div
            onClick={() => (window.location.href = "/")}
            className="justify-center items-center text-lg font-semibold flex gap-x-2"
          >
            <img
              src="https://www.rssp.org.in/img/bg-img/shahu-maharaj.jpg"
              alt="logo"
              className="h-10"
            />
            Shri CSM Multipurpose Organisation
          </div>
          <button className="lg:hidden focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div
            className={`${
              menuOpen
                ? "block absolute z-1000 w-full h-screen bg-black top-0 left-0"
                : "hidden"
            } lg:flex flex-grow lg:items-center justify-end`}
          >
            <ul className="flex flex-col lg:flex-row lg:gap-y-5 gap-5">
              <li>
                <div
                  onClick={() => {
                    props.setActive(1);
                    if (window.innerWidth < 1024) toggleMenu();
                  }}
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Register
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    props.setActive(2);
                    if (window.innerWidth < 1024) toggleMenu();
                  }}
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Camps
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    props.setActive(3);
                    if (window.innerWidth < 1024) toggleMenu();
                  }}
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Hospitals
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    props.setActive(5);
                    if (window.innerWidth < 1024) toggleMenu();
                  }}
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Employees
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    props.setActive(4);
                    if (window.innerWidth < 1024) toggleMenu();
                  }}
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Donate
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    props.setActive(6);
                    if (window.innerWidth < 1024) toggleMenu();
                  }}
                  className="hover:text-gray-300 cursor-pointer"
                >
                  About Us
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
