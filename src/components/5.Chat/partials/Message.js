import React, { useRef, useEffect, useContext } from "react";
import Moment from "react-moment";
import {createUseStyles} from "react-jss";
import {AppContext} from "../../../App";



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

const Message = ({ msg, currUserUID, currUserGender}) => {
  const {state ,setState} = useContext(AppContext)
  const classes = useStyles();
  const scrollRef = useRef();


  useEffect(() => {
      scrollRef.current?.scrollIntoView()
  }, []);

  const getPropertyColor = (genderFriend, msgFrom) => {
    let proprtycolor
    if (genderFriend === "meżczyzna" && msgFrom !== currUserUID) {
      proprtycolor = "lightblue"
    }
    if (genderFriend === "kobieta" && msgFrom !== currUserUID) {
      proprtycolor = "#fdbcd8"
    }
    if (msgFrom === currUserUID && currUserGender === "meżczyzna") {
      proprtycolor = "lightblue"
    }
    if (msgFrom === currUserUID && currUserGender === "kobieta") {
      proprtycolor = "#fdbcd8"
    }
    return proprtycolor
  }


  return (
    <div
      className={msg.from === currUserUID ? classes.myMessage : classes.friendMessage}
      style={{backgroundColor: (getPropertyColor(state.genderFriend, msg.from)),
      alignSelf: (msg.from !== currUserUID ? "flex-start":"flex-end")}}
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