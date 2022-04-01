import React, {useContext, useEffect, useState} from "react"

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import {AppContext} from "../../../App";
import MyCanvas from "./MyCanvas"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button, CardActionArea} from '@mui/material';
import {topic} from "./topic"

import { getDocs, collection} from 'firebase/firestore'
import {db} from "../../../firebase"
const colRef = collection(db, 'Users')


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    bgcolor: 'background.paper',
    boxShadow: 24,
};


const ProfileCard = ({name, birth, gender, plot}) => {

    const {state} = useContext(AppContext)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [story, setStory] = useState(false)
    const [question, setQuestion] = useState(false)

    const getUserAge = (dataBirth) => {
        let currentData = new Date().getFullYear();
        let userAge;
        if (dataBirth !== null) {
            const year = parseInt([...dataBirth].splice(6, 4).join('').toString())
            userAge = currentData - year;
        }
        return userAge
    }


    useEffect(() => {
        getDocs(colRef)
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (doc.data().personalDataForm.UID === localStorage.getItem("uid")){
                        setStory(doc.data().story)
                        setQuestion(doc.data().question)
                    }
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [] )

return (<>
    <Button
        sx={{marginTop: "10px"}}
        onClick={handleOpen}
        size="large"
        endIcon={<PersonIcon/>}
        fullWidth
        variant="outlined"
    >
        Pokaż mój profil
    </Button>
    <div>

        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                {state.photo && state.story ? null : <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                    Najpierw wstaw swoje zdjęcie i uzupełnij historię
                </Typography>}

                {state.photo && state.story ?
                    <Card sx={{ height: "30rem"}} style={{overflowY: "scroll", overflowX: "hidden"}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography style={{fontFamily: "Roboto Serif"}} gutterBottom variant="h4" component="div">
                                {name}, {getUserAge(birth)} lat
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
            </Box>
        </Modal>
    </div>


</>)
}

export default ProfileCard