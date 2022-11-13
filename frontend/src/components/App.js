import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [IsAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  const [deletedCard, setDeletedCard] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          setCards(cards);
        })
        .catch((error) => console.log(error));
    }
  }, [isLogged]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleConfirmDeleteCardPopup = (deletedCard) => {
    setDeletedCard(deletedCard);
    setIsConfirmDeletePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsTooltipPopupOpen(false);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  };

  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateUser = (userInfo) => {
    api
      .setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .newCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setIsLogged(true);
          setUserEmail(email);
          localStorage.setItem("token", res.token);
          navigate("/*");
        }
        return res;
      })
      .catch((error) => {
        console.log(error);
        setIsRegister(false);
        setIsTooltipPopupOpen(true);
      });
  };

  const handleRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then(() => {
        navigate("/signin");
        setIsRegister(true);
      })
      .catch((error) => {
        setIsRegister(false);
        console.log(error);
      })
      .finally(() => setIsTooltipPopupOpen(true));
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    setUserEmail("");
    navigate("/*");
  };

  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setIsLogged(true);
            setUserEmail(res.data.email);
            navigate("/*");
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/signin");
          setIsLogged(false);
        });
    }
  }, [navigate]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header email={userEmail} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmDeleteCardPopup}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          isRegister={isRegister}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={IsAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          card={deletedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
