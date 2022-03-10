import React from "react";
import injectSheet from "react-jss";

const styles = {
    title: {
        fontSize: "3rem",
        width: "90%",
        textAlign: "center",
        opacity: "0.8",
        borderRadius: "10px",
        lineHeight: "4rem",}
}

const Box = ({classes}) => {
    return <h1 className={classes.title}>Vanilla Date</h1>
}

const Title = injectSheet(styles)(Box)

export default Title