import React, {useState, useEffect, useContext} from "react"
import {
    getFirestore, collection, getDocs, query, where
} from 'firebase/firestore'


import {createUseStyles} from "react-jss";

import ModalLoading from "./partials/ModalLoading";
import ModalFirstSession from "./partials/ModalFirstSession";
import ProfilePhoto from "./partials/ProfilePhoto";
import ProfileInfo from "./partials/ProfileInfo"
import Logout from "./partials/Logout"
import Story from "./partials/Story"
import ProfileCard from "./partials/ProfileCard"
import ShowIntro from "./partials/ShowIntro";
import DeleteProfile from "./partials/DeleteProfile"
import Navigation from "./partials/Navigation"
import {AppContext} from "../../App";

const db = getFirestore()



const useStyles = createUseStyles((theme) => ({
volumeContainer : {
    position: "absolute", 
    top: "0", 
    left: "0",
    width: "2rem",
    borderRadius: "20px 20px 150px 20px",
    height: "2rem",
    zIndex: "2",
    color: "white",
    backgroundColor: "rgb(170, 63, 236)"
},
skipContainer: {
    position: "absolute", 
    top: "0", 
    right: "0",
    width: "2rem",
    height: "2rem",
    zIndex: "2",
    color: "white",
    borderRadius: "20px 20px 20px 150px",
    backgroundColor: "rgb(170, 63, 236)"
},

    buttonContainer: {
        paddingLeft: "16px",
        paddingRight: "16px",
        margin: "0 auto"
    },
    titleFirstSession: {
        display: "inline-block",
        fontFamily: "Roboto Serif",
        fontSize: "1.6rem"
    },
    welcome: {
        fontFamily: "Roboto Serif",
        textAlign: "left",
        fontSize: "1.1rem",
        paddingTop: "10px",
        height: "100%"
    }
}))


const Profile = () => {
    const { state: { user: userF } } = useContext(AppContext);
    const {state, setState} = useContext(AppContext)
    const [user, setUser] = useState({})
    const [docId, setDocId] = useState("")
    const classes = useStyles();

      
    useEffect(() => {
        if (!userF?.uid) return;

        let isFirSession
        const start = async () => {
            try {
                const q = query(collection(db, "Users"), where("UID", "==", userF.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    isFirSession = doc.data().isFirstSession
                    setDocId(doc.id)
                    setUser(doc.data());
                })

            } catch (e) {console.log(e)}
        }

        start().then(() => {
            setState(prev => ({...prev, modalLoad: false}))
            if (isFirSession) {
            setState(prev => ({...prev, openFirstSession: true})) 
        }})

    }, [userF] )


    return (<>
            <ModalLoading open={state.modalLoad}/>
            <ModalFirstSession docId={docId}/>
    
            <ProfilePhoto
                userName={user.personalDataForm? user.personalDataForm.name: null}
                age={user.personalDataForm? user.personalDataForm.age: null}
            />

            <ProfileInfo
                name={user.personalDataForm? user.personalDataForm.name: null}
                birth={user.personalDataForm? user.personalDataForm.birth: null}
                email={user.personalDataForm? user.personalDataForm.email: null}
                city={user.personalDataForm? user.personalDataForm.city: null}
                height={user.personalDataForm? user.personalDataForm.height: null}
            >    
            <Story/>
            </ProfileInfo>
            <div className={classes.buttonContainer}>
                <ShowIntro/>
                <ProfileCard
                    name={user.personalDataForm? user.personalDataForm.name: null}
                    gender={user.personalDataForm? user.personalDataForm.gender: null}
                    age={user.personalDataForm? user.personalDataForm.age: null}
                    plot={state.plot? state.plot:null}
                />
                <Logout />
                <DeleteProfile uid={user? user.UID : null}/>
            </div>
            <Navigation curr="Profil"/>


    </>)
}

export default Profile