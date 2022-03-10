import React from "react";
import injectSheet from "react-jss";
import myDraw from "../../../../images/draw.png"

const styles = {
    draw: {
        backgroundImage: `url(${myDraw})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: "40%",
    }

}

const Box = ({classes}) => {
    return <div className={classes.draw}/>
}

const Draw = injectSheet(styles)(Box)

export default Draw