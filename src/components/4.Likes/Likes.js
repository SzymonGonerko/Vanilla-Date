import React, {useContext, useEffect, useState} from "react"
import {arrayUnion, collection, doc, getDocs, getFirestore, updateDoc, arrayRemove} from "firebase/firestore";
import Title from "../../components/1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import UsersCard from "../3.Home/partials/UsersCard"
import {AppContext} from "../../App";
import ContainerGradient from "../3.Home/partials/ContainerGradient"
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {createUseStyles} from "react-jss";
import myDraw from "../../images/draw.png"


import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import HomeIcon from '@mui/icons-material/Home';


const db = getFirestore()
const colRef = collection(db, 'Users')
const docRef = doc(db, 'Users', localStorage.getItem("doc.id"))

const styleModalLoad = {
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
    p: 4,
};

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
    margin: "0 5px 10px 5px",
    borderRadius: "5px",
    height: "10vh",
    paddingLeft: "5px"}

const useStyles = createUseStyles((theme) => ({
    "@keyframes anim": {
        "0%": {
            borderRadius: "30% 70% 70% 30% / 30% 52% 48% 70%",
            boxShadow: "0 -2vmin 4vmin LightPink inset, 0 -4vmin 4vmin MediumPurple inset, 0 -2vmin 7vmin purple inset",
        },
    
        "10%": {
            borderRadius: "50% 50% 20% 80% / 25% 80% 20% 75%",
        },
    
        "20%": {
            borderRadius: "67% 33% 47% 53% / 37% 20% 80% 63%",
        },
    
        "30%": {
            borderRadius: "39% 61% 47% 53% / 37% 40% 60% 63%",
            boxShadow: "0 -4vmin 8vmin hotpink inset, -1vmin -2vmin 6vmin LightPink inset, -1vmin -2vmin 4vmin MediumPurple inset, 1vmin 4vmin 8vmin purple inset",
        },
    
        "40%": {
            borderRadius: "39% 61% 82% 18% / 74% 40% 60% 26%",
        },
    
        "50%": {
            borderRadius: "100%",
            boxShadow: "0 4vmin 16vmin hotpink inset, 0 2vmin 5vmin LightPink inset, 0 4vmin 4vmin MediumPurple inset, 0 6vmin 8vmin purple inset",
        },
    
        "60%": {
            borderRadius: "50% 50% 53% 47% / 72% 69% 31% 28%",
        },
    
        "70%": {
            borderRadius: "50% 50% 53% 47% / 26% 22% 78% 74%",
            boxShadow: "0.5vmin 0.5vmin 4vmin LightPink inset, 1vmin -0.5vmin 2vmin MediumPurple inset, -1vmin -1vmin 16vmin purple inset",
        },
    
        "80%": {
            borderRadius: "50% 50% 53% 47% / 26% 69% 31% 74%",
        },
    
        "90%": {
            borderRadius: "20% 80% 20% 80% / 20% 80% 20% 80%",
        },
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
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "40%"
    },
    textLi : {
        lineHeight: "10vh",
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

buttonCosmicEgg: {
    position: "fixed",
    display: "block",
    border: "none",
    bottom: "5vh",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: "15vh", 
    width: "15vh", 
    animation: "anim 30s infinite",
	background: "radial-gradient(circle at 0% 0%, hotpink, slateblue)",
	borderRadius: "30% 70% 53% 47% / 26% 46% 54% 74%",
	boxShadow: "0 -2vmin 4vmin LightPink inset, 0 1vmin 4vmin MediumPurple inset, 0 -2vmin 7vmin purple inset",
	filter: "drop-shadow(0 0 3vmin Thistle) drop-shadow(0 5vmin 4vmin Orchid) drop-shadow(2vmin -2vmin 15vmin MediumSlateBlue) drop-shadow(0 0 7vmin MediumOrchid)",
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
    const [couples, setCouples] = useState([])
    

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const handleOpenModalDelete = (docid) => (setOpenModalDelete(true), setUserToDelete(docid))
    const handleCloseModalDelete = () => setOpenModalDelete(false)

    const [openModalLoad, setOpenModalLoad] = React.useState(true);
    const handleCloseModalLoad = () => setOpenModalLoad(false);
    

const handleClick = (index) => {
    setShowUserCard(true)
    setClickedUser(index)
}

const deleteCouple = () => {
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
        setState(prev => ({...prev, photo: true, story: true}))
        let currUserProfile
        const users = []
        const userDeletedCouples = []
        getDocs(colRef)
            .then(snapshot => {
                const userInteractions = []
                snapshot.docs.forEach(doc => {
                    if (doc.data().personalDataForm.UID === localStorage.getItem("uid")){
                        setCurrentUser({ ...doc.data()})
                        currUserProfile = {...doc.data()}
                        doc.data().likes?.forEach(el => Object.entries(el).forEach(([key, value]) => userInteractions.push(key)))
                        doc.data().deletedCouples?.forEach(el => userDeletedCouples.push(el))
                    }
                })
                snapshot.docs.forEach(doc => {
                    const isInteracted = userInteractions.some(el => (el === doc.data().docId))
                    const isDeleted = userDeletedCouples.some(el => (el === doc.data().docId))
                    if (!isDeleted && isInteracted && doc.data().personalDataForm.UID !== localStorage.getItem("uid")){
                        users.push({...doc.data()})
                        setUsers(users)
                    }
                })
            })
            .catch(err => {
                console.log(err.message)
            }).then(() => {
                currUserProfile.likes?.forEach(currUser => Object.entries(currUser).forEach(([currKey,currValue]) => (
                    users.forEach(el => el.likes?.forEach(item => Object.entries(item).forEach(([key, value]) => {
                            if (currUserProfile.docId === key && value && currKey === el.docId && currValue) {
                                setCouples(prev => [...prev, el.docId])
                                updateDoc(docRef, {
                                    couples: arrayUnion(el.docId)
                                }).then(() => {
                                    console.log("Zapisano")
                                }).catch((err) => {console.log(err.message)})
                            }
                        }
                    )))
                )))
                handleCloseModalLoad()
                })
    },[])


    return (<>
        <ContainerGradient>
            <div>
                <Modal
                    open={openModalLoad}
                    aria-labelledby="modal-modal-title"
                >
                    <Box sx={styleModalLoad}>
                        <CircularProgress />
                        <Typography id="modal-modal-load" style={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                            chwila...
                        </Typography>
                    </Box>
                </Modal>
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
            
                <nav>
                    {users?.map((el, index) => (couples?.some(item => item === el.docId) ?
                        <li key={index} style={itemStyles} >
                            <p className={classes.textLi}>{el.personalDataForm.name}</p>
                            <div className={classes.btnContainer}>
                                <button onClick={() => handleClick(el.docId)} className={classes.button}>
                                    <PersonIcon style={{fontSize: "1.6rem"}}/>
                                </button>
                                <button className={classes.button}>
                                    <ChatIcon style={{fontSize: "1.6rem"}}/>
                                </button>
                                <button className={classes.button}>
                                    <CancelIcon onClick={() => handleOpenModalDelete(el.docId)} style={{fontSize: "1.6rem"}}/>
                                </button>
                            </div>
                        {clickedUser === el.docId && showUserCard? <UsersCard name={el.personalDataForm.name} age={el.personalDataForm.age} question={el.question} story={el.story} gender={el.personalDataForm.gender} avatar64={el.avatar64} avatar64Height={el.avatar64Height} height={el.personalDataForm.height}/> :null}
                    </li>
                    :null))}
                </nav>
        </div>
          :<>
          <div className={classes.afterUsersText}>Obecnie brak par. Wejdź na stronę główną i polajkuj profile innych użytkowników <div><HomeIcon color="secondary"/></div></div>
          <div className={classes.afterUsersImg}/>
          </>}
        {showUserCard? <button onClick={closeUserCard} className={classes.buttonCosmicEgg}/> :null}
        
        <Navigation curr="Pary"/>
        </ContainerGradient>
    </>)
}

export default Likes