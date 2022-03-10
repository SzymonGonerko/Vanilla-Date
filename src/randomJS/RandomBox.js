import React from "react";
import injectSheet from "react-jss";
import img from "../images/draw.png"

const styles = {
    randomBox: {width: "400px", height:"400px",
    backgroundSize: "cover",
    backgroundImage: `url(${img})`}
}

const RandomBox = ({classes}) => {
    return <div className={classes.randomBox}>exportowany plik js</div>
}

const styledBox = injectSheet(styles)(RandomBox)

export default styledBox