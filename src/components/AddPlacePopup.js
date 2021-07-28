import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup(props) {
  return(
    <PopupWithForm name="add" title="Новое место" button="Добавить" isOpen={props.isOpen} onClose={props.onClose} >
      <input className="popup__input" minLength="2" maxLength="30" id="input-place" name="name" type="text" placeholder="Название" required />
      <span className="popup__input-error" id="input-place-error"></span>
      <input className="popup__input" id="input-link" name="link" type="url" placeholder="Ссылка на картинку" required />
      <span className="popup__input-error" id="input-link-error"></span>
    </PopupWithForm>
  );
}