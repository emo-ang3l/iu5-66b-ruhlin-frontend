import './header.css';
import logo from '../../assets/87413.png';
import { useUser } from '../../hooks/useUser';

type HeaderProps = {
  onLogout: () => void;
};

const Header = ({ onLogout }: HeaderProps) => {
  const { login } = useUser();
  const userName = login || 'User';
  const avatarLetter = userName.trim().charAt(0).toUpperCase();

  return (
    <header>
      <div className="Main">
        <div className="components">
          <div className="logo">
            <img src={logo} alt="dronForward logo" className="logo-image" />
            <span className="logo-text">
              <span className="logo-text-drone">Drone</span>
              <span className="logo-text-forward">Forward</span>
            </span>
          </div>

          <div className="header-user-controls">
            <div className="header-user-card">
              <div className="header-user-avatar" aria-hidden="true">
                {avatarLetter}
              </div>
              <div className="header-user-name">{userName}</div>
            </div>

            <button type="button" className="logout-button" onClick={onLogout}>
              Выход
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;