import { ref } from "firebase/storage";
import React, {useRef, useEffect} from "react";
import injectSheet from "react-jss";
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

const styles = {
    '@keyframes animateHeart': {
        "0%": {transform: "rotate(45deg) scale(0.8)"},
        "5%": {transform: "rotate(45deg) scale(0.9)"},
        "10%": {transform: "rotate(45deg) scale(0.8)"},
        "15%": {transform: "rotate(45deg) scale(1)"},
        "50%": {transform: "rotate(45deg) scale(0.8)"},
        "100%": {transform: "rotate(45deg) scale(0.8)"},
    },
    splash: {
        background: "radial-gradient(circle at 0% 0%, hotpink, slateblue)",
        borderRadius: "30% 70% 53% 47% / 26% 46% 54% 74%",
        boxShadow: "0 -2vh 4vh LightPink inset, 0 1vh 4vh MediumPurple inset, 6vh -2vh 7vh purple inset",
        filter: "drop-shadow(0 0 1vh Thistle) drop-shadow(0 0.5vh 1vh Orchid) drop-shadow(0.5vh -1vh 0 MediumSlateBlue) drop-shadow(0 0 0 MediumOrchid)",
        width: "10rem",
        height: "8rem",
        animation: "$animateHeart 2.5s infinite",
    },
    link: {display: "block", height: "100%", width: "100%"}
}

const Box = ({classes}) => {
   const refEl = useRef();

   const handle = () => {
    if (!refEl) return;
    
    try {refEl.current.requestFullscreen()}
        catch (e) {console.log(e)}
   }

    return (
            <div onClick={handle} ref={refEl} className={classes.splash}>
                <Link className={classes.link} to="/login"/>
            </div>
        )
}

const ButtonSplash = injectSheet(styles)(Box)



export default ButtonSplash