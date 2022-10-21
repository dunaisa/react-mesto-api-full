import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {

  const [pictureName, setPictureName] = React.useState('');
  const [pictureLink, setPictureLink] = React.useState('');

  React.useEffect(() => {
    if (isOpen) {
      setPictureName('');
      setPictureLink('')
    }
  }, [isOpen]);

  function handleTitleChange(e) {
    setPictureName(e.target.value);
  }

  function handleLinkChange(e) {
    setPictureLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: pictureName,
      link: pictureLink
    });
  }

  return (
    <PopupWithForm name="add-place" title="Новое место" isOpen={isOpen} onClose={onClose} btnText="Создать" onSubmit={handleSubmit}>
      <fieldset className="popup-form__set">
        <label className="popup-form__field">
          <input type="text" placeholder="Название" name="name"
            value={pictureName}
            onChange={handleTitleChange}
            className="popup-form__text popup-form__text_type_place-name" id="place-input" required minLength="2"
            maxLength="30" />
          <span className="place-input-error popup-form__input-error"></span>
        </label>
        <label className="popup-form__field">
          <input type="url" placeholder="Ссылка на картинку" name="link"
            value={pictureLink}
            onChange={handleLinkChange}
            className="popup-form__text popup-form__text_type_place-reference" id="reference-input" required />
          <span className="reference-input-error popup-form__input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
