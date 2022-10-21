import React from 'react';
import PopupWithForm from './PopupWithForm.js';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="change-photo" title="Обновить аватар" btnText="Сохранить">

      <fieldset className="popup-form__set">
        <label className="popup-form__field">
          <input ref={avatarRef} type="url" placeholder="Ссылка на картинку" name="link-input"
            className="popup-form__text popup-form__text_type_place-reference" id="avatar-input" required />
          <span className="avatar-input-error popup-form__input-error"></span>
        </label>
      </fieldset>

    </PopupWithForm>
  );
}

export default EditAvatarPopup;
