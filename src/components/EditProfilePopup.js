import { PopupWithForm } from "./PopupWithForm";

export function EditProfilePopup(props) {
  return(
    <PopupWithForm name="edit" title="Редактировать профиль" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} >
      <input className="popup__input" minLength="2" maxLength="40" id="input-name" name="userName" type="text" required />
      <span className="popup__input-error" id="input-name-error"></span>
      <input className="popup__input" minLength="2" maxLength="200" id="input-job" name="userJob" type="text" required />
      <span className="popup__input-error" id="input-job-error"></span>
    </PopupWithForm>
  ); 
}