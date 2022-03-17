import React from "react";
import injectSheet from "react-jss";
const styles = {
    part: {
        fontSize: "1.2rem",
        textAlign: "center",
        marginTop: "10px",
        fontFamily: "Roboto Serif",
        lineHeight: "1.7rem",
        color: "black"
    },
    info: {
        fontSize: "1.2rem",
        textAlign: "center",
        fontWeight: "100",
        fontFamily: "Roboto Serif",
        lineHeight: "1.7rem",
        color: "black"
    },

}

const Box = ({classes, part}) => {
    return (<>
        <h2 className={classes.part}>Część {part}/3</h2>
        {part === 1 ? <h3 className={classes.info}>Dane osobowe</h3>: null}
        {part === 2 ? <h3 className={classes.info}>Test postaw wobec miłości</h3>: null}
        {part === 3 ? <h3 className={classes.info}>Autoryzacja</h3>: null}
        <h4 className={classes.info}>Całość zajmie ok. 10 minut</h4>
    </>)
}

const Description = injectSheet(styles)(Box)

export default Description
