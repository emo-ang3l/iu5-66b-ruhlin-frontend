import {useUser} from "../../hooks/useUser";
import type {Message} from "../../consts";
import {Input} from "../input/input";
import {MessageCard} from "../messageCard/messageCard";
import React from "react";

type ChatProps = {
  ws: WebSocket | undefined;
  messageArray: Message[];
  setMessageArray: React.Dispatch<React.SetStateAction<Message[]>>;
}

export const Chat: React.FC<ChatProps> = ({ws, messageArray, setMessageArray}) => {
  const {login, resetUser} = useUser();

  // при логауте закрываем соединение
  const handleClickLogoutBtn = () => {
    resetUser();
    if (ws) {
      ws.close(4000, login);
    } else {
      console.log("ws.close(4000, 'User logout'); don't work");
    }
  };

  return (
    <>
      <div className="chat">
        <div className="chat--header">
          Сообщения от {login}
        </div>

        <div className="chat--body">
          {messageArray.length > 0 ?
            <div className="chat--container">
              {messageArray.map((msg: Message, index: number) => (
                <div key={index} className="chat--msg">
                  <MessageCard msg={msg}/>
                </div>
              ))}
            </div>
            :
            <div className="chat--no-msg">
              <div style={{fontSize: '2em', color: 'gray'}}>Здесь будут сообщения</div>
            </div>
          }
        </div>

        <Input ws={ws} setMessageArray={setMessageArray}/>
      </div>

        <button
          type="button"
          onClick={handleClickLogoutBtn}
          style={{
            height: 'fit-content',
            margin: '1em'
          }}
        >
          Выход
        </button>
    </>
  );
}