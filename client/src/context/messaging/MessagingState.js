import React, { useReducer } from "react";
import MessagingContext from "./messagingContext";
import MessagingReducer from "./messagingReducer";
// import dp from "../../img/dp.jpg";
// import house from "../../img/house.jpg";
// import potion from "../../img/potion.jpg";
// import reng from "../../img/reng.jpg";
import {
  ADD_CONVERSATION,
  ADD_ROOM,
  SET_USERNAME,
  SET_ROOMNAME,
} from "../types";

const MessagingState = (props) => {
  const initialState = {
    rooms: [],
    users: [],
    conversations: [],
    username: "",
    currentRoomName: "Default Room",
  };

  const [state, dispatch] = useReducer(MessagingReducer, initialState);

  const sendMsg = (msgObj) => {
    // let name = Name;
    // let msg = Msg;
    let convo = {
      name: msgObj.name,
      msg: msgObj.msg,
      id: msgObj.id,
    };

    addConversation(convo);
  };

  const addConversation = (convo) => {
    dispatch({
      type: ADD_CONVERSATION,
      payload: convo,
    });
  };

  const addRoom = (room) => {
    dispatch({
      type: ADD_ROOM,
      payload: room,
    });
  };

  const setUsername = (name) => {
    dispatch({
      type: SET_USERNAME,
      payload: name,
    });
  };

  const stateSetRoomName = (roomName) => {
    dispatch({
      type: SET_ROOMNAME,
      payload: roomName,
    });
  };

  return (
    <MessagingContext.Provider
      value={{
        temp: state.temp,
        rooms: state.rooms,
        conversations: state.conversations,
        username: state.username,
        currentRoomName: state.currentRoomName,
        sendMsg,
        setUsername,
        addRoom,
        stateSetRoomName,
      }}
    >
      {props.children}
    </MessagingContext.Provider>
  );
};

export default MessagingState;
