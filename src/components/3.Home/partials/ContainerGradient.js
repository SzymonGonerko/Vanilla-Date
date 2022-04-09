import React from "react"
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
    '@keyframes gradient': {
        "0%": { backgroundPosition: "0% 50%"},
        "50%": { backgroundPosition: "100% 50%"},
        "100%": { backgroundPosition: "0% 50%"},
    },
    container: {
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "red",
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        overflowY: "hidden",
        animation: "$gradient 20s ease infinite",
    },
}))

const ContainerGradient = ({children}) => {
    const classes = useStyles();

    return (<div className={classes.container}>{children}</div>)
}
export default ContainerGradient

