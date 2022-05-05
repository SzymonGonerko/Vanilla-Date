import { ref } from "firebase/storage";
import React, {useRef, useEffect} from "react";
import injectSheet from "react-jss";
import {
    BrowserRouter as Router,
    NavLink,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
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
        borderRadius: "31% 69% 30% 70% / 28% 57% 43% 72%",
        boxShadow: "inset 21px -10px 30px -7px #F7CA18",
        width: "50%",
        height: "20%",
        animation: "$animateHeart 2.5s infinite",
    },
    link: {display: "block", height: "100%", width: "100%"}
}

const Box = ({classes}) => {
   const refEl = useRef();

   const handle = () => {
    if (!refEl) return;
        refEl.current.requestFullscreen()
   }

    return (
            <div onClick={handle} ref={refEl} className={classes.splash}>
                <Link className={classes.link} to="/login"/>
            </div>
        )
}

const ButtonSplash = injectSheet(styles)(Box)



export default ButtonSplash