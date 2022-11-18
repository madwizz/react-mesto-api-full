import React from "react";

function ImagePopup({ card, onClose, isOpen }) {
  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      return () => {
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [isOpen, onClose]);

  return (
    <section className={`popup popup_photo ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__photo-content">
        <button
          className="popup__close-button popup__close-button_photo"
          onClick={onClose}
          type="button"
        ></button>
        <img className="popup__photo-image" src={card.link} alt={card.name} />
        <p className="popup__photo-name">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
