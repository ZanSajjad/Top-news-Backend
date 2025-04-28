import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Navbar(props) {
  const navigate = useNavigate(); // For programmatic navigation
  
  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from localStorage
    navigate("/login"); // Redirect to the login page after logout
  };

  // Check if user is logged in by checking localStorage for the token
  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark position-relative fixed-top bg-light py-4">
        <div className="container-xxl">
          <Link className="navbar-brand pb-0 me-5 ms-2" to="/">
             <img src="/abcedd.png" alt="logo"  style={{height:"48px"}} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sport
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>

            <div className="darkMode">
              <img
                className="pe-4"
                onClick={props.togglemode}
                style={{ height: "24px" }}
                src={props.mode === "light" ? "/moon-stars.svg" : "/brightness-high-fill.svg"}
                alt={props.mode === "light" ? "enable darkmode" : "enable light mode"}
              />
              {isLoggedIn ? (
                <button onClick={handleLogout} className="btn rounded-pill btn-primary me-2 px-3">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn rounded-pill btn-primary me-2 px-3">LOGIN</button>
                  </Link>
                  {/* <Link to="/signup">
                    <button className="btn rounded-pill btn-primary px-3">SIGNUP</button>
                  </Link> */}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
