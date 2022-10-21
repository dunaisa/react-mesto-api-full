import React, { useState } from 'react';

const Login = ({ onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function resetForm() {
    setEmail('');
    setPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !email) {
      return
    }
    resetForm();
    onLogin({ password, email });
  }

  return (
    <div className="login">
      <h3 className="login__heading">Вход</h3>

      <form onSubmit={handleSubmit} className="login-form">
        <fieldset className="login-form__fieldset">

          <label htmlFor="email" className="login-form__field">
            <input
              className="login-form__text"
              required
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={handleNameChange}
              placeholder="Электронный адрес" />
          </label>

          <label htmlFor="password" className="login-form__field">
            <input
              className="login-form__text"
              required
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Пароль" />
          </label>

        </fieldset>

        <button type="submit" className="login-form__btn">Войти</button>

      </form>

    </div>
  );
}

export default Login;
