import React, {useContext, useEffect, useState} from "react";

import ModalLoading from "../2.profile/partials/ModalLoading";
import Title from "../1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import {AppContext} from "../../App";
import {collection, doc, getDocs, getFirestore, updateDoc, arrayUnion, query, where, limit, startAfter, orderBy} from "firebase/firestore";
import UsersCard from "./partials/UsersCard"
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {createUseStyles} from "react-jss";
import myDraw from "../../images/draw.png"
import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelIcon from '@mui/icons-material/Cancel';
import ContainerGradient from "./partials/ContainerGradient"



const db = getFirestore()
const colRef = collection(db, 'Users')

const stylesModal = {
    btnGroup : {
        position: "fixed", 
        bottom: "70px", 
        left: "50%", 
        width: "90%",
        transform: "translate(-50%, 0)"
    },
    btn: {
        backgroundColor: "transparent", 
        height: "3.5rem"
    }
}

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
        top: "45vh",
        left: "50%",
        transform: "translate(-50%, 0)",
        width: "95%",
        fontFamily: "Roboto Serif",
        textAlign: "center",
        fontSize: "1.2rem",
    },
    usersContainer: {
        position: "relative", 
        top: "0", 
        left: "0"
    },
    usersWrapper: {
        position: "fixed",
        top: "75px",
        bottom: "150px",
        left: "50%",
        width: "95vw",
        transform: "translate(-50%, 0)" 
    }
}))



const Home = () => {
    const { state: { user: userF } } = useContext(AppContext);
    const {state ,setState} = useContext(AppContext)
    const classes = useStyles();
    const [users, setUsers] = useState([])
    const [loadedUsers, setLoadedUsers] = useState(false)
    const [currentUser, setCurrentUser] = useState({})


    const afterInteraction = () => {
        setUsers(prevState => ([...prevState].splice(0,prevState.length -1)))
    }

    const addLike =  () => {
        setState(prev => ({...prev, selectedUser: users.length, isLike: true}))
        const docRef = doc(db, 'Users', currentUser.docId)
        const docId = [...users].pop().docId
        const object = {[docId]: true}
        setTimeout(() => {      
            updateDoc(docRef, {
            likes: arrayUnion(object)
        }).then(() => {afterInteraction()}).catch((err) => {console.log(err.message)})}, 350)

    }

    const addUnlike = () => {
        setState(prev => ({...prev, selectedUser: users.length, isLike: false}))
        const docRef = doc(db, 'Users', currentUser.docId)
        const docId = [...users].pop().docId
        const object = {[docId]: false}
        setTimeout(() => { 
            updateDoc(docRef, {
                likes: arrayUnion(object)
            }).then(() => {
                afterInteraction()}
            ).catch((err) => {console.log(err.message)})
        }, 350)
    }



    useEffect(()=> {
        if (!userF?.uid) return;
        setState(prev => ({...prev, photo: true, story: true}))

        const start = async () => {
            let userInteractions = []
            const arr = []
            try {
                const qCurrUser = query(collection(db, "Users"), where("UID", "==", userF.uid));
                const currUser = await getDocs(qCurrUser);
                currUser.forEach((doc) => {
                    setCurrentUser({...doc.data(), docId: doc.id})
                    doc.data().likes?.forEach(el => Object.entries(el).forEach(([key, value]) => userInteractions.push(key)))
                })

                const qAllUsers = query(collection(db, "Users"), where("UID", "!=", userF.uid));
                const allUsers = await getDocs(qAllUsers);
                
                allUsers.forEach((doc) => {
                    if (arr.length >= 20) return
                    const isInteracted = userInteractions?.some(el => (el === doc.id))
                    if (!isInteracted && doc.data().story && doc.data().avatar64){
                        arr.push({...doc.data(), docId: doc.id})
                        setUsers(arr)
                    }
                })

            } catch (e) {console.log(e)}
        }
        start().then(() => {                
            setState(prev => ({...prev, modalLoad: false}))})
            setLoadedUsers(true)

    },[userF])



    return (<>
        <ContainerGradient>
        <ModalLoading open={state.modalLoad}/>
        <Title/>
        <div>
        <div className={classes.usersContainer}>
            <div className={classes.afterUsersImg}/>
            <div className={classes.afterUsersText}>Wygląda na to, że to już wszyscy. Sprawdź swoje pary... <div><FavoriteIcon color="secondary"/></div></div>
            <div className={classes.usersWrapper}>
                {loadedUsers === true? users?.map((el, i) => (
                <UsersCard
                    zIndex={i+1}
                    key={i}
                    name={el.personalDataForm.name}
                    age={el.personalDataForm.age}
                    city={el.personalDataForm.city}
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
          <ButtonGroup fullWidth style={stylesModal.btnGroup} disableElevation variant="contained">
            <Button style={stylesModal.btn} onClick={addUnlike}><CancelIcon/></Button>
            <Button style={stylesModal.btn} onClick={addLike}><FavoriteIcon/></Button>
          </ButtonGroup>
        }

        <Navigation curr="Główna"/>
        </ContainerGradient>
    </>)
}

export default Home