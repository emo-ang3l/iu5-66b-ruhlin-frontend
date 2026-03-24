import { useState, type ChangeEvent, type FC } from "react";
import { useUser } from "../../hooks/useUser";
import "./login.css";
import logo from '../../assets/87413.png';


type LoginProps = {}

export const Login: FC<LoginProps> = () => {
  const { login, setUser } = useUser();
  const [userName, setUsername] = useState(login);

  const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // при авторизации сохраняем пользователя; websocket создается в App
  const handleClickSignInBtn = () => {
    if (!userName.trim()) {
      return;
    }

    setUser({
      userInfo: {
        Data: {
          login: userName.trim(),
        },
      },
    });
  };

  return (
    <>
      <div className="login">
        <div className="login--card">
          <div className="logo">
            <img src={logo} alt="dronForward logo" className="logo-image" />
            <span className="logo-text">
              <span className="logo-text-drone">Drone</span>
              <span className="logo-text-forward">Forward</span>
            </span>
          </div>
            
          <input
            type="text"
            className="login--input"
            value={userName}
            onChange={handleChangeLogin}
            placeholder="Введите имя"
            aria-label="Введите имя"
          />

          

        </div>
        <button className="button" type="button" onClick={handleClickSignInBtn}>
            Войти
          </button>
      </div>
    </>
  );
}