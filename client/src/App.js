import React from "react";
import "./App.scss";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";

import MessagingState from "./context/messaging/MessagingState";

function App() {
  return (
    <MessagingState>
        <Navbar />
        <Home />
    </MessagingState>
  );
}

export default App;
