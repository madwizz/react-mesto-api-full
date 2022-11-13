import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }
  function handleNewCardName(evt) {
    setName(evt.target.value);
  }
  function handleNewCardLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label" htmlFor="place-name">
        <input
          id="place-name"
          name="name"
          placeholder="Название"
          type="text"
          required
          minLength="2"
          maxLength="30"
          className="popup__info popup__info_input_place-name"
          onChange={handleNewCardName}
          value={name}
        />
        <div className="popup__error-message-container">
          <span id="place-name-error" className="popup__error-message"></span>
        </div>
      </label>
      <label className="popup__label" htmlFor="place-link">
        <input
          id="place-link"
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
          required
          className="popup__info popup__info_input_place-link"
          onChange={handleNewCardLink}
          value={link}
        />
        <div className="popup__error-message-container">
          <span id="place-link-error" className="popup__error-message"></span>
        </div>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
