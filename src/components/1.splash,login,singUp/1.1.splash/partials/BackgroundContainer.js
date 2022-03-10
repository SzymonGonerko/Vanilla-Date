import React from "react";
import injectSheet from "react-jss";

const styles = {
    '@keyframes gradient': {
        "0%": { backgroundPosition: "0% 50%"},
        "50%": { backgroundPosition: "100% 50%"},
        "100%": { backgroundPosition: "0% 50%"},
    },
    background__container: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "space-around",
        fontFamily: 'Roboto Serif',
        alignItems: "center",
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        overflowY: "hidden",
        animation: "$gradient 20s ease infinite",
    }
}

const box = ({classes ,children}) => {
    return <div className={classes.background__container}>
                {children}
            </div>
}

const BackgroundContainer = injectSheet(styles)(box)


export default BackgroundContainer