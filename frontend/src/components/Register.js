import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ password, email });
  }


  return (
    <div className="register">
      <h3 className="register__heading">Регистрация</h3>

      <form action="post" className="register-form" onSubmit={handleSubmit}>
        <fieldset className="register-form__fieldset">

          <label htmlFor="email" className="register-form__field">
            <input
              className="register-form__text"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email" />
          </label>

          <label htmlFor="password" className="register-form__field">
            <input
              className="register-form__text"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Пароль" />
          </label>

        </fieldset>

        <button type="submit" className="register-form__btn">Зарегистрироваться</button>

      </form>
      <div className="register__signin">
        <span className="register__signin register__signin_text">Уже зарегистрированы?
        </span>
        <Link to="/sign-in" className="register__signin register__signin_link">Войти</Link>
      </div>

    </div>
  );
}

export default Register;
