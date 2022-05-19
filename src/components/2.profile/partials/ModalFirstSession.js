import React, {useState, useContext} from "react"

import {doc, updateDoc, getFirestore} from 'firebase/firestore'


import {AppContext} from "../../../App";

import RedoIcon from '@mui/icons-material/Redo';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {createUseStyles} from "react-jss";

import audio from "../../../sounds/intro.mp3";
import Typewriter from "typewriter-effect";

const thanksText = 'Cześć! Jest mi miło, że tu jesteś...'
const posibilityText = 'Przed Tobą kilka niespodzianek. Zobaczysz animację składającą się z 2500 małych obiektów przypominających Ciebie. Poznasz innych użytkowników, a także  nawiążesz z nimi kontakt...'
const rememberText = ' Jednak przedtem, pamiętaj o kilku rzeczach...'
const firstHintText = 'Wstaw swoje zdjęcie, najlepiej portretowe. Animacja zdjęć jest tajemnicza. Dzięki temu kluczowe w poznawaniu innych są historie, a portrety pozostają w sferze Twojej fantazji...💫'
const secHintText = 'Wybierz jedno z pytań i napisz swoją historię. Potem przejdź do strony głównej 🏠. Życzę Ci wiele miłych chwil... '
const PS = 'PS. Vanilla-Date jest młoda więc ma mało użytkowników. Proszę, zajrzyj tu następnego dnia...'

const intro = new Audio(audio)

const stylesModal = {
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

const db = getFirestore()

const ModalFirstSession = ({docId}) => {
    const {state, setState} = useContext(AppContext)
    const [mute, setMute] = useState(false)
    const classes = useStyles();
    const handleCloseFirstSession = () => setState(prev => ({...prev, openFirstSession: false}));

    const changeVolume = () => {
        setMute(!mute)
        intro.volume === 1 ? intro.volume = 0: intro.volume=1
    }
    
    
        const skip = () => {
            handleCloseFirstSession()
            intro.pause()
            intro.currentTime = 0;
        }


    return (<>
            <Modal
                open={state.openFirstSession === undefined ? false:state.openFirstSession }
                aria-labelledby="modal-modal-firstSession">
                <Box sx={stylesModal.modalFirstSession}>
                    <h1 className={classes.titleFirstSession}>Pierwszy raz...</h1>
                    <div className={classes.welcome}>
                        <Typewriter
                        options={{delay: 45}}
                        onInit={(typewriter) => {
                            typewriter.
                            callFunction(() => {
                                intro.play()
                              }).
                            typeString(thanksText).
                            pauseFor(1800).
                            deleteAll(-1000).
                            typeString(posibilityText).
                            pauseFor(2000).
                            deleteAll(-1000).
                            typeString(rememberText).
                            pauseFor(1500).
                            deleteAll(-1000).
                            typeString(firstHintText).
                            pauseFor(2000).
                            deleteAll(-1000).
                            typeString(secHintText).
                            pauseFor(1700).
                            typeString(PS).
                            pauseFor(1700).
                            start().
                            callFunction(() => {
                                const docRef = doc(db, 'Users', docId)
                                updateDoc(docRef, {
                                    isFirstSession: false
                                })
                                handleCloseFirstSession()
                              })
                        }}
                        />
                     </div>

                     <div className={classes.skipContainer}>
                        <RedoIcon style={stylesModal.iconSkip} onClick={skip}/>
                     </div>
                     
                     <div onClick={changeVolume} className={classes.volumeContainer}>
                         {mute ? 
                         <VolumeOffIcon style={stylesModal.iconVolume}/>: 
                         <VolumeUpIcon style={stylesModal.iconVolume}/>}
                     </div>
                     
                </Box>
            </Modal>
    </>)
}

export default ModalFirstSession