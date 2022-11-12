import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = data;
    onRegister({ email, password });
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Регистрация</h2>
        <label htmlFor="email" className="auth__label"></label>
        <input
          type="email"
          className="auth__input auth__input_email"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="auth__label"></label>
        <input
          type="password"
          className="auth__input auth__input_password"
          id="password"
          name="password"
          placeholder="Пароль"
          required
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>
      </form>
      <div className="auth__container">
        <p className="auth__caption">Уже зарегистрированы?</p>
        <Link to="/signin" className="auth__sign-in">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
