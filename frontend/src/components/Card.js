import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({
  card,
  name,
  link,
  likesCount,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `place__delete-button ${
    isOwn ? "place__delete-button" : "place__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like-button ${
    isLiked ? "place__like-button_active" : "place__like-button"
  }`;

  return (
    <article className="place">
      <img
        className="place__photo"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />
      <div className="place__info">
        <h2 className="place__name">{name}</h2>
        <div className="place__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => onCardLike(card)}
          />
          <p className="place__likes-count">{likesCount}</p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={() => onCardDelete(card)}
      />
    </article>
  );
};

export default Card;
