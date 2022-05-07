import React, {useContext, useEffect, useState} from "react"

import Modal from "@mui/material/Modal";
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
    userCard : {    
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "95%",
        bgcolor: 'background.paper',
        boxShadow: 24,},
    btn: {
        boxShadow: "rgb(68 68 68 / 10%) 0px 3px 3px 0px",
        marginTop: "10px",
    }

};


const ProfileCard = ({name, gender, plot, age}) => {

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
                {state.photo && state.story ? null : <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                    Najpierw wstaw swoje zdjęcie i uzupełnij historię
                </Typography>}

                {state.photo && state.story ?
                    <Card sx={{ height: "60vh"}} style={{overflowY: "scroll", overflowX: "hidden"}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography style={{fontFamily: "Roboto Serif"}} gutterBottom variant="h4" component="div">
                                {name}, {age} lat
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