import React from 'react';
import headerLogo from '../images/logo.svg';

function Header({ children }) {

  return (
    <header className="header">
      <div className="header__container">
        <img src={headerLogo} alt="Логотип" className="header__logo" />
        {children}

      </div>
    </header>
  );
}

export default Header;