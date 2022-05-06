import React from "react"
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles((theme) => ({
    quote:{
        fontStyle: "italic",
        fontFamily: "Roboto Serif",
    },
    author: {
        textAlign: "right",
        marginBottom: "20px"
    }
}))


const QuoteChat = () => {
    const classes = useStyles();
    return (<>
                <div className={classes.quote}>
                <p>„...nie my mówimy w języku, a język mówi nami”.</p>
                <p className={classes.author}>Saveli Grinberg</p>
            </div>
    </>)
}

export default QuoteChat