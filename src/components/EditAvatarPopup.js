import { PopupWithForm } from "./PopupWithForm";

export function EditAvatarPopup(props) {
  return(
    <PopupWithForm name="avatar" title="Обновить аватар" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} >
      <input className="popup__input" id="input-avatar" name="avatar" type="url" placeholder="Ссылка" required />
      <span className="popup__input-error" id="input-avatar-error"></span>
    </PopupWithForm>
  );
}