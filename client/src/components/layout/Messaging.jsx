import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import Group from "./small-layouts/DiscussionGroups";
import MessagingContext from "../../context/messaging/messagingContext";
import ChatMessage from "./small-layouts/ChatMessage";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import io from "socket.io-client";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const Messaging = (props) => {
  const messagingContext = useContext(MessagingContext);

  const {
    rooms,
    conversations,
    sendMsg,
    username,
    setUsername,
    addRoom,
    stateSetRoomName,
  } = messagingContext;

  const socketRef = useRef();
  const [textValue, setTextValue] = useState("");
  const [socketId, setSocketId] = useState();
  const [roomName, setRoomName] = useState("");

  const groupPath = window.location.pathname;

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("join", () => {
      socketRef.current.emit("set join", groupPath);
    });

    socketRef.current.on("my id", (id) => {
      setSocketId(id);
    });

    socketRef.current.on("add conversation", (message) => {
      sendMsg(message);
    });
    // eslint-disable-next-line
  }, []);

  const sendMessage = (e) => {
    if (textValue === "" || username === "") {
      alert("u have no messages or no username");
    } else {
      let msgObj = {
        msg: textValue,
        id: socketId,
        name: username,
      };
      socketRef.current.emit("message sent", msgObj);
      setTextValue("");
    }
  };

  const joinRoom = (room = null) => {
    if (room === null) {
      //if no room is provided, use the room in the textfield
      if (roomName !== "") {
        for (let index = 0; index < rooms.length; index++) {
          if (rooms[index].title === roomName) {
            alert("Room already exist, find the room below");
            return;
          }
        }

        let myRoom = {
          title: roomName,
        };
        addRoom(myRoom);
        socketRef.current.emit("enter room", roomName);
        stateSetRoomName(roomName);
      } else {
        alert("Enter a room name");
      }
    } else {
      if (room !== "") {
        for (let index = 0; index < rooms.length; index++) {
          if (rooms[index].title === room) {
            alert("Room already exist, find the room below");
            return;
          }
        }

        let myRoom = {
          title: room,
        };
        addRoom(myRoom);
        socketRef.current.emit("enter room", room);
        stateSetRoomName(room);
      } else {
        alert("Enter a room name");
      }
    }

    console.log();
  };

  const onClickEnterRoom = (roomName) => {
    socketRef.current.emit("enter room ", roomName);
  };

  return (
    <Container
      id="msg-container"
      maxWidth="lg"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Paper className="grpChats" style={{ backgroundColor: "#fffafa" }}>
        <div className="input-container">
          <div className="inputField">
            <TextField
              id="input-with-icon-textfield"
              label="Your Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              fullWidth
              variant="filled"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="inputField">
            <TextField
              id="input-with-icon-textfield"
              label="Room Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MeetingRoomIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => {
                        joinRoom();
                      }}
                    >
                      <SendIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  joinRoom();
                }
              }}
              fullWidth
              variant="filled"
              placeholder="Enter Room"
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="users">
          {" "}
          {/* users should be renamed to groups for clarity*/}
          <Accordion>
            <AccordionSummary>
              <p>Your list of Groups</p>
            </AccordionSummary>
            <AccordionDetails className="accordionDetails">
              {rooms.length > 0 ? (
                rooms.map((room) => (
                  <Group
                    title={room.title}
                    description={room.description}
                    picture={room.picture}
                    key={room.title}
                    joinRoom={() => {
                      onClickEnterRoom();

                      stateSetRoomName(room.title);
                    }}
                  />
                ))
              ) : (
                <p>No groups yet</p>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </Paper>

      <div className="messaging">
        <Paper className="conversation" style={{ backgroundColor: "#d9ecf2" }}>
          {conversations.map((conversation) => {
            return conversation.id === socketId ? (
              <ChatMessage
                name={conversation.name}
                msg={conversation.msg}
                classx="sent"
              />
            ) : (
              <ChatMessage
                name={conversation.name}
                msg={conversation.msg}
                classx="received"
              />
            );
          })}
        </Paper>
        {/* css positions doesnt seem to work on the textField component here */}
        <Paper className="msgField" style={{ backgroundColor: "#51adcf" }}>
          <TextField
            fullWidth
            value={textValue}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage(e);
              }
            }}
            onChange={(e) => {
              setTextValue(e.target.value);
            }}
          />
          <IconButton
            onClick={(e) => {
              sendMessage(e);
            }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    </Container>
  );
};

export default Messaging;
