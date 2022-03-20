import React, {useState} from "react";
import injectSheet from "react-jss";
import {Link} from "react-router-dom";

const styles = {
    areaLogin: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
        minHeight: "50%",
        alignItems: "center",
    },
    title: {
        fontSize: "2.3rem",
        letterSpacing: "2px"
    },
    login: {
        height: "2rem",
        width: "15rem",
        padding: "20px",
        borderRadius: "5px",
        outline: "none",
        border: "none",
        fontSize: "1.4rem",
        opacity: "0.9"
    },
    password: {
        height: "2rem",
        width: "15rem",
        padding: "20px",
        borderRadius: "5px",
        outline: "none",
        border: "none",
        fontSize: "1.4rem",
        opacity: "0.9"
    },
    button: {
        display: "inline-block",
        width: "15rem",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "violet",
        border: "none",
        fontSize: "1.7rem",
        fontFamily: 'Roboto Serif'
    }
}

const Box = ({classes}) => {
    const [form, setForm] = useState({
        login: "",
        password: ""
    })

    const update = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setForm({ ...form, [fieldName]: fieldValue });
    }

    const validate = (event) => {
        event.preventDefault()
        console.log(form)
    }

    return <>
        <form onSubmit={validate} className={classes.areaLogin}>
            <h1 className={classes.title}>Zaloguj się</h1>
            <input
                name="login"
                value={form.login}
                className={classes.login}
                type="text"
                placeholder="email"
                onChange={update}/>
            <input
                name="password"
                value={form.password}
                className={classes.password}
                type="password"
                placeholder="hasło"
                onChange={update}/>
            <input
                className={classes.button}
                value="Zaloguj"
                type="submit"/>
            <Link to="/signUp">Nie masz konta? Zarejestruj się!</Link>
        </form>
    </>

}

const AreaLogin = injectSheet(styles)(Box)
export default AreaLogin