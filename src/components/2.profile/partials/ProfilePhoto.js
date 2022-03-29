import React, {useState, useEffect, useContext} from "react"
import {createUseStyles} from "react-jss";
import UserSVG from "../../../images/user-solid.svg"
import EditSVG from "../../../images/pen-solid.svg"

import {storage} from "../../../firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {AppContext} from "../../../App";

const useStyles = createUseStyles((theme) => ({

    headerProfilePhoto: {
      position: "relative",
      backgroundColor: "rgb(170, 63, 236)",
      height: "300px",
      fontFamily: 'Roboto Serif',
      borderRadius: "0% 0% 50% 50% / 0% 0% 10% 10% "
    },
    title: {
        position: "absolute",
        fontSize: "2rem",
        textAlign: "center",
        color: "white",
        top: "54px",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    photo: {
        position: "relative",
        borderRadius: "50%",
        backgroundImage: `url(${UserSVG})`,
        backgroundSize: "50px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "140px",
        height: "140px",
        top: "100px",
        left: "50%",
        transform: "translate(-50%, -10%)",
        border: "1px solid black"
    },
    edit: {
        position: "relative",
        borderRadius: "50%",
        backgroundImage: `url(${EditSVG})`,
        backgroundColor: "lightgreen",
        backgroundSize: "15px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "30px",
        height: "30px",
        top: "0",
        left: "90%",
        transform: "translate(-50%, -10%)",
        border: "1px solid black",
        outline: "none",
        '&::before': {
            content: '""',
            display: "block",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundImage: `url(${EditSVG})`,
            backgroundColor: "lightgreen",
            backgroundSize: "15px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "30px",
            height: "30px",
            borderRadius: "50px",
            outline: "none",
            cursor: "pointer",
            textShadow: "1px 1px #fff",
        }
    },
    userInfo: {
        textAlign: "center",
        position: "absolute",
        fontSize: "1.2rem",
        top: "85%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
    }

}))

const ProfilePhoto = ({userName, userBirth}) => {
    const {state ,setState} = useContext(AppContext)
    const classes = useStyles();
    const [url, setUrl] = useState({ UserSVG})
    const [cover, setCover] = useState("")



    useEffect(() => {
        const starsRef = ref(storage, `Avatars/${localStorage.getItem("uid")}`);
        getDownloadURL(starsRef).then((url) => {
            setUrl(url);
            setState(prev => ({...prev, photo: true, photoURL: url}))
            setCover("cover")}).
            catch((err) => {console.log(err.message); setState(prev => ({...prev, photo: false})) })
    }, [])



    const getUserAge = (dataBirth) => {
        let currentData = new Date().getFullYear();
        let userAge;
        if (dataBirth !== null) {
            const year = parseInt([...dataBirth].splice(6, 4).join('').toString())
            userAge = currentData - year;
        }
        return userAge
    }




    const uploadFiles = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `Avatars/${localStorage.getItem("uid")}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",null,
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setState(prev => ({...prev, photo: true, photoURL: downloadURL}))
                    console.log("File available at", downloadURL);
                    setUrl(downloadURL);
                    setCover("cover")
                });
            }
        );
    };



    const handleChange = (e) => {
        uploadFiles(e.target.files[0])
    }


    return (
        <header className={classes.headerProfilePhoto}>
            <h1 className={classes.title}>Profil</h1>
            <div
                className={classes.photo}
                style={{backgroundImage: `url(${url})`, backgroundSize: cover}}>
                    <input
                        onChange={(e) => handleChange(e)}
                        type="file" className={classes.edit}
                        accept="image/*"/>
            </div>
            {userBirth? <h2 className={classes.userInfo}>{userName}, {getUserAge(userBirth)} lat</h2>: null}
        </header>

    )
}

export default ProfilePhoto

