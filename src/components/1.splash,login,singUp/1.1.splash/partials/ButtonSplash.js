import React from "react";
import injectSheet from "react-jss";

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
        boxShadow: "inset 0px 0px 58px 0px red",
        opacity: "0.5",
        width: "50%",
        height: "20%",
        animation: "$animateHeart 2.5s infinite",
    }
}

const Box = ({classes}) => {

    return <a className={classes.splash} href=""/>
}

const ButtonSplash = injectSheet(styles)(Box)



export default ButtonSplash