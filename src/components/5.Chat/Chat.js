import React, {useEffect, useState, useContext} from "react"
import {collection, doc, getDocs, getFirestore, updateDoc, query, where, orderBy, onSnapshot, getDoc} from "firebase/firestore";
import ContainerGradient from "../3.Home/partials/ContainerGradient"
import Title from "../1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import ChatRoom from "./partials/ChatRoom";
import myDraw from "../../images/draw.png"

import {AppContext} from "../../App";
import {createUseStyles} from "react-jss";

import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChatIcon from '@mui/icons-material/Chat';



const db = getFirestore()


const stylesModal = {
    styleModalLoad: {    
        position: 'absolute',
        outline: "none",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        textAlign: "center",
        borderRadius: "5px",
        p: 4,},
    styleCancleIcon: {
        position: "absolute",
        fontSize: "2.4rem",
        top: "11px",
        right: "15px"
    },
    itemStyles: {
        border: "1px solid black",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px",
        borderRadius: "5px",
        height: "9vh",
        paddingLeft: "5px",
    },
    chatIcon : {
        marginRight: "15px",
        fontSize: "1.6rem"
    }

}



const useStyles = createUseStyles((theme) => ({
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
    afterUsersImg: {
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
        backgroundImage: `url(${myDraw})`,
        height: "40vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    afterUsersText: {
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, 0)",
        width: "95%",
        fontFamily: "Roboto Serif",
        textAlign: "center",
        fontSize: "1.2rem",
    },
    usersContainer: {
        position: "absolute",
        top: "80px",
        left: "50%",
        transform: "translate(-50%, 0%)",
        borderRadius: "5px",
        width: "95vw",
        height: "55vh",
        overflowY: "scroll"
    },
    textItem: {fontFamily: "Roboto Serif", fontWeight: "bold", fontSize: "1.3rem"},
    btnContainer: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        width: "30%"
    },
    textLi : {
        lineHeight: "8.5vh",
        fontFamily: "Roboto Serif",
        fontSize: "1.4rem",
        fontWeight: "bold"
    },
    button: {
        textDecoration: "none",
        backgroundColor: "transparent",
        border: "none",
        width: "30%",
        height: "50%",
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
        paddingRight: "10px"
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
},
msgStatus: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "5px",
    marginRight: "5px",
    fontFamily: "Roboto Serif"
},
lastMsgText: {
    fontSize: "1rem",
    overflow: "scroll",
    flexWrap: "nowrap",
    lineHeight: "1.4rem",
    height: "1.4rem",
    transform: "translate(0%, 4%)"
},
quote:{
    fontStyle: "italic",
    fontFamily: "Roboto Serif",
},
author: {
    textAlign: "right",
    marginBottom: "20px"
}

}))

const Chat = () => {
    const {state ,setState} = useContext(AppContext)
    const { state: { user: userF } } = useContext(AppContext);
    const [lastMsgs, setLastMsgs] = useState([])



    const [userToChat, setUserToChat] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [users, setUsers] = useState([])
    const classes = useStyles();


    const [openModalLoad, setOpenModalLoad] = useState(true);
    const handleCloseModalLoad = () => setOpenModalLoad(false);

const changeStatus = async (userUID) => {
    const id = currentUser.UID > userUID ? `${currentUser.UID + userUID}` : `${userUID + currentUser.UID}`;
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data() && docSnap.data().from !== currentUser.UID) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
}


    const handleOpenChatRoom = (user) => (
        changeStatus(user.UID),
        setState({...state, openChatRoom: true}), 
        setUserToChat(user)
        )



    useEffect(() => {
        if (!userF?.uid) return;
        setState(prev => ({...prev, photo: true, story: true}))


        const start = async () => {
            let userCouples
            let curUser
            const users = []
            const userDeletedCouples = []
            try {
                const qCurrUser = query(collection(db, "Users"), where("UID", "==", userF.uid));
                const currUser = await getDocs(qCurrUser);
                currUser.forEach((doc) => {
                    curUser = {...doc.data(), docId: doc.id}
                    userCouples = [...doc.data().couples]
                    setCurrentUser({ ...doc.data(), docId: doc.id})
                })

                const qAllUsers = query(collection(db, "Users"), where("UID", "!=", userF.uid));
                const allUsers = await getDocs(qAllUsers);

                allUsers.forEach((doc) => {
                    const isCouple = userCouples.some(el => (el === doc.id))
                    const isDeleted = userDeletedCouples.some(el => (el === doc.id))
                    if (!isDeleted && isCouple){
                        users.push({...doc.data(), docId: doc.id})
                        
                    }
                })



                users.forEach(el => {
                    const id = el.UID > curUser.UID ? `${el.UID + curUser.UID}` : `${curUser.UID + el.UID}`;
                    onSnapshot(doc(db, "lastMsg", id), (doc) => {
                        console.log(doc.data())
                        if (doc.data() !== undefined) {
                            el.lastmsg = doc.data()
                            setLastMsgs(prev => ([...prev, doc.data()]))
                        }
                   });
                   
        })

         
        setUsers(users)

            } catch (e) {console.log(e)}
        }

        start().then(() => {
                handleCloseModalLoad()
        
            
        })
    }, [userF])

console.log(users)


    return (
    <ContainerGradient>
        <Modal open={openModalLoad} aria-labelledby="modal-modal-title">
            <Box sx={stylesModal.styleModalLoad}>
                <CircularProgress />
                    <Typography id="modal-modal-load" style={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        chwila...
                    </Typography>
            </Box>
        </Modal>


        <ChatRoom  
            currUserGender={currentUser?.personalDataForm?.gender} 
            currUserUID={userF?.uid} 
            user={userToChat} 
            open={state.openChatRoom}/>
        
        
        <Title/>
        {currentUser.couples?.length !== 0?
        <div className={classes.usersContainer}>
            <div className={classes.quote}>
                <p>„...nie my mówimy w języku, a język mówi nami”.</p>
                <p className={classes.author}>Saveli Grinberg</p>
            </div>
                <nav>
                    {users?.map((el, index) => (currentUser.couples?.some(item => item === el.docId) ?
                        <li key={index} onClick={() => handleOpenChatRoom(el)} style={stylesModal.itemStyles} >
                            <p className={classes.textLi}>{el.personalDataForm.name}</p>
                            <div className={classes.msgStatus}>
                                <p className={classes.lastMsgText}>
                                    {el.lastmsg === undefined ? <strong>Przywitaj się!</strong> : (el.lastmsg.from !== currentUser.UID ? el.personalDataForm.name + ": ": "Ja: ")}
                                    {el.lastmsg === undefined ? null :  el.lastmsg.text }
                                </p>
                                <p>
                                {el.lastmsg === undefined ? null : (el.lastmsg.unread && el.lastmsg.from !== currentUser.UID ? <strong>Nowa Wiadomość!</strong>: null)}
                                {el.lastmsg === undefined ? null : (el.lastmsg.unread && el.lastmsg.from === currentUser.UID ? "Nieodczytana": null)}
                                {el.lastmsg === undefined ? null : (!el.lastmsg.unread && el.lastmsg.from === currentUser.UID ? "Odczytana": null)}
                                </p>
                                
                            </div>
                            <ChatIcon style={stylesModal.chatIcon}/>
                        </li>
                    :null))}
                </nav>
        </div>
          :<>
          <div className={classes.afterUsersText}>Obecnie brak rozmów z innymi użytkownikami</div>
          <div className={classes.afterUsersImg}/>
          </>}
        <Navigation curr="Chat"/>
    </ContainerGradient>)
}

export default Chat