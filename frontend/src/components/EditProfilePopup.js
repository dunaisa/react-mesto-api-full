import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [about, setDescription] = React.useState('');

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, about });
  }

  return (

    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} btnText="Сохранить" onSubmit={handleSubmit}>
      <fieldset className="popup-form__set">
        <label className="popup-form__field">
          <input value={name} onChange={handleNameChange} type="text" placeholder="Имя" name="name"
            className="popup-form__text popup-form__text_type_author-name" id="name-input" required minLength="2"
            maxLength="40" />
          <span className="name-input-error popup-form__input-error"></span>
        </label>
        <label className="popup-form__field">
          <input value={about} onChange={handleAboutChange} type="text" placeholder="О cебе" name="about"
            className="popup-form__text popup-form__text_type_description" id="description-input" required minLength="2"
            maxLength="200" />
          <span className="description-input-error popup-form__input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
