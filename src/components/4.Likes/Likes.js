import React, {useContext, useEffect, useState} from "react"
import {arrayUnion, collection, doc, deleteDoc, getDocs, getFirestore, updateDoc, arrayRemove,query,where} from "firebase/firestore";

import ModalLoading from "../2.profile/partials/ModalLoading";
import Title from "../../components/1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import UsersCard from "../3.Home/partials/UsersCard"
import {AppContext} from "../../App";
import ContainerGradient from "../3.Home/partials/ContainerGradient"
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {createUseStyles} from "react-jss";
import myDraw from "../../images/draw.png"
import FancyButton from "./partials/FancyButton";


import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import HomeIcon from '@mui/icons-material/Home';


const db = getFirestore()
const colRef = collection(db, 'Users')


const styleModalDelete = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "85%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "5px",
    p: 2,
};
const itemStyles = {
    border: "1px solid black",
    display: "flex",
    justifyContent: "space-between",
    margin: "10px",
    borderRadius: "5px",
    height: "9vh",
    paddingLeft: "5px"}

const useStyles = createUseStyles((theme) => ({
    textwelcomeChat: {
        lineHeight: "8.5vh",
        fontFamily: "Roboto Serif",
        fontSize: "0.8rem",
        overflow: "scroll"
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
        top: "55%",
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
},quote:{
    fontStyle: "italic",
    fontFamily: "Roboto Serif",
},
author: {
    textAlign: "right",
    marginBottom: "20px"
}

}))


const Likes = () => {
    const {state ,setState} = useContext(AppContext)
    const [users, setUsers] = useState([])
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState({})
    const [showUserCard, setShowUserCard] = useState(false)
    const [clickedUser, setClickedUser] = useState(0)
    const [userToDelete, setUserToDelete] = useState("")
    const [userToDeleteUID, setUserToDeleteUID] = useState("")
    const [couples, setCouples] = useState([])
    const { state: { user: userF } } = useContext(AppContext);

    

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleOpenModalDelete = (docid, UID) => (
        setOpenModalDelete(true),
        setUserToDeleteUID(UID), 
        setUserToDelete(docid))
    const handleCloseModalDelete = () => setOpenModalDelete(false)


    

const handleClick = (index) => {
    setClickedUser(index)
    setShowUserCard(true)
}

const deleteCouple = () => {
    const IDChatRoom = userToDeleteUID > currentUser.UID ? `${userToDeleteUID + currentUser.UID}` : `${currentUser.UID + userToDeleteUID}`;
    
    console.log(IDChatRoom)
    deleteDoc(doc(db, "ChatRoom", IDChatRoom))
    
    const docRef = doc(db, 'Users', currentUser.docId)
    updateDoc(docRef, {
        deletedCouples: arrayUnion(userToDelete),
        couples: arrayRemove(userToDelete)
    }).catch((err) => {console.log(err.message)})
    .then(() => {
        setCouples(prev => [...prev].filter(el => (el !== userToDelete)))
        handleCloseModalDelete()})
}

const closeUserCard = () => {
        setShowUserCard(false)
}

    useEffect(()=> {
        if (!userF?.uid) return;
        setState(prev => ({...prev, photo: true, story: true}))
        const start = async () => {
            let currUserProfile
            const users = []
            const userDeletedCouples = []
            const userInteractions = []
            try {
                const qCurrUser = query(collection(db, "Users"), where("UID", "==", userF.uid));
                const currUser = await getDocs(qCurrUser);
                currUser.forEach((doc) => {
                    setCurrentUser({ ...doc.data(), docId: doc.id})
                    currUserProfile = {...doc.data(), docId: doc.id }
                    doc.data().likes?.forEach(el => Object.entries(el).forEach(([key, value]) => userInteractions.push(key)))
                    doc.data().deletedCouples?.forEach(el => userDeletedCouples.push(el))
                })

                const qAllUsers = query(collection(db, "Users"), where("UID", "!=", userF.uid));
                const allUsers = await getDocs(qAllUsers);
                allUsers.forEach((doc) => {
                    const isInteracted = userInteractions.some(el => (el === doc.id))
                    const isDeleted = userDeletedCouples.some(el => (el === doc.id))
                    if (!isDeleted && isInteracted){
                        users.push({...doc.data(), docId: doc.id})
                        setUsers(users)
                    }
                })

                const docRef = doc(db, 'Users', currUserProfile.docId)
                currUserProfile.likes?.forEach(currUser => Object.entries(currUser).forEach(([currKey,currValue]) => (
                    users.forEach(el => el.likes?.forEach(item => Object.entries(item).forEach(([key, value]) => {
                            if (currUserProfile.docId === key && value && currKey === el.docId && currValue) {
                                setCouples(prev => [...prev, el.docId])
                                updateDoc(docRef, {
                                    couples: arrayUnion(el.docId)
                                })
                            }
                        }
                    )))
                )))

            } catch (e) {console.log(e)}
        }
        start().then(() => {   
            setState(prev => ({...prev, modalLoad: false}))
        })
    },[userF])


    return (<>
        <ContainerGradient>
            <div>
            <ModalLoading isOpen={state.modalLoad}/>
                <Modal
                    open={openModalDelete}
                    aria-labelledby="modal-modal-delete"
                >
                    <Box sx={styleModalDelete}>
                        <Typography id="modal-modal-title" style={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                            Czy chcesz usunąć parę ?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 , fontFamily: "Roboto Serif"}}>
                        Spowoduje to usunięcie tej osoby z listy Twoich par. Ta osoba nie będzie widoczna na głównej tablicy.
                    </Typography>
                        <div style={{display: "flex", justifyContent: "space-between"}}>

                        <Button
                            sx={{marginTop: "30px", width: "40%"}}
                            size="large"
                            startIcon={<CheckIcon />}
                            onClick={deleteCouple}
                            variant="outlined"
                            color="success">
                            Tak
                        </Button>
                        <Button
                            sx={{marginTop: "30px", width: "40%"}}
                            size="large"
                            onClick={handleCloseModalDelete}
                            startIcon={<CancelIcon/>}
                            variant="outlined"
                            color="error">
                            Nie
                        </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        <Title/>
        {couples.length !== 0?
        <div className={classes.usersContainer}>
            <div className={classes.quote}>
                <p>„Wolność polega na śmiałości”</p>
                <p className={classes.author}>Robert Frost</p>
            </div>
                <nav>
                    {users?.map((el, index) => (couples?.some(item => item === el.docId) ?
                        <li key={index} style={itemStyles} >
                            <p className={classes.textLi}>{el.personalDataForm.name}</p>
                            <p className={classes.textwelcomeChat}>Wejdź na Chat!</p>
                            <div className={classes.btnContainer}>
                                <button onClick={() => handleClick(el.docId)} className={classes.button}>
                                    <PersonIcon style={{fontSize: "1.6rem"}}/>
                                </button>
                                <button className={classes.button}>
                                    <CancelIcon onClick={() => handleOpenModalDelete(el.docId ,el.UID)} style={{fontSize: "1.6rem"}}/>
                                </button>
                            </div>
                        {clickedUser === el.docId && showUserCard? <UsersCard name={el.personalDataForm.name} city={el.personalDataForm.city} age={el.personalDataForm.age} question={el.question} story={el.story} gender={el.personalDataForm.gender} avatar64={el.avatar64} avatar64Height={el.avatar64Height} height={el.personalDataForm.height}/> :null}
                    </li>
                    :null))}
                </nav>
        </div>
          :<>
          <div className={classes.afterUsersText}>Obecnie brak par. Wejdź na stronę główną i polajkuj profile innych użytkowników <div><HomeIcon color="secondary"/></div></div>
          <div className={classes.afterUsersImg}/>
          </>}
        {showUserCard? <FancyButton close={closeUserCard}/>:null}
        
        <Navigation curr="Pary"/>
        </ContainerGradient>
    </>)
}

export default Likes