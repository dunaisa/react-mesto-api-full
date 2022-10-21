import React from 'react';

function PopupWithForm({ name, title, children, btnText, isOpen, onClose, onSubmit }) {
  const className = `popup popup-${name} ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div
      className={className}
      onClick={() => onClose()}
    >
      <div className="popup__container" onClick={e => e.stopPropagation()}>
        <h3 className="popup__container-heading">{`${title}`}</h3>
        <form action="submit" name={`${name}-form`} method="post" className="popup-form popup-form_avatar" onSubmit={onSubmit}>
          {children}
          <button className="popup-form__btn" type="submit" >{`${btnText}`}</button>
        </form>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"
          onClick={() => { onClose() }}
        ></button>
      </div>
    </div >
  );
}

export default PopupWithForm;