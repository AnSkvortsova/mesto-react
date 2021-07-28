import React, { useEffect, useState } from 'react';
import pencilPath from '../images/pencil.svg';
import { api } from '../utils/api';
import { Card } from './Card';

export function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] =useState('');

  const [cards, setCardsState] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ])
    .then(([userData, cardData]) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);

      setCardsState(cardData);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  return(
    <main className="main">
      <section className="profile page__section">
        <div className="profile__box">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img className="profile__image" alt="Аватар" src={userAvatar} />
            <img className="profile__pencil" src={pencilPath} alt="Карандаш" />
          </div>
        <div className="profile__info">
          <div className="profile__row">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__edit-button" type="button" aria-label="редактировать" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить" onClick={props.onAddPlace}></button>
        </div>
      </section>

      <section className="elements page__section">
        {cards.map((card) => <Card card={card} onCardClick={props.onCardClick} onDeleteClick={props.onDeleteClick} />)}
      </section>

    </main>
  );
}