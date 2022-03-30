import React, {useContext, useState, useEffect, useRef} from "react"

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from '@mui/icons-material/Person';
import {AppContext} from "../../../App";
import MyCanvas from "./MyCanvas"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea} from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    minHeight: "100%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};


const ProfileCard = ({name, birth, story, Avatar64, gender, isUpload}) => {

    const {state ,setState} = useContext(AppContext)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getUserAge = (dataBirth) => {
        let currentData = new Date().getFullYear();
        let userAge;
        if (dataBirth !== null) {
            const year = parseInt([...dataBirth].splice(6, 4).join('').toString())
            userAge = currentData - year;
        }
        return userAge
    }


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
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {state.photo && state.story ? null : <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                    Najpierw wstaw swoje zdjęcie i uzupełnij swoją historię
                </Typography>}


                <Card sx={{ height: "40rem"}} style={{overflow: "scroll"}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {getUserAge(birth)} lat
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {story}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            width="100%"
                            image={Avatar64}
                        />
                        <MyCanvas Avatar64={Avatar64} gender={gender}/>
                    </CardActionArea>
                </Card>

                    <Button
                        sx={{marginTop: "30px", backgroundColor: "lightgreen"}}
                        size="large"
                        fullWidth
                        onClick={handleClose}
                        startIcon={<CheckIcon />}
                        variant="outlined"
                        color="success">
                        ok
                    </Button>
            </Box>
        </Modal>
    </div>


</>)
}

export default ProfileCard