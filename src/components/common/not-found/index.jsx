import React from "react";
import img from "../../../assets/ghost-img.png";
import "./index.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <nav className="nav container">
          <div className="nav__menu" id="nav-menu">
            <div className="nav__close" id="nav-close">
              <i className="bx bx-x"></i>
            </div>
          </div>
          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-grid-alt"></i>
          </div>
        </nav>
      </header>
      <main className="main">
        <section className="home">
          <div className="home__container container">
            <div className="home__data">
              <span className="home__subtitle">Error 404</span>
              <h1 className="home__title">Hello User</h1>
              <p className="home__description">
                We can't seem to find the page <br /> you are looking for.
              </p>
              <a onClick={() => navigate("/")} className="home__button">
                Go Home
              </a>
            </div>

            <div className="home__img">
              <img src={img} alt="" />
              <div className="home__shadow"></div>
            </div>
          </div>

          <footer className="home__footer">
            <span>0092518480701</span>
            <span>|</span>
            <span>faheem.piracha@hyphenconsultancy.com</span>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default NotFound;
