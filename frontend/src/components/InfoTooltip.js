import React from 'react';

const InfoTooltip = ({ name, title, isOpen, onClose, children }) => {

  const className = `popup popup-${name} ${isOpen ? 'popup_opened' : ''}`;

  return (

    <div
      className={className}
      onClick={() => onClose()}
    >
      <div className="popup__infotool" onClick={e => e.stopPropagation()}>

        {children}
        <h3 className="popup__infotool-heading">{`${title}`}</h3>

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

export default InfoTooltip;
