import React from "react";
import logoPath from "../images/header-logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoPath}
        alt="логотип-сайта-место-россия"
      />
      <div className="header__container">
        <p className="header__email">{email}</p>
        <Routes>
          <Route
            path="/*"
            element={
              <Link to="/signin" onClick={onSignOut} className="header__link">
                Выйти
              </Link>
            }
          />
          <Route
            path="/signin"
            element={
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/signup"
            element={
              <Link to="/signin" className="header__link">
                Войти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
