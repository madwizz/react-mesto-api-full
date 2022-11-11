import React from "react";
import success from "../images/successImg.svg";
import failure from "../images/failureImg.svg";

const InfoTooltip = ({ isOpen, onClose, isRegister }) => {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__tooltip">
        <button
          className="popup__close-button popup__close-button_tooltip"
          onClick={onClose}
        ></button>
        <div className="popup__status-container">
          <img
            alt=""
            className="popup__tooltip-img"
            src={isRegister ? success : failure}
          />
          <p className="popup__tooltip-title">
            {isRegister
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
