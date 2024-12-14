import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MoviesContext } from "../context/Store";

export default function Navbar() {
  let { logOut, userData } = useContext(MoviesContext);

  return (
    <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
      <div className="container">
        <Link className="navbar-brand fs-2" to="home">
          Noxe
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
          {userData && (
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="people">
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="tv">
                  TV
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex align-items-center ms-auto mb-2 mb-lg-0">
            <li className="nav-item  me-5">
              <i className="mx-2 fs-4 fa-brands fa-facebook"></i>
              <i className="mx-2 fs-4 fa-brands fa-twitter"></i>
              <i className="mx-2 fs-4 fa-brands fa-square-instagram"></i>
            </li>
            {userData == null && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              {userData && (
                <Link className="nav-link"
                to="login" 
                onClick={logOut}>
                LogOut
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
