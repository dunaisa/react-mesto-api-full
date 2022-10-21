import React from 'react';
import InfoTooltip from './InfoTooltip';
import InfoTooltipImg from '../images/InfoToolTipSuccess.png';

const InfoTooltipSuccess = ({ isOpen, onClose }) => {
  return (
    <InfoTooltip name="info-tool" title="Вы успешно зарегистрировались!" isOpen={isOpen} onClose={onClose}>
      <img src={InfoTooltipImg} alt="Успешная авторизация" className="popup__infotool-icon" />
    </InfoTooltip>
  );
}

export default InfoTooltipSuccess;