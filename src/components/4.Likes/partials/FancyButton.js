import React, {useContext, useEffect, useState} from "react"
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
    fancyButton: {
        position: "fixed",
        display: "block",
        border: "none",
        bottom: "5vh",
        left: "50%",
        transform: "translate(-50%,-50%)",
        height: "15vh", 
        width: "18vh",
        background: "radial-gradient(circle at 0% 0%, hotpink, slateblue)",
        borderRadius: "30% 70% 53% 47% / 26% 46% 54% 74%",
        boxShadow: "0 -2vh 4vh LightPink inset, 0 1vh 4vh MediumPurple inset, 6vh -2vh 7vh purple inset",
        filter: "drop-shadow(0 0 1vh Thistle) drop-shadow(0 0.5vh 1vh Orchid) drop-shadow(0.5vh -1vh 15vh MediumSlateBlue) drop-shadow(0 0 7vh MediumOrchid)",
    }
}))

const FancyButton = ({close, bottomPosition}) => {
    const classes = useStyles();

    return (<button onClick={close} style={{bottom: (bottomPosition)}} className={classes.fancyButton}/>)
}

export default FancyButton