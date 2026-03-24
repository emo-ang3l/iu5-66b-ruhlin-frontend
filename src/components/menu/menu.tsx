import './menu.css';
import {
  useEffect,
  useState,
  useRef,
  type ChangeEvent,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from 'react';
import { useUser } from '../../hooks/useUser';
import type { Message } from '../../consts';
import { MessageCard } from '../messageCard/messageCard';
import '../messageCard/messageCard.css';

type MenuProps = {
  ws: WebSocket | undefined;
  messageArray: Message[];
  setMessageArray: Dispatch<SetStateAction<Message[]>>;
};

const Menu = ({ ws, messageArray, setMessageArray }: MenuProps) => {
  const { login } = useUser();
  const [outgoingMessage, setOutgoingMessage] = useState('');
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  // при добавлении нового сообщения прокручиваем чат к самому низу
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messageArray.length]);

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setOutgoingMessage(event.target.value);
  };

  const sendMessage = () => {
    const trimmedMessage = outgoingMessage.trim();

    if (!trimmedMessage || !ws || ws.readyState !== WebSocket.OPEN || !login) {
      return;
    }

    const message: Message = {
      username: login,
      data: trimmedMessage,
      send_time: new Date().toISOString(),
    };

    ws.send(JSON.stringify(message));
    setMessageArray((current) => [...current, message]);
    setOutgoingMessage('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

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
        <div className="menu-item-status-chat" ref={chatScrollRef}>
          {messageArray.length > 0 ? (
            messageArray.map((msg, index) => (
              <MessageCard key={`${msg.username ?? 'user'}-${index}`} msg={msg} />
            ))
          ) : (
            <p className="menu-item-empty-chat">Пока нет сообщений</p>
          )}
        </div>

        <div className="menu-item-send">
          <input
            className="input-text-send"
            type="text"
            placeholder="Введите сообщение"
            value={outgoingMessage}
            onChange={handleChangeMessage}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="menu-item-send-button" onClick={sendMessage}>
            →
          </button>
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