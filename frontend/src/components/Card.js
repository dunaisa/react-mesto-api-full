import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const userContext = React.useContext(CurrentUserContext);

  const { name, link, _id, owner: { _id: ownerId } } = card;
  const likes = card.likes.map((item) => item._id)

  function handleClick() {
    onCardClick(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = ownerId === userContext._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.includes(userContext._id);

  function hadleLikeClick() {
    onCardLike(_id, isLiked);
  }

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__delete-btn ${!isOwn ? 'element__delete-btn_hidden' : ''}`;

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-btn ${isLiked ? 'element__like-btn_active' : ''}`;

  function handleDeleteClick() {
    onCardDelete(_id);
  }

  return (
    <li className="element">
      <img src={link} alt={name} className="element__image" onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__info-heading">{name}</h2>
        <button className={cardLikeButtonClassName} type="button" ariaria-label="Лайк" onClick={hadleLikeClick}></button>
        <span className="element__like-counter">{likes.length}</span>
      </div>
      <button className={cardDeleteButtonClassName} type="button" ariaria-label="Удалить" onClick={handleDeleteClick} ></button>
    </li>
  );
}

export default Card;