import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputAvatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }
  useEffect(() => {
    inputAvatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label" htmlFor="avatar">
        <input
          id="avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          type="url"
          ref={inputAvatarRef}
          required
          className="popup__info popup__info_input_avatar"
        />
        <div className="popup__error-message-container">
          <span id="avatar-error" className="popup__error-message"></span>
        </div>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
