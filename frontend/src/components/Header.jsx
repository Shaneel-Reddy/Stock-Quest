import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };
  return (
    <header className="headings p-3 text-white">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="titleheader">
            StockQuest
          </Link>
          <ul className="nav mx-auto mb-0">
            <li>
              <Link to="/dashboard" className="nav-link px-3 text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="nav-link px-3 text-white">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/market" className="nav-link px-3 text-white">
                Market
              </Link>
            </li>
            <li>
              <Link to="/chat" className="nav-link px-3 text-white">
                Chat
              </Link>
            </li>
            <li>
              <Link to="/learn" className="nav-link px-3 text-white">
                Learn
              </Link>
            </li>
          </ul>

          <div className="dropdown text-end">
            <a
              href="#"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSyBbjTDt-hfhjuJsMP82aeeML1nZ7a0qeQ&s"
                alt="mdo"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </a>
            <ul
              className="dropdown-menu text-small"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
