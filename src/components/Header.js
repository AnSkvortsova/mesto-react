
import logoPath from '../images/logo.svg';

export function Header() {
  return(
    <header className="header page__section">
      <img className="logo" src={logoPath} alt="логотип" />
    </header>
  );
}