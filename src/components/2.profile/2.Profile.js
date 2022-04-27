import React, {useState, useEffect, useContext} from "react"
import {
    getFirestore, collection, getDocs,query, orderBy, where,doc, getDoc , onSnapshot
} from 'firebase/firestore'

import audio from "../../images/login.mp3"
import Typewriter from "typewriter-effect";



import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import {createUseStyles} from "react-jss";

import ProfilePhoto from "./partials/ProfilePhoto";
import ProfileInfo from "./partials/ProfileInfo"
import FancyButton from "../4.Likes/partials/FancyButton";
import Logout from "./partials/Logout"
import Story from "./partials/Story"
import ProfileCard from "./partials/ProfileCard"
import DeleteProfile from "./partials/DeleteProfile"
import Navigation from "./partials/Navigation"
import {AppContext} from "../../App";

const db = getFirestore()


const stylesModal = {
    modalLoad: {
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
    },
    modalFirstSession: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        outline: "none",
        transform: 'translate(-50%, -50%)',
        width: "85%",
        height: "40%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        textAlign: "center",
        p: 1,
    }
}

const posibilityText = 'Zobaczysz animację składającą się z 2500 malutkich obiektów przypominających Twój portret. Poznasz profile innych użytkowników oraz ich historie. Porozmawiasz z wybranymi osobami.....'
const rememberText = ' Jednak zanim to nastąpi, pamiętaj o kilku ważnych rzeczach...'
const thanksText = 'Jest mi bardzo miło, że chcesz sprawdzić tę aplikację :). Przed Tobą kilka ciekawych funkconalności....'

const useStyles = createUseStyles((theme) => ({
    buttonContainer: {
        paddingLeft: "16px",
        paddingRight: "16px",
        margin: "0 auto"
    },
    titleFirstSession: {
        fontFamily: "Roboto Serif",
        fontSize: "1.6rem"
    },
    welcome: {
        fontFamily: "Roboto Serif",
        textAlign: "left",
        fontSize: "1.1rem",
        paddingTop: "10px"
    }
}))

const Profile = () => {
    const {state} = useContext(AppContext)
    const [user, setUser] = useState({})
    const classes = useStyles();
    
    const { state: { user: userF } } = useContext(AppContext);

    const [openModalLoad, setOpenModalLoad] = useState(true);
    const handleCloseModalLoad = () => setOpenModalLoad(false);

    const [openModalFirstSession, setOpenFirstSession] = useState(true);
    const handleCloseFirstSession = () => setOpenFirstSession(false);

    const playAudio = (url) => {
        new Audio(url).play();
      }
      

    useEffect(() => {
        if (!userF?.uid) return;


        const start = async () => {
            try {
                const q = query(collection(db, "Users"), where("UID", "==", userF.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    playAudio(audio)
                    setUser(doc.data());
                })

            } catch (e) {console.log(e)}
        }

        start().then(() => {handleCloseModalLoad()})



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

            <Modal
                open={openModalFirstSession}
                aria-labelledby="modal-modal-firstSession">
                <Box sx={stylesModal.modalFirstSession}>
                    <h1 className={classes.titleFirstSession}>Pierwszy raz...</h1>
                    <div className={classes.welcome}>
                        <Typewriter
                        options={{delay: 45}}
                        onInit={(typewriter) => {
                            typewriter.
                            typeString(thanksText).
                            pauseFor(2000).
                            deleteAll(-1000).
                            typeString(posibilityText).
                            pauseFor(2000).
                            deleteAll(-1000).
                            typeString(rememberText).
                            pauseFor(2000).
                            deleteAll(-1000).
                            start()}}
                        />
                     </div>
                    <FancyButton bottomPosition={"-30vh"} close={handleCloseFirstSession}/>
                </Box>
            </Modal>
    
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
        <ProfileCard
            name={user.personalDataForm? user.personalDataForm.name: null}
            gender={user.personalDataForm? user.personalDataForm.gender: null}
            age={user.personalDataForm? user.personalDataForm.age: null}
            plot={state.plot? state.plot:null}
        />
        <Logout />
        <DeleteProfile uid={user.personalDataForm? user.personalDataForm.UID : null}/>
    </div>
    <Navigation curr="Profil"/>


    </>)
}

export default Profile