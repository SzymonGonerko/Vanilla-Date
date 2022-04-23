import React, {useEffect, useState, useContext} from "react"
import {collection, doc, getDocs, getFirestore, updateDoc,query,where} from "firebase/firestore";
import ContainerGradient from "../3.Home/partials/ContainerGradient"
import Title from "../1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import myDraw from "../../images/draw.png"

import {AppContext} from "../../App";
import {createUseStyles} from "react-jss";

import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';
import CancelIcon from '@mui/icons-material/Cancel';



const db = getFirestore()


const stylesModal = {
    styleModalLoad: {    
        position: 'absolute',
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
    }

}



const itemStyles = {
    border: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    margin: "10px",
    borderRadius: "5px",
    height: "9vh",
    paddingLeft: "5px"}

const useStyles = createUseStyles((theme) => ({
    '@keyframes show': {
        "0%": { width: "0", height: "0", opacity: "0"},
        "100%": { width: "100%", height: "100%", opacity: "1"},
    },
    styleModalChat: {
        position: 'absolute',
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
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
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

}))

const Chat = () => {
    const {state ,setState} = useContext(AppContext)
    const { state: { user: userF } } = useContext(AppContext);
    const [userToChat, setUserToChat] = useState("")
    const [currentUser, setCurrentUser] = useState({})
    const [users, setUsers] = useState([])
    const classes = useStyles();

    const [openModalLoad, setOpenModalLoad] = useState(true);
    const handleCloseModalLoad = () => setOpenModalLoad(false);


    const [openModalChat, setOpenModalChat] = useState(false);
    const handleOpenModalChat = (docid) => (setOpenModalChat(true), setUserToChat(docid))
    const handleCloseModalChat = () => setOpenModalChat(false)


    useEffect(() => {
        if (!userF?.uid) return;
        setState(prev => ({...prev, photo: true, story: true}))

        const start = async () => {
            let userCouples
            const users = []
            const userDeletedCouples = []
            try {
                const qCurrUser = query(collection(db, "Users"), where("UID", "==", userF.uid));
                const currUser = await getDocs(qCurrUser);
                currUser.forEach((doc) => {
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
                        setUsers(users)
                    }
                })

                

            } catch (e) {console.log(e)}
        }

        start().then(() => {
            handleCloseModalLoad()
        })


    }, [userF])



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

        <Modal open={openModalChat} aria-labelledby="modal-modal-title">
            <Box className={classes.styleModalChat}>
                <CancelIcon style={stylesModal.styleCancleIcon} onClick={handleCloseModalChat}/>
                <div>ddddd</div>
            </Box>
        </Modal>

        <Title/>
        {currentUser.couples?.length !== 0?
        <div className={classes.usersContainer}>
            
                <nav>
                    {users?.map((el, index) => (currentUser.couples?.some(item => item === el.docId) ?
                        <li key={index} onClick={() => handleOpenModalChat(el.docId)} style={itemStyles} >
                            <p className={classes.textLi}>{el.personalDataForm.name}</p>
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