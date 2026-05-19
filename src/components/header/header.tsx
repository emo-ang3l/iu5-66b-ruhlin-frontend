import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import './header.css';
import logo from '../../assets/87413.png';
import { useUser } from '../../hooks/useUser';

type HeaderProps = {
  onLogout: () => void;
};

const Header = ({ onLogout }: HeaderProps) => {
  const { login, setUser } = useUser();
  const isLoggedIn = Boolean(login);
  const [nickInput, setNickInput] = useState(login);

  const userName = login || 'User';
  const avatarLetter = userName.trim().charAt(0).toUpperCase();

  useEffect(() => {
    setNickInput(login);
  }, [login]);

  const handleNickChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickInput(event.target.value);
  };

  const handleSignIn = () => {
    const trimmedName = nickInput.trim();
    if (!trimmedName) {
      return;
    }

    setUser({
      userInfo: {
        Data: {
          login: trimmedName,
        },
      },
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoggedIn) {
      handleSignIn();
    }
  };

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

          <div className="header-nick-wrap">
            <div
              className={`header-nick-pill ${isLoggedIn ? 'header-nick-pill--logged-in' : 'header-nick-pill--logged-out'}`}
            >
              <span
                className={`auth-status-dot ${isLoggedIn ? 'auth-status-dot--logged-in' : 'auth-status-dot--logged-out'}`}
                title={isLoggedIn ? 'Вы вошли' : 'Не вошли'}
                aria-hidden="true"
              />
              <input
                type="text"
                className="header-nick-input"
                value={nickInput}
                onChange={handleNickChange}
                onKeyDown={handleKeyDown}
                placeholder="Введите ник"
                aria-label="Введите ник"
                readOnly={isLoggedIn}
              />
              {!isLoggedIn && (
                <button type="button" className="header-nick-submit" onClick={handleSignIn}>
                  Войти
                </button>
              )}
            </div>
          </div>

          <div className="header-actions">
            {isLoggedIn ? (
              <>
                <div className="header-user-card">
                  <div className="header-user-avatar" aria-hidden="true">
                    {avatarLetter}
                  </div>
                  <div className="header-user-name">{userName}</div>
                </div>
                <button type="button" className="logout-button" onClick={onLogout}>
                  Выход
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
