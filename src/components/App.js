import { useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { EditProfilePopup } from './EditProfilePopup';
import { AddPlacePopup } from './AddPlacePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { ImagePopup } from './ImagePopup';
import { ConfirmPopup } from './ConfirmPopup';

function App() {
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isConfirmPopupOpen, setConfirmPopupState] = useState(false);

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

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={!!selectedCard && selectedCard} onClose={closeAllPopups} />
      <ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
