import React from "react"
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
    seperator: {
        height: "2rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "grey",
        "&:after": {
            content: '""',
            display: "block",
            height: "1px",
            width: "70%",
            backgroundColor: "rgb(199 199 199)"
        }
    }
}))


const Seperator = () =>{
    const classes = useStyles();

    return (<div className={classes.seperator}/>)
}

export default Seperator