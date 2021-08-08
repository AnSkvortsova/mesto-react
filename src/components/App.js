import { useState, useEffect } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { EditProfilePopup } from './EditProfilePopup';
import { AddPlacePopup } from './AddPlacePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { ImagePopup } from './ImagePopup';
import { ConfirmPopup } from './ConfirmPopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // попапы
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isConfirmPopupOpen, setConfirmPopupState] = useState(false);
  
  // пользователь
  const [currentUser, setCurrentUserState] = useState({});

  useEffect(() => {
    
      api.getUserInfo()
    
    .then((userData) => {
      setCurrentUserState(userData);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  function handleUpdateUser (data) {
    api.pushUserInfo(data)
    .then((result) => {
      setCurrentUserState(result);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  }

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
  function handleDeleteClick() {
    setConfirmPopupState(true);
  };

  function closeAllPopups() {
    setEditProfileState(false);
    setAddPlaceState(false);
    setEditAvatarState(false);
    setSelectedCard(null);
    setConfirmPopupState(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />

      <Main 
      onEditProfile = {handleEditProfileClick} 
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
      onCardClick = {handleCardClick}
      onDeleteClick = {handleDeleteClick}
      />

      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={!!selectedCard && selectedCard} onClose={closeAllPopups} />
      <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
