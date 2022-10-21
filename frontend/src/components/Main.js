import React from 'react';

import Card from './Card.js'

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) => {

  const userContent = React.useContext(CurrentUserContext);

  return (

    <main className="content">
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__avatar-btn">
          <img src={userContent.avatar} alt="Аватар профиля" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{userContent.name}</h1>
          <p className="profile__subtitle">{userContent.about}</p>
          <button onClick={onEditProfile} className="profile__edit-btn" type="button" ariaria-label="Редактировать"></button>
        </div>
        <button onClick={onAddPlace} className="profile__add-btn" type="button" ariaria-label="Добавить"></button>
      </section>

      <section className="elements">
        {cards.map((card) => (

          < Card
            key={card._id}
            src={card.link}
            title={card.name}
            likes={card.likes}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            card={card}
            onCardDelete={onCardDelete}
          />

        ))}
      </section>
    </main>

  );
}

export default Main;