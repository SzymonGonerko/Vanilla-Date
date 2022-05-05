import React, {useState, useEffect, useContext} from "react"
import {
    getFirestore, collection, getDocs,query, orderBy, where,doc, getDoc ,updateDoc, onSnapshot
} from 'firebase/firestore'


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import {createUseStyles} from "react-jss";

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


const stylesModal = {
    modalLoad: {
        position: 'absolute',
        outline: "none",
        borderRadius: "10px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        textAlign: "center",
        p: 4,
    },
    modalFirstSession: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        outline: "none",
        borderRadius: "10px",
        transform: 'translate(-50%, -50%)',
        width: "80%",
        minHeight: "35%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        textAlign: "center",
        p: 1,
    },
    iconVolume: {
        transform: "translate(-15%, 15%)",
        fontSize: "1.2rem"
    },
    iconSkip: {
        fontSize: "1.1rem",
        transform: "translate(15%, 15%)",
    }
}

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
    
   

    const [openModalLoad, setOpenModalLoad] = useState(true);
    const handleCloseModalLoad = () => setOpenModalLoad(false);

      
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

        start().then(() => {handleCloseModalLoad(); 
            if (isFirSession) {
            setState(prev => ({...prev, openFirstSession: true}))
            
        }})

    }, [userF] )


    return (<>
            <Modal
                open={openModalLoad}
                aria-labelledby="modal-modal-load">
                <Box sx={stylesModal.modalLoad}>
                    <CircularProgress />
                    <Typography id="modal-modal-load" style={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        chwila...
                    </Typography>
                </Box>
            </Modal>
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