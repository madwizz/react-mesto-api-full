import React, { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label" htmlFor="profile-name">
        <input
          id="profile-name"
          name="name"
          placeholder="Имя"
          type="text"
          required
          minLength="2"
          maxLength="40"
          className="popup__info popup__info_input_profile-name"
          value={name || ""}
          onChange={handleChangeName}
        />
        <div className="popup__error-message-container">
          <span id="profile-name-error" className="popup__error-message"></span>
        </div>
      </label>
      <label className="popup__label" htmlFor="profile-title">
        <input
          id="profile-title"
          name="about"
          placeholder="О себе"
          type="text"
          required
          minLength="2"
          maxLength="200"
          className="popup__info popup__info_input_profile-title"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <div className="popup__error-message-container">
          <span
            id="profile-title-error"
            className="popup__error-message"
          ></span>
        </div>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
