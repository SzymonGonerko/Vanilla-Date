import React from "react";
import injectSheet from "react-jss";

const styles = {
    copyright: {
        fontSize: "1.2rem",
    }
}

const Box = ({classes}) => {
    return <div className={classes.copyright}>Vanilla-Date&copy; Szymon Gonerko</div>
}

const Copyright = injectSheet(styles)(Box)

export default Copyright