import React from "react";
import draw from "../src/images/draw.png"
import BackgroundContainer from "./components/1.splash,login,singUp/1.1.splash/partials/BackgroundContainer";
import {createUseStyles} from "react-jss";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

const useStyles = createUseStyles((theme) => ({
    title: {fontSize: "4rem", transform: "translate(5%, 0%)"},
    draw: {
        height: "50vh",
        width: "100%",
        backgroundImage: ("url(" + draw + ")"),
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
    },
    description: {
        fontSize: "1.5rem",
        width: "450px",
        marginBottom: "10vh",
        textAlign: "center"
    },
}))

const Desktop = () => {
    const classes = useStyles();
    return (
        <>
        <BackgroundContainer>
            <div className={classes.title}>Vanilla Date</div>

            <div className={classes.draw}/>
            <PhoneAndroidIcon style={{fontSize: "4rem",transform: "translate(8%, 0%)"}}/>
            <div className={classes.description}>
                Vanilla Date jest prototypem aplikacji mobilnej dedykowanej dla tych urządzeń.
                Skrypty odpowiedzialne za animacje zdjęć, a także za wyświetlenie projektu mogą zachowywać sie
                w nieoczekiwany sposób. Proszę skorzystaj ze swojego smartfonu
                
            </div>
        </BackgroundContainer>
        </>
    )
}

export default Desktop