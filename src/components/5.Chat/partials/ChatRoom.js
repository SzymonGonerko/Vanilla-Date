import React, {useEffect, useState, useContext} from "react"

import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    Timestamp,
    orderBy,
    setDoc,
    doc,
    getDoc,
    updateDoc,
    getFirestore
  } from "firebase/firestore";

import {createUseStyles} from "react-jss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CancelIcon from '@mui/icons-material/Cancel';
import {AppContext} from "../../../App";
import Message from "../partials/Message"
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import zIndex from "@mui/material/styles/zIndex";


const stylesModal = {
    styleCancleIcon: {
        position: "absolute",
        top: "0",
        right: "0",
        // width: "1rem",
        height: "3rem",
        backgroundColor: "#f5dbdb",
        borderRadius: "0 0 0 120px",
        zIndex: "2"
    },
}

const useStyles = createUseStyles((theme) => ({
    '@keyframes show': {
        "0%": { width: "0", height: "0", opacity: "0"},
        "100%": { width: "100%", height: "100%", opacity: "1"},
    },
    styleModalChat: {
        position: 'absolute',
        outline: "none",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        border: '1px solid black',
        textAlign: "center",
        borderRadius: "5px",
        animation: "$show 0.5s ease",
    },
containerMessageSender: {
        position: "absolute",
        fontFamily: "Roboto Serif",
        borderTop: "1px solid black",
        borderRadius: "13px 13px 0 0",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "50px"
},
formMessageSender: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: "13px 13px 0 0",
},
textSenderMessage: {
        display: "inline-block",
        borderRadius: "13px 0 0 0",
        width: "70%",
        height: "100%",
        fontFamily: "Roboto Serif",
        border: "none",
        outline: "none",
        paddingLeft: "10px",
        paddingRight: "10px",
},
buttonSenderMessage: {
        display: "inline-block",
        borderRadius: "13px 13px 0 13px",
        width: "30%",
        height: "100%",
        fontFamily: "Roboto Serif",
        fontWeight: "bold",
        border: "none",
        outline: "none",
},
chatUserName: {
    position: "absolute",
    top: "14px",
    left: "11px",
    fontFamily: "Roboto Serif",
    fontSize: "1.8rem",
    textAlign: "left",
    zIndex: "2"
},
containerMessages: {
    position: "fixed",
    display: "flex",
    gap: "15px",
    flexDirection: "column",
    overflowY: "scroll",
    top: "70px",
    bottom: "60px",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width:"95%",
    textAlign: "left",
    alignItems: "flex-end"
}
}))


const db = getFirestore()


const ChatRoom = ({user, open, currUserUID, currUserGender}) => {
    const classes = useStyles();
    const {state, setState} = useContext(AppContext)
    const [form, setForm] = useState({textMsg: ""})
    const [msgs, setMsgs] = useState([]);

    const changeStatus = async (userUID) => {
        const id = currUserUID > userUID ? `${currUserUID + userUID}` : `${userUID + currUserUID}`;
        const docSnap = await getDoc(doc(db, "lastMsg", id));
        if (docSnap.data() && docSnap.data().from !== currUserUID) {
          await updateDoc(doc(db, "lastMsg", id), { unread: false });
        }
    }

    const handleCloseChatRoom = () => (
        changeStatus(user.UID),
        setState({...state, openChatRoom: false})
        )


    

    useEffect(() => {
    if (!currUserUID || !user.UID) return


    const id = currUserUID > user.UID ? `${currUserUID + user.UID}` : `${user.UID + currUserUID}`;

    const start = async () => {
        const msgsRef = collection(db, "ChatRoom", id, "chat");
        const q = query(msgsRef, orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
            msgs.push(doc.data());
        });
        setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== currUserUID) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
}

    try {
        start()
        } 
    catch (e) {
        console.log(e)
        }


    },[user, currUserUID])



    const update = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setForm({[fieldName]: fieldValue });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.textMsg === "" || !currUserUID || !user.UID) return
        const id = currUserUID > user.UID ? `${currUserUID + user.UID}` : `${user.UID + currUserUID}`;
        const otherUser = user.UID
        const text = form.textMsg

        
        await addDoc(collection(db, "ChatRoom", id, "chat"), {
            text,
            from: currUserUID,
            to: otherUser,
            createdAt: Timestamp.fromDate(new Date()),
          });
        await setDoc(doc(db, "lastMsg", id), {
            text,
            from: currUserUID,
            to: otherUser,
            createdAt: Timestamp.fromDate(new Date()),
            unread: true,
          });
        console.log(form.textMsg)
        setForm({textMsg: ""})
    }


    

    return (<>
        <Modal open={open}>
            <Box className={classes.styleModalChat}>
                <Button 
                    variant="outlined" 
                    style={stylesModal.styleCancleIcon} 
                    color="error" 
                    onClick={handleCloseChatRoom}>
                     <CloseIcon style={{position: "absolute", top: "7px", right: "13px"}}/>
                </Button>
                <div className={classes.chatUserName}>{user.personalDataForm?.name}</div>

                <div className={classes.containerMessages}>
                {msgs.length? msgs.map((msg, i) => (
                    <Message 
                    key={i} 
                    msg={msg} 
                    currUserGender={currUserGender}
                    currUserUID={currUserUID}/>
                  ))
                : null}
                </div>

                <div className={classes.containerMessageSender}>
                    <form autoComplete="off" className={classes.formMessageSender} onSubmit={handleSubmit}>
                        <input name="textMsg" value={form.textMsg} onChange={update} className={classes.textSenderMessage} type="text" placeholder="Twoja wiadomość"/>
                        <input className={classes.buttonSenderMessage} type="submit"/>
                    </form>
                </div>

            </Box>
        </Modal>
    </>)
}

export default ChatRoom