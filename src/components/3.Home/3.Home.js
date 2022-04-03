import React, {useContext, useEffect, useState} from "react";
import Title from "../1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import {AppContext} from "../../App";
import {collection, doc, getDocs, getFirestore,where, query , updateDoc, arrayUnion} from "firebase/firestore";
import UsersCard from "./partials/UsersCard"
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {createUseStyles} from "react-jss";
import CloseIcon from '@mui/icons-material/Close';


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

const useStyles = createUseStyles((theme) => ({
    buttonAccept: {
        position: "absolute",
        top: "80%",
        right: "5vw",
        borderRadius: "50px",
        width: "5rem",
        height: "5rem",
        backgroundColor: "red",
        fontSize: "2rem"
    },
    buttonReject: {
        position: "absolute",
        top: "80%",
        left: "5vw",
        borderRadius: "50px",
        width: "5rem",
        height: "5rem",
        backgroundColor: "green",
        fontSize: "2rem"
    },
}))



const Home = () => {
    const {state ,setState} = useContext(AppContext)
    const classes = useStyles();
    const [users, setUsers] = useState({})
    const [loadedUsers, setLoadedUsers] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);

    const handleClick = () => {
        console.log('Obecny użytkownik', currentUser.docId)

        currentUser.likes.forEach(currUser => Object.entries(currUser).forEach(([currKey,currValue]) => (
            users.forEach(el => el.likes?.forEach(item => Object.entries(item).forEach(([key, value]) => {
                if (currentUser.docId === key && value && currKey === el.docId && currValue) {
                    console.log(el.personalDataForm.name)
                    updateDoc(docRef, {
                        couples: arrayUnion(el.docId)
                    }).then(() => {
                        console.log("Zapisano")
                    }).catch((err) => {console.log(err.message)})
                }
                }

            )))
        )))


    }

    const addLike = () => {
        console.log([...users].pop().personalDataForm.UID)
        const docId = [...users].pop().docId
        const object = {[docId]: true}
        updateDoc(docRef, {
            likes: arrayUnion(object)
        }).then(() => {
            console.log("Zapisano")
        }).catch((err) => {console.log(err.message)})
        setUsers(prevState => ([...prevState].splice(0,prevState.length -1)))
    }

    const addUnlike = () => {
        console.log([...users].pop().personalDataForm.UID)
        const docId = [...users].pop().docId
        const object = {[docId]: false}
        updateDoc(docRef, {
            likes: arrayUnion(object)
        }).then(() => {
            console.log("Zapisano")
        }).catch((err) => {console.log(err.message)})

        setUsers(prevState => ([...prevState].splice(0,prevState.length -1)))
    }


    useEffect(()=>{
        setState(prev => ({...prev, photo: true, story: true}))
        getDocs(colRef)
            .then(snapshot => {
                const arr = []
                snapshot.docs.forEach(doc => {
                    if (doc.data().personalDataForm.UID === localStorage.getItem("uid")){
                        setCurrentUser({ ...doc.data()})
                    }
                    if ((doc.data().avatar64 && doc.data().story) && doc.data().personalDataForm.UID !== localStorage.getItem("uid")){
                        arr.push({...doc.data()})
                        setUsers(arr)
                    }
                })
            })
            .catch(err => {
                console.log(err.message)
            }).then(() => {
                setLoadedUsers(true);
                handleClose()})
    },[])


    return (<>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
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
        <div>
        <div style={{position: "relative", top: "50%", left: "0"}}>
        {loadedUsers === true? users.map((el, i) => (
            <UsersCard
                zIndex={i+1}
                key={i}
                name={el.personalDataForm.name}
                age={el.personalDataForm.age}
                height={el.personalDataForm.height}
                question={el.question}
                gender={el.personalDataForm.gender}
                avatar64={el.avatar64}
                avatar64Height={el.avatar64Height}
                story={el.story}/>))
            :null}
        </div>
        </div>
        <button onClick={addLike} className={classes.buttonReject}><CloseIcon/></button>
        <button onClick={addUnlike} className={classes.buttonAccept}><CloseIcon/></button>
        <button onClick={handleClick} style={{position: "absolute", top: "80%"}}>vvvvvvvvvvvvv</button>
        <Navigation curr="Główna"/>
    </>)
}

export default Home