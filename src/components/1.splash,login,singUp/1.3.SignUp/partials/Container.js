import React from "react";
import injectSheet from "react-jss";

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        minHeight: "100vh",
        width: "100vw",
        alignItems: "center"
    }
}

const Box = ({classes, children}) => {
    return <div className={classes.container}>{children}</div>
}

const Container = injectSheet(styles)(Box)

export default Container
