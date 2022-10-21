import React from 'react';
import InfoTooltip from './InfoTooltip';
import InfoTooltipImg from '../images/InfoTooltipImgError.png';

const InfoTooltipError = ({ isOpen, onClose }) => {
  return (
    <InfoTooltip name="info-tool" title="Что-то пошло не так! Попробуйте ещё раз." isOpen={isOpen}
      onClose={onClose}>
      <img src={InfoTooltipImg} alt="Ошибка" className="popup__infotool-icon" />
    </InfoTooltip>
  );
}

export default InfoTooltipError;
