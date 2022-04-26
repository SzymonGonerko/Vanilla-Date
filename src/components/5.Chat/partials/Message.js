import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import {createUseStyles} from "react-jss";


const useStyles = createUseStyles((theme) => ({
  myMessage: {
    width: "70%",
    fontFamily: "Roboto Serif",
    padding: "15px",
    fontWeight: "bold",
    borderRadius: "14% 4% 13% 14% / 47% 12% 44% 50% ",
    textAlign: "right"},
  friendMessage: {
    width: "70%",
    fontFamily: "Roboto Serif",
    alignItems: "flex-start",
    fontWeight: "bold",
    padding: "15px",
    borderRadius: "4% 14% 14% 7% / 13% 50% 50% 24%",
    textAlign: "left"},
  moment: {
    color: "gray",
    fontSize: "0.8rem",
    fontFamily: "Roboto Serif"
    }
}))

const Message = ({ msg, currUserUID, currUserGender }) => {
  const classes = useStyles();
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div
      className={msg.from === currUserUID ? classes.myMessage : classes.friendMessage}
      style={{backgroundColor: (currUserGender === "kobieta" || msg.from !== currUserUID ? "pink":"lightblue"),
      alignSelf: (msg.from !== currUserUID ? "flex-start":"inherid")}}
      ref={scrollRef}
    >
      <p className={msg.from === currUserUID ? "me" : "friend"} style={{overflowX: "scroll"}}>
        {msg.text}
        <br/>
          
      </p>
      <Moment className={classes.moment} fromNow>{msg.createdAt.toDate()}</Moment>
    </div>
  );
};

export default Message;