import React from 'react';
import './menu.css';

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu-item-area">
        <div className="menu-item-area-0">
          <h3 className="menu-item-area-1">Область съёмки</h3>
          <p className="menu-item-area-2">Задайте два угла:</p>
          <p className="menu-item-area-3">координаты пересекутся</p>
          <p className="menu-item-area-4">прямоугольником.</p>
        </div>

        <div className="menu-item-input">
          <div className="input-group">
            <label className="input-label">lat1</label>
            <input className="input-text" type="text" placeholder=" " />
          </div>
          <div className="input-group">
            <label className="input-label">lon1</label>
            <input className="input-text" type="text" placeholder=" " />
          </div>
          <div className="input-group">
            <label className="input-label">lat2</label>
            <input className="input-text" type="text" placeholder=" " />
          </div>
          <div className="input-group">
            <label className="input-label">lon2</label>
            <input className="input-text" type="text" placeholder=" " />
          </div>
        </div>

        <button className="menu-item-start">Запустить область</button>
        <button className="menu-item-stop">Остановить область</button>
      </div>

      <div className="menu-item-logs">
        <h3 className="menu-item-status-2">Логи телеметрии</h3>
        <p className="menu-item-status-3">
          Каждое сообщение: position(lat, lon), height, memory_left
        </p>
        <div className="menu-item-status-chat"></div>

        <div className="menu-item-send">
          <input
            className="input-text-send"
            type="text"
            placeholder="Введите сообщение"
          />
          <button className="menu-item-send-button">→</button>
        </div>
      </div>

      <div className="menu-item-status">
        <h3 className="menu-item-status-2">Статус миссии</h3>
        <p className="menu-item-status-3">В полёте / На земле / Возврат...</p>
        <p className="menu-item-status-3">Высота: 100 м</p>
        <div className="menu-item-status-3 status-memory">
          <span>Осталось памяти:</span>
          <span>50%</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;