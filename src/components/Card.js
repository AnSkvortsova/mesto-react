export function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  } 
  
  return(
    <article className="element">
      <img className="element__image" src={props.card.link}   alt="Картинка" onClick={handleClick} />
      <button className="element__trash" type="button" aria-label="удалить" onClick={props.onDeleteClick} ></button>
      <div className="element__bottom">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__likes">
          <button className="element__heart" type="button" aria-label="отметить как нравиться"></button>
          <p className="element__number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}