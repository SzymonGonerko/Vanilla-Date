import React, {useContext, useState} from "react";
import {createUseStyles} from "react-jss";

import screenShot from "../../../../images/screenShot.jpg"
import shapeOfWater from "../../../../images/ShapeOfWater.jpg"
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FancyButton from "../../../4.Likes/partials/FancyButton";


const useStyles = createUseStyles((theme) => ({
    about: {fontSize: "2rem"},
    close: {
        display: "inline-block",
            width: "45vw",
            height: "8vh",
            borderRadius: "10px",
            backgroundColor: theme.colorPrimary,
            border: "none",
            fontSize: "2rem"
    },
    text: {
            padding: "10px",
            overflowY: "scroll",
            fontFamily: "Roboto Serif",

    },
    shapeOfWater: {
        backgroundImage: ("url(" + shapeOfWater + ")"),
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "300px",
    },
    screenshot: {
        backgroundImage: ("url(" + screenShot + ")"),
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "300px",
    }
}))

const stylesModal = {
    modal: {
        position: 'absolute',
        outline: "none",
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "95%",
        height: "55%",
        borderRadius: "10px",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        overflowY: "scroll"
    },
    title: {
        paddingTop: "15px",
        fontFamily: "Roboto Serif", 
        fontWeight: "bold", 
        textAlign: "center"
    }

};

const about = 'Vanilla Date jest w pełni funkcjonalnym prototypem popularnych aplikacji randkowych. Założeniem projektu było stworzenie komfortowej dla użytkownika przestrzeni sprzyjającej poznawaniu nowych ludzi. Design inspirowany motywami filmu "Kształt Wody" reż. Guillermo del Toro, nagrodzonym Złotą Palmą w Cannes.'
const about2 = 'Zdjęcia użytkowników są poddane działaniu skryptu modyfikującego obraz. Dzięki temu animacja kilku tysięscy obiektów układa się w kształt portretu użytkownika. Nawiązanie kontaktu jest subtelniejsze i anonimowe.'
const about3 = 'Gdy użytkownicy pulubią swoje profile mogą nawiązać ze sobą kontakt przez Chat. Dalszy scenariusz piszą użytkownicy... Zapraszam do rejestracji :)'



const AboutApp = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (<>
        <a className={classes.about} onClick={handleOpen}>about app</a>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                <Box sx={stylesModal.modal}>
                    <Typography id="modal-modal-title" style={stylesModal.title} variant="h4" component="h2">
                        About App
                    </Typography>
                    <div className={classes.text}>
                        {about}
                    </div>
                    <div className={classes.shapeOfWater}/>
                    <div className={classes.text}>
                        {about2}
                    </div>
                    <div className={classes.screenshot}/>
                    <div className={classes.text}>
                        {about3}
                    </div>
                </Box>
                <FancyButton bottomPosition={"2vh"} close={handleClose}/>
                </div>
            </Modal>
        </div>

    </>)
}


export default AboutApp