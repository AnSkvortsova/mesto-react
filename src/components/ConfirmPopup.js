import { PopupWithForm } from "./PopupWithForm";

export function ConfirmPopup(props) {
  return(
    <PopupWithForm name="delete" title="Вы уверены?" button="Да" isOpen={props.isOpen} onClose={props.onClose} ></PopupWithForm>
  );
}