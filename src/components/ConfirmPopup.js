export function ConfirmPopup(props) {

  function handleConfirm(evt) {
    evt.preventDefault();
    props.onCardDelete(props.card);
  };

  return(
    <div className={`popup popup_type_delete ${props.card ? 'popup_opend' : ''}`}>
        <div className="popup__container" id={`popup__delete-container`}>
          <button className="popup__close" id={`popup__delete-close`} type="button" aria-label="закрыть" onClick={props.onClose}></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <form className="popup__form" name="delete" onSubmit={handleConfirm} noValidate>
            <button className="popup__submit" id={`popup__submit-delete`} type="submit" aria-label="сохранить">Да</button>
          </form>
        </div>
    </div>
  );
}