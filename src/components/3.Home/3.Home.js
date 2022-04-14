import React, {useContext, useEffect, useState} from "react";
import Title from "../1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import {AppContext} from "../../App";
import {collection, doc, getDocs, getFirestore, updateDoc, arrayUnion} from "firebase/firestore";
import UsersCard from "./partials/UsersCard"
import Modal from "@mui/material/Modal";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {createUseStyles} from "react-jss";
import myDraw from "../../images/draw.png"
import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelIcon from '@mui/icons-material/Cancel';
import ContainerGradient from "./partials/ContainerGradient"



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
    afterUsersImg: {
        overflowY: "scroll",
        overflowX: "hidden",
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translate(-50%, 0)",
        width: "100%",
        backgroundImage: `url(${myDraw})`,
        height: "40vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    afterUsersText: {
        position: "absolute",
        top: "50vh",
        left: "50%",
        transform: "translate(-50%, 0)",
        width: "95%",
        fontFamily: "Roboto Serif",
        textAlign: "center",
        fontSize: "1.2rem",
    }
}))



const Home = () => {
    const {state ,setState} = useContext(AppContext)
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [loadedUsers, setLoadedUsers] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);



    const addLike = () => {
        const docId = [...users].pop().docId
        const object = {[docId]: true}
        updateDoc(docRef, {
            likes: arrayUnion(object)
        }).catch((err) => {console.log(err.message)})
        setUsers(prevState => ([...prevState].splice(0,prevState.length -1)))
    }

    const addUnlike = () => {
        const docId = [...users].pop().docId
        const object = {[docId]: false}
        updateDoc(docRef, {
            likes: arrayUnion(object)
        }).catch((err) => {console.log(err.message)})
        setUsers(prevState => ([...prevState].splice(0,prevState.length -1)))
    }



    useEffect(()=> {
        setState(prev => ({...prev, photo: true, story: true}))
        getDocs(colRef)
            .then(snapshot => {
                const arr = []
                let userInteractions = []
                snapshot.docs.forEach(doc => {
                    if (doc.data().personalDataForm.UID === localStorage.getItem("uid")){
                        setCurrentUser({ ...doc.data()})
                        doc.data().likes?.forEach(el => Object.entries(el).forEach(([key, value]) => userInteractions.push(key)))
                    }
                })
                snapshot.docs.forEach(doc => {
                    const isInteracted = userInteractions.some(el => (el === doc.data().docId))
                    if (!isInteracted && doc.data().personalDataForm.UID !== localStorage.getItem("uid")){
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
        <ContainerGradient>
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
        <div>
        <div style={{position: "relative", top: "50%", left: "0"}}>
            <div className={classes.afterUsersImg}/>
            <div className={classes.afterUsersText}>Wygląda na to, że to już wszyscy. Sprawdź swoje pary... <div><FavoriteIcon color="secondary"/></div></div>
            <div style={{position: "relative", top: "50%", left: "50%", width: "95vw", transform: "translate(-50%, -50%)" }}>
                {loadedUsers === true? users?.map((el, i) => (
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
        </div>

        {users.length === 0 ? null:
          <ButtonGroup fullWidth style={{position: "fixed", bottom: "70px", left: "50%", width: "90%",transform: "translate(-50%, 0)"}} disableElevation variant="contained">
            <Button style={{backgroundColor: "transparent", height: "10vh"}} onClick={addUnlike}><CancelIcon/></Button>
            <Button style={{backgroundColor: "transparent"}} onClick={addLike}><FavoriteIcon/></Button>
          </ButtonGroup>
        }

        <Navigation curr="Główna"/>
        </ContainerGradient>
    </>)
}

export default Home