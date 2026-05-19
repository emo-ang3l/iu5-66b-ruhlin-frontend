import { useState, type ChangeEvent, type FC, type KeyboardEvent } from 'react';
import { useUser } from '../../hooks/useUser';
import './login.css';

type LoginPopoverProps = {
  onClose: () => void;
};

export const LoginPopover: FC<LoginPopoverProps> = ({ onClose }) => {
  const { login, setUser } = useUser();
  const [userName, setUsername] = useState(login);

  const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleClickSignInBtn = () => {
    const trimmedName = userName.trim();
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
    onClose();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClickSignInBtn();
    }
  };

  return (
    <div className="login-popover" role="dialog" aria-label="Вход">
      <input
        type="text"
        className="login-popover-input"
        value={userName}
        onChange={handleChangeLogin}
        onKeyDown={handleKeyDown}
        placeholder="Введите имя"
        aria-label="Введите имя"
        autoFocus
      />
      <button className="login-popover-button" type="button" onClick={handleClickSignInBtn}>
        Войти
      </button>
    </div>
  );
};
