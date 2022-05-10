import React, {useContext, useState, useEffect} from "react";
import injectSheet from "react-jss";
import {Link, useHistory} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth"
import auth from "../../../../firebase"
import {AppContext} from "../../../../App";

const styles = {
    areaLogin: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "space-around",
        width: "100%",
        minHeight: "50%",
        alignItems: "center",
    },
    title: {
        fontSize: "2.3rem",
        letterSpacing: "2px"
    },
    email: {
        height: "2rem",
        width: "15rem",
        padding: "20px",
        borderRadius: "5px",
        outline: "none",
        border: "none",
        fontSize: "1.2rem",
        opacity: "0.9"
    },
    password: {
        height: "2rem",
        width: "15rem",
        padding: "20px",
        borderRadius: "5px",
        outline: "none",
        border: "none",
        fontSize: "1.2rem",
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
    },
    error: {
        backgroundColor: "white",
        color: "red",
        padding: "5px",
        borderRadius: "5px",
        width: "10rem",
        textAlign: "center",
        opacity: "0.8"
    },
    reg: {
        fontSize: "1.3rem",
        paddingBottom: "20px"
    }
}

const Box = ({classes}) => {
    const { state: { user: userF } } = useContext(AppContext);
    const history = useHistory();
    const {setState} = useContext(AppContext)
    
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    })

    useEffect(() => {
        if (userF?.uid) history.push('/Profile');
    }, [])

    const update = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setForm({ ...form, [fieldName]: fieldValue });
    }





    const handleSubmit = (event) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, form.email, form.password).
        then((cred) => {
            setState(prev => ({...prev, uid: cred.user.uid}))
            setErrors({password: false, email: false});
            history.push('/profile')}).
        catch((err) => (
            console.log(err.message ,err.message.search("password")),
            err.message.search("password")? setErrors(prev => ({...prev, password: "złe hasło" })): null,
            err.message.search("email")? setErrors(prev => ({...prev, email: "zły email" })): null
        ))

    }








    return <>
        <form onSubmit={handleSubmit} className={classes.areaLogin}>
            <h1 className={classes.title}>Zaloguj się</h1>
            <input
                name="email"
                value={form.email}
                className={classes.email}
                type="text"
                placeholder="email"
                onChange={update}/>
            {errors.email? <p className={classes.error}>{errors.email}</p>: null}
            <input
                name="password"
                value={form.password}
                className={classes.password}
                type="password"
                placeholder="hasło"
                onChange={update}/>
            {errors.password? <p className={classes.error}>{errors.password}</p>: null}
            <input
                className={classes.button}
                value="Zaloguj"
                type="submit"/>
            <Link to="/signUp" style={styles.reg}>Nie masz konta? Zarejestruj się!</Link>
        </form>
    </>

}

const AreaLogin = injectSheet(styles)(Box)
export default AreaLogin