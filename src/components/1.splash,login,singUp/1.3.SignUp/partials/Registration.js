import React from "react";
import injectSheet from "react-jss";

const styles = {
    title: {
        fontSize: "2.5rem",
        textAlign: "center",
        opacity: "0.8",
        borderRadius: "10px",
        width: "90%",
        marginTop: "20px",
        fontFamily: "Roboto Serif",
        color: "black"
    }
}

const Box = ({classes}) => {
return <h1 className={classes.title}>Rejestracja</h1>
}

const Registration = injectSheet(styles)(Box)

export default Registration