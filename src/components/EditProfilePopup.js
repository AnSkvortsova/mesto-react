import React, { useState, useEffect, useCallback } from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const validators = {
  userName: {
    required: (value) => { return value === ''; },
    minLength: (value) => { return value.length < 2; },
    maxLength: (value) => { return value.length > 40; },
  },
  userDescription: {
    required: (value) => { return value === ''; },
    minLength: (value) => { return value.length < 2; },
    maxLength: (value) => { return value.length > 200; },
  },
};

export function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [profileFormValues, setProfileFormValues] = useState({
    userName: '',
    userDescription: '',
  });
  const { userName, userDescription } = profileFormValues;

  const [errors, setErrors] = useState({
    userName: {
      required: true,
      minLength: true,
      maxLength: true,
    },
    userDescription: {
      required: true,
      minLength: true,
      maxLength: true,
    },
  });

  const handleInputChange = useCallback((evt) => {
    const { name, value } = evt.target;
    setProfileFormValues(prevState => ({ ...prevState, [name]: value }));
  }, [setProfileFormValues]);
  
  useEffect(() => {
    setProfileFormValues({
      userName: currentUser.name,
      userDescription: currentUser.about,
    })
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: userName,
      about: userDescription,
    })
  };

  useEffect(
    function validateInputs() {
      const userNameValidationResult = Object.keys(validators.userName).map(
        errorKey => {
          const errorResult = validators.userName[errorKey](userName);
          return { [errorKey]: errorResult };
        }
      ).reduce((acc, el) => ({...acc, ...el}));

      const userDescriptionValidationResult = Object.keys(validators.userDescription).map(
        errorKey => {
          const errorResult = validators.userDescription[errorKey](userDescription);
          return { [errorKey]: errorResult };
        }
      ).reduce((acc, el) => ({...acc, ...el}));

      setErrors({
        userName: userNameValidationResult,
        userDescription: userDescriptionValidationResult,
      });
  }, 
  [userName, userDescription, setErrors]);

  const isUserNameInvalid = Object.values(errors.userName).some(Boolean);
  const isuserDescriptionInvalid = Object.values(errors.userDescription).some(Boolean);
  const isSubmitDisabled = isUserNameInvalid || isuserDescriptionInvalid;

  return(
    <PopupWithForm name="edit" title="Редактировать профиль" button="Сохранить" 
    isOpen={props.isOpen} 
    onClose={props.onClose}
    onSubmit={handleSubmit} 
    isSubmitDisabled={isSubmitDisabled}>

      <input className={`popup__input ${isUserNameInvalid ? 'popup__input_type_error' : ''}`} name="userName" type="text" 
      value={userName} 
      onChange={handleInputChange} />

      { errors.userName.required && <div className="popup__input-error" >Заполните это поле.</div> }
      { errors.userName.minLength && <div className="popup__input-error" >Текст должен быть не короче 2 символов.</div> }
      { errors.userName.maxLength && <div className="popup__input-error" >Максимальное количество символов 40.</div> }
      
      <input className={`popup__input ${isuserDescriptionInvalid ? 'popup__input_type_error' : ''}`} name="userDescription" type="text" 
      value={userDescription} 
      onChange={handleInputChange} />

      { errors.userDescription.required && <div className="popup__input-error" >Заполните это поле.</div> }
      { errors.userDescription.minLength && <div className="popup__input-error" >Текст должен быть не короче 2 символов.</div> }
      { errors.userDescription.maxLength && <div className="popup__input-error" >Максимальное количество символов 200.</div> }
    </PopupWithForm>
  ); 
}