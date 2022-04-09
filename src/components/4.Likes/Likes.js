import React, {useContext, useEffect, useState} from "react"
import {arrayUnion, collection, doc, getDocs, getFirestore, updateDoc} from "firebase/firestore";
import Title from "../../components/1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import {AppContext} from "../../App";
import ContainerGradient from "../3.Home/partials/ContainerGradient"
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {createUseStyles} from "react-jss";

import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';


const db = getFirestore()
const colRef = collection(db, 'Users')
const docRef = doc(db, 'Users', localStorage.getItem("doc.id"))

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: "center",
    p: 4,
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
    navContainer: {
        // border: "1px solid black",
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "5px",
        width: "95vw",
        height: "60vh",
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
}
}))


const Likes = () => {
    const {state ,setState} = useContext(AppContext)
    const [users, setUsers] = useState([])
    const classes = useStyles();
    const [onlyOnce, setOnlyOnce] = useState(true)
    const [loadedUsers, setLoadedUsers] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [couples, setCouples] = useState([])
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    
    const handleClick = () => {
        console.log("click")
    }

    const getCouples = () => {
        if (onlyOnce) {
                currentUser.likes?.forEach(currUser => Object.entries(currUser).forEach(([currKey,currValue]) => (
                    users.forEach(el => el.likes?.forEach(item => Object.entries(item).forEach(([key, value]) => {
                            if (currentUser.docId === key && value && currKey === el.docId && currValue) {
                                console.log(el.personalDataForm.name)
                                updateDoc(docRef, {
                                    couples: arrayUnion(el.docId)
                                }).then(() => {
                                    console.log("Zapisano")
                                    setOnlyOnce(false)
                                }).catch((err) => {console.log(err.message)})
                            }
                        }
                    )))
                )))
        } else {return null}
    }

    useEffect(()=> {
        setState(prev => ({...prev, photo: true, story: true}))
        let currUserProfile
        const users = []
        getDocs(colRef)
            .then(snapshot => {
                const userInteractions = []
                
                snapshot.docs.forEach(doc => {
                    if (doc.data().personalDataForm.UID === localStorage.getItem("uid")){
                        setCurrentUser({ ...doc.data()})
                        currUserProfile = {...doc.data()}
                        doc.data().likes?.forEach(el => Object.entries(el).forEach(([key, value]) => userInteractions.push(key)))
                    }
                })
                snapshot.docs.forEach(doc => {
                    const isInteracted = userInteractions.some(el => (el === doc.data().docId))
                    if (isInteracted && doc.data().personalDataForm.UID !== localStorage.getItem("uid")){
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
                                console.log(el.personalDataForm.name)
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
                handleClose()
            setLoadedUsers(true)})
    },[])


    return (<>
        <ContainerGradient>
            {console.log(couples)}
            <div>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                >
                    <Box sx={style}>
                        <CircularProgress />
                        <Typography id="modal-modal-title" style={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                            chwila...
                        </Typography>
                    </Box>
                </Modal>
            </div>
        <Title/>
        <div className={classes.navContainer}>

            <nav>
                {users?.map((el, index) => (couples?.some(item => item === el.docId) ?
                    <li key={index} style={itemStyles} >
                        <p className={classes.textLi}>{el.personalDataForm.name}</p>
                        <div className={classes.btnContainer}>
                            <button onClick={handleClick} className={classes.button}><PersonIcon/></button>
                            <button onClick={handleClick} className={classes.button}><ChatIcon/></button>
                            <button onClick={handleClick} className={classes.button}><CancelIcon/></button>
                        </div>
                    </li>
                :null))}
            </nav>


        </div>
        <Navigation curr="Pary"/>
        </ContainerGradient>
    </>)
}

export default Likes