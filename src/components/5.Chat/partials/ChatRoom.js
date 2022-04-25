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
  } from "firebase/firestore";

import {createUseStyles} from "react-jss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CancelIcon from '@mui/icons-material/Cancel';
import {AppContext} from "../../../App";


const stylesModal = {
    styleCancleIcon: {
        position: "absolute",
        fontSize: "2.4rem",
        top: "11px",
        right: "15px"
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
        bottom: "0",
        left: "0",
        width: "100%",
},
textSenderMessage: {
        width: "70%",
        height: "5vh",
        fontFamily: "Roboto Serif",
        border: "none",
        outline: "none",
        paddingLeft: "10px",
        paddingRight: "10px",
},
buttonSenderMessage: {
        width: "30%",
        height: "5vh",
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
},
containerMessages: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height:"85%",
    width:"95%",
    textAlign: "left"
}
}))


const ChatRoom = ({user, open, currUserUID}) => {
    const classes = useStyles();
    const {state, setState} = useContext(AppContext)
    const [form, setForm] = useState({textMsg: ""})

    const handleCloseChatRoom = () => setState({...state, openChatRoom: false})

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (form.textMsg === "") return
        console.log(form.textMsg)
        setForm({textMsg: ""})
    }

    const update = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setForm({[fieldName]: fieldValue });
    }


    useEffect(() => {
    },[])


    return (<>
        <Modal open={open}>
            <Box className={classes.styleModalChat}>
                <CancelIcon style={stylesModal.styleCancleIcon} onClick={handleCloseChatRoom}/>

                <div className={classes.chatUserName}>{user.personalDataForm?.name}</div>

                <div className={classes.containerMessages}>
                   kontener na wiadomości
                </div>

                <div className={classes.containerMessageSender}>
                    <form onSubmit={handleSubmit}>
                        <input name="textMsg" value={form.textMsg} onChange={update} className={classes.textSenderMessage} type="text" placeholder="Twoja wiadomość"/>
                        <input className={classes.buttonSenderMessage} type="submit"/>
                    </form>
                </div>

            </Box>
        </Modal>
    </>)
}

export default ChatRoom