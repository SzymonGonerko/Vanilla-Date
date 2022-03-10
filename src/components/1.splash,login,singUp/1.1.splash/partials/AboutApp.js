import React, {useState} from "react";
import Title from "./Title";
import injectSheet from "react-jss";

const styles = {
    about: {
        fontSize: "2rem",
    },
    description: {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        top: "50%",
        textAlign: "center",
        left: "50%",
        width: "100vw",
        height: "100vh",
        fontSize: "1.5rem",
        backgroundColor: "violet",
        transform: "translate(-50%, -50%)",
    },
    close: {
        display: "inline-block",
        width: "45vw",
        height: "8vh",
        borderRadius: "10px",
        backgroundColor: "#e73c7e",
        border: "none",
        fontSize: "2rem"
    },
    text: {
        padding: "5px",
        overflowY: "scroll",
        lineHeight: "2rem",
        height: "60%"

    }


}

const text = 'W obliczu rozwoju rzezywistości pandemicznej wśród społeczeńswa została pogłebiona potrzeba inteakcji międzludzkich i stworzenia głębszych relcji. ' +
    'Najpopularniejsze aplikacje nie zawierają algorytmów pozwalających na dopasowanie potencjalnych partnerów.' +
    'Vanilla-Date opera się na teście osobowości. Dzięki temu partnerzy są lepiej dopasowani. Ponadto użytkownicy doknują przede wszystkim oceny opisu użtykownika. Zdjęcia użytkowników dodają tajmniczości'


const Box = ({classes}) => {
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        setIsClicked(prevState => !prevState)
    }

    return (<>
        <a className={classes.about} onClick={handleClick}>about app</a>
        {isClicked &&
        <div className={classes.description}>
            <Title/>
            <p className={classes.text}>{text}</p>
            <button className={classes.close} onClick={handleClick}>Close</button>
        </div>}

    </>)
}

const AboutApp = injectSheet(styles)(Box)




export default AboutApp