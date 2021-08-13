import { useState, useEffect } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { EditProfilePopup } from './EditProfilePopup';
import { AddPlacePopup } from './AddPlacePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { ImagePopup } from './ImagePopup';
import { ConfirmPopup } from './ConfirmPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // попапы
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [removedCard, setRemovedCard] = useState(null);

  // пользователь и карточки
  const [currentUser, setCurrentUserState] = useState({});
  const [cards, setCardsState] = useState([]);

  // открытие и закрытие попапов
  function handleEditProfileClick() {
    setEditProfileState(true);
  };
  function handleAddPlaceClick() {
    setAddPlaceState(true);
  };
  function handleEditAvatarClick() {
    setEditAvatarState(true);
  };
  function handleCardClick(card) {
    setSelectedCard(card);
  };
  function handleDeleteClick(card) {
    setRemovedCard(card);
  };

  function closeAllPopups() {
    setEditProfileState(false);
    setAddPlaceState(false);
    setEditAvatarState(false);
    setSelectedCard(null);
    setRemovedCard(null);
  };
  
  

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ])
    .then(([userData, cardData]) => {
      setCurrentUserState(userData);
      setCardsState(cardData);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  // пользователь
  function handleUpdateUser (data) {
    api.pushUserInfo(data)
    .then((result) => {
      setCurrentUserState(result);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  };

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
    .then((result) => {
      setCurrentUserState(result);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  };

  // карточки
  function handleAddPlaceSubmit(data) {
    api.pushNewCard(data)
    .then((newCard) => {
      setCardsState([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.setLikeCard(card._id, isLiked)
    .then((newCard) => {
      setCardsState((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err)
    });
  };

  function handleCardDelete(card) {
    api.removeCard(card._id)
    .then(() => {
      setCardsState((state) => state.filter(item => item._id !== card._id));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />

      <Main 
      onEditProfile = {handleEditProfileClick} 
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
      cards = {cards}
      onCardClick = {handleCardClick}
      onCardLike = {handleCardLike}
      onDeleteClick = {handleDeleteClick}
      onCardDelete = {handleCardDelete}
      />

      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <ImagePopup card={!!selectedCard && selectedCard} onClose={closeAllPopups} />
      <ConfirmPopup isOpen={removedCard} onClose={closeAllPopups} onCardDelete={handleCardDelete} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
