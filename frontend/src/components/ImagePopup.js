import React from 'react';

function ImagePopup(props) {

  return (
    <div className={`popup popup-${props.name} popup_overlay-${props.name} ${props.card.isOpen ? 'popup_opened' : ''}`} onClick={() => props.onClose()}>
      <div className="popup__container-figure" onClick={e => e.stopPropagation()}>
        <figure className="popup__figure">
          <img src={`${props.card.card.link}`} alt={props.card.card.name} className="popup__image-figure" />
          <figcaption className="popup__image-figcaption">{props.card.card.name}</figcaption>
        </figure>
        <button
          className="popup__close-btn popup__close-btn_type_open-pic"
          type="button"
          aria-label="Закрыть"
          onClick={() => { props.onClose() }}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
