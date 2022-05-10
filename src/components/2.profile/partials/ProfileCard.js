import React, {useContext, useEffect, useState} from "react"

import Modal from "@mui/material/Modal";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import {AppContext} from "../../../App";
import MyCanvas from "./MyCanvas"

import FancyButton from "../../4.Likes/partials/FancyButton";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button, CardActionArea} from '@mui/material';

import { getDocs, collection, query,where} from 'firebase/firestore'
import {db} from "../../../firebase"
const colRef = collection(db, 'Users')


const stylesModal = {
    emptyStoryAndPhoto: {
        fontFamily: "Roboto Serif",
        fontWeight: "bold",
        padding: "30px",
        textAlign: "center",
    },
    icon: {color: "rgb(170, 63, 236)", fontSize: "2rem", margin: "10px"},
    userCard : {    
        position: 'absolute',
        borderRadius: "5px",
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "95%",
        bgcolor: 'background.paper',
        boxShadow: 24,},
    btn: {
        boxShadow: "rgb(68 68 68 / 10%) 0px 3px 3px 0px",
        marginTop: "10px",
    },
    typoName: {fontFamily: "Roboto Serif"},
    typoAgeHeightCity: {fontFamily: "Roboto Serif"},
    typoQuestion: {fontFamily: "Roboto Serif", fontSize: "1rem", color: "#9c27b0"},
    typoStory: {fontFamily: "Roboto Serif", fontSize: "1rem"}

};


const ProfileCard = ({name, gender, plot, age, height, city}) => {

    const {state} = useContext(AppContext)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [story, setStory] = useState(false)
    const [question, setQuestion] = useState(false)
    const { state: { user: userF } } = useContext(AppContext);


    useEffect(() => {
        if (!userF?.uid) return;
        const start = async () => {
            try {
                const q = query(collection(db, "Users"), where("UID", "==", userF.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setStory(doc.data().story)
                    setQuestion(doc.data().question)
                })

            } catch (e) {console.log(e)}
        }

 
        start().then(() => {handleClose()})
    }, [userF] )

return (<>
    <Button
        style={stylesModal.btn}
        onClick={handleOpen}
        size="large"
        endIcon={<PersonIcon/>}
        fullWidth
        variant="outlined"
    >
        mój profil
    </Button>
    <div>

        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={stylesModal.userCard}>
                {state.photo && state.story ? null : <Typography id="modal-modal-title" style={stylesModal.emptyStoryAndPhoto} variant="h6" component="h2">
                <InsertPhotoIcon style={stylesModal.icon}/><AutoStoriesIcon style={stylesModal.icon}/><br/>
                    Pamiętaj o wstawieniu zdjęcia i napisaniu swojej historii
                </Typography>}

                {state.photo && state.story ?
                    <Card sx={{ height: "60vh"}} style={{overflowY: "scroll", overflowX: "hidden"}}>
                    <CardActionArea>
                        <CardContent>
                        <Typography style={stylesModal.typoName} gutterBottom variant="h4" component="span">
                            {name},
                        </Typography>
                        <Typography style={stylesModal.typoAgeHeightCity} gutterBottom variant="h6" component="div">
                            {" "}{age} lat, {height} cm, {city}
                        </Typography>
                            <Typography style={{fontFamily: "Roboto Serif", fontSize: "1rem", color: "#9c27b0"}} variant="body1" color="text.secondary">
                                {state.question? state.question: question}
                            </Typography>
                            <Typography style={{fontFamily: "Roboto Serif", fontSize: "1rem"}} variant="body1" color="text.secondary">
                                {plot === null ? story: plot}
                            </Typography>
                        </CardContent>
                        <MyCanvas gender={gender}/>
                    </CardActionArea>
                </Card> : null}
                <FancyButton bottomPosition={"-30vh"} close={handleClose}/>
            </Box>
        </Modal>
    </div>


</>)
}

export default ProfileCard