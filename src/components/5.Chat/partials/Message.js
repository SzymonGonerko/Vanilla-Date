import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import {createUseStyles} from "react-jss";


const useStyles = createUseStyles((theme) => ({
  myMessage: {
    maxWidth: "70%",
    fontFamily: "Roboto Serif",
    padding: "10px 15px 10px 15px",
    fontWeight: "bold",
    borderRadius: "14% 4% 13% 14% / 47% 12% 44% 50% ",
    textAlign: "right"},
  friendMessage: {
    maxWidth: "70%",
    fontFamily: "Roboto Serif",
    alignItems: "flex-start",
    fontWeight: "bold",
    padding: "10px 15px 10px 15px",
    borderRadius: "4% 14% 14% 7% / 13% 50% 50% 24%",
    textAlign: "left"},
  moment: {
    color: "gray",
    fontSize: "0.7rem",
    fontFamily: "Roboto Serif"
    }
}))

const Message = ({ msg, currUserUID, currUserGender }) => {
  const classes = useStyles();
  const scrollRef = useRef();


  useEffect(() => {
      scrollRef.current?.scrollIntoView()
  }, []);


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