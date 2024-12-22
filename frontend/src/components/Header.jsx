import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };
  return (
    <header className="headings p-3 ">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="titleheader">
            StockQuest
          </Link>
          <ul className="nav mx-auto mb-0">
            <li>
              <Link to="/dashboard" className="nav-link px-3">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="nav-link px-3">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/market" className="nav-link px-3">
                Market
              </Link>
            </li>
            <li>
              <Link to="/chat" className="nav-link px-3 ">
                Chat
              </Link>
            </li>
            <li>
              <Link to="/learn" className="nav-link px-3 ">
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
