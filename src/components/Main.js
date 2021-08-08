import React, { useEffect, useState } from 'react';
import pencilPath from '../images/pencil.svg';
import { api } from '../utils/api';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main(props) {
  //const [userName, setUserName] = useState('');
  //const [userDescription, setUserDescription] = useState('');
  //const [userAvatar, setUserAvatar] =useState('');
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCardsState] = useState([]);
  

  useEffect(() => {
    
      api.getInitialCards()
    
    .then((cardData) => {
      setCardsState(cardData);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  //useEffect(() => {
  //  Promise.all([
  //    api.getUserInfo(),
  //    api.getInitialCards(),
  //  ])
  //  .then(([userData, cardData]) => {
  //    setUserName(userData.name);
  //    setUserDescription(userData.about);
  //    setUserAvatar(userData.avatar);

  //    setCardsState(cardData);
  //  })
  //  .catch((err) => {
  //    console.log(err)
  //  })
  //}, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.setLikeCard(card._id, isLiked)
    .then((newCard) => {
      setCardsState((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  return(
    <main className="main">
      <section className="profile page__section">
        <div className="profile__box">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img className="profile__image" alt="Аватар" src={currentUser.avatar} />
            <img className="profile__pencil" src={pencilPath} alt="Карандаш" />
          </div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="редактировать" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить" onClick={props.onAddPlace}></button>
        </div>
      </section>

      <section className="elements page__section">
        {cards.map((card) => (
          <div key={card._id}>
            <Card card={card} onCardClick={props.onCardClick} onDeleteClick={props.onDeleteClick} onCardLike={handleCardLike} />
          </div>
        ))}
      </section>

    </main>
  );
}