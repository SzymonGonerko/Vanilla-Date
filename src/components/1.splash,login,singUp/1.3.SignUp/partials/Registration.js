import React from "react";
import injectSheet from "react-jss";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

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
    },
    icon: {
fontSize: "2rem",
marginRight: "10px",
transform: "translate(0%, 5%)"
    }
}

const Box = ({classes}) => {
return <h1 className={classes.title}><AssignmentIndIcon style={styles.icon}/>Rejestracja</h1>
}

const Registration = injectSheet(styles)(Box)

export default Registration