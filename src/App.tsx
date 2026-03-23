import React from "react";
import './App.css';
import Header from "./components/header/header.tsx";
import Menu from "./components/menu/menu.tsx";

const App = () => {
  return (
    <div className="App">
      <div>
        <Header />
        <Menu />
      </div>
    </div>
  );
};

export default App;