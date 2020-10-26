import { ADD_CONVERSATION, ADD_ROOM, SET_ROOMNAME, SET_USERNAME } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };

    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };

    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload]
      }

    case SET_ROOMNAME:
      return {
        ...state,
        currentRoomName: action.payload
      }

    default:
      return state;
  }
};
