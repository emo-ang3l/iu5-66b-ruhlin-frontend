import React from "react";
import './header.css';
import logo from '../../assets/87413.png';
import lupa from '../../assets/lupa.png';

const Header = () => {
  return (
    <header>
      <div className="Main">
        <div className="components">
          <div className="logo">
            <img src={logo} alt="dronForward logo" className="logo-image" />
            <span className="logo-text">dronForward</span>
          </div>

          <div className="connect">
            <div className="connect-text-container">
              <img src={lupa} alt="Search icon" className="logo-image-lupa" />
              <input
                type="text"
                className="connect-text"
                placeholder="Имя пользователя"
              />
            </div>
            <button className="connect-button">Подключить</button>
          </div>

          <div className="about">About</div>
        </div>
      </div>
    </header>
  );
};

export default Header;