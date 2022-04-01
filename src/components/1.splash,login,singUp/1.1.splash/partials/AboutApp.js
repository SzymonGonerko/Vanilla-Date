import React, {useContext, useState} from "react";
import Title from "./Title";
import {createUseStyles} from "react-jss";
import {AppContext} from "../../../../App";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const useStyles = createUseStyles((theme) => ({
    about: {
        fontSize: "2rem",
    },
    description: {
        position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            top: "50%",
            textAlign: "center",
            left: "50%",
            width: "100vw",
            height: "100vh",
            fontSize: "1.5rem",
            backgroundColor: "violet",
            transform: "translate(-50%, -50%)",
    },
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
            padding: "5px",
            overflowY: "scroll",
            lineHeight: "2rem",
            height: "60%"

    }
}))

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    height: "50%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    overflowY: "scroll"
};

const text = 'Oktawia Kromer w książce reportażowej "Usługa czysto platoniczna. Jak z samotności robi się biznes" wyd. Czarne, wskazuje że gospodarka rynkowa ' +
    ' ostrzegła w miłości (jako wartości kulturowej) potencjał finansowy i zaczeła trakatować ją jak towar, a ludzi jak produkty.' +
    'Popularne aplikacje randkowe operają się na ocenie zdjęcia użytkownika "hot or not" a same aplikacje daja skromną możliwość opisu swojej historii' +
    'Vanilla-Date traktuje nawiązanie nowej relacji jako proces, a ludzi jako nośniki unkiatowych historii. Użytkownicy mają do wyboru jeden z kilku ' +
    'tematów przewodnich, na ich podstawie przedstawiają swoją historię. Zdjęcia użytkowników zawierają filtr, który z założenia ma uniewmożliwiać jednoznaczną ocenę wyglądu' +
    'ale jednocześnie pozowli użytkownikowi określić jakie włosy ma osoba ze zdjęcia lub czy nosi okulary.'



const AboutApp = () => {
    const classes = useStyles();
    const [isClicked, setIsClicked] = useState(false)
    const {state, setState} = useContext(AppContext)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = () => {
        setIsClicked(prevState => !prevState)
    }

    return (<>
        <a className={classes.about} onClick={handleOpen}>about app</a>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold", textAlign: "center"}} variant="h4" component="h2">
                        Vanilla-Date
                    </Typography>
                    <div>
                        {text}
                    </div>
                </Box>
            </Modal>
        </div>

    </>)
}


export default AboutApp