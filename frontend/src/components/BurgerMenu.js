import React from 'react';

const BurgerMenu = ({ userEmail, signOut, active }) => {
  return (
    <div className={`header-burger-menu ${active ? "header-burger-menu_active" : ""}`}>
      <span className="header__userName">{userEmail}</span>
      <button className="header__logOutBtn" onClick={signOut}>Выйти</button>
    </div>
  );
}

export default BurgerMenu;
