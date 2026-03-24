import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { useUser } from './hooks/useUser';
import { Login } from './components/login/login';
import { hostname, type Message } from './consts.ts';
import Header from './components/header/header';
import Menu from './components/menu/menu';

function App() {
  const { login, resetUser } = useUser();
  const [ws, setWs] = useState<WebSocket | undefined>();
  const [messageArray, setMessageArray] = useState<Message[]>([]);

  const createWebSocket = useCallback((url: string): WebSocket => {
    const socket = new WebSocket(url);

    socket.onopen = function () {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = function (event) {
      const msgString = event.data;
      const message: Message = JSON.parse(msgString);

      console.log('MessageCard from server:', message);

      setMessageArray((currentMsgArray: Message[]) => [...currentMsgArray, message]);
    };

    socket.onclose = function () {
      console.log('WebSocket connection closed');
    };

    socket.onerror = function (event) {
      console.error('WebSocket error:', event);
    };

    return socket;
  }, []);

  useEffect(() => {
    if (!login) {
      if (ws) {
        ws.close(1000, 'User is not logged in');
      }
      setWs(undefined);
      setMessageArray([]);
      return;
    }

    const nextWs = createWebSocket(
      `ws://${hostname}:8001/?username=${encodeURIComponent(login)}`,
    );
    setWs(nextWs);

    return () => {
      nextWs.close(1000, 'Reconnect / unmount');
    };
  }, [login, createWebSocket]);

  const handleLogout = () => {
    resetUser();
    setMessageArray([]);

    if (ws) {
      ws.close(4000, 'User logout');
    }
    setWs(undefined);
  };

  return (
    <div className="App">
      {login ? (
        <>
          <Header onLogout={handleLogout} />
          <Menu ws={ws} messageArray={messageArray} setMessageArray={setMessageArray} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;