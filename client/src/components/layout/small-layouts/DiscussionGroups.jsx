import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import roomPic from "../../../img/gc.jpg";

const DiscussionGroups = (props) => {
  const { title, joinRoom } = props;

  // const month = new Date().getMonth();
  // const day = new Date().getDate();
  // const year = new Date().getFullYear();

  // const hour = new Date().getHours();
  // const minutes = new Date().getMinutes();
  // const seconds = new Date().getSeconds()

  return (
    <Card
      className="groupBox"
      onClick={() => {
        joinRoom(title);
      }}
      elevation={3}
    >
      <CardActionArea>
        <div className="discussion">
          <img src={roomPic} alt="default pic" height="100px" />

          <div className="discussionInfo">
            <h2>{title}</h2>

            {/* <p className="info">
              {month}-{day}-{year}
            </p>
            <p className="info">
              {hour}:{minutes}:{seconds}
            </p> */}
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default DiscussionGroups;
