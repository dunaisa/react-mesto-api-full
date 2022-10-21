import React from 'react';

const Menu = ({ userEmail, signOut }) => {

  return (
    <div className="header__menu">
      <span className="header__userName">{userEmail}</span>
      <button className="header__logOutBtn" onClick={signOut}>Выйти</button>
    </div >
  );
}

export default Menu;
