import React from "react";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";

const ChatMessage = (props) => {
  const { name, msg, classx} = props;

  return (
    <Card className={`chatBubble ${classx}`}>
      <Avatar />
      <div className="chatInfo">
        <h2>{name}</h2>
        <div className={`msgContainer`}>{msg}</div>
      </div>
    </Card>
  );
};

export default ChatMessage;
