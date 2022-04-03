import React, {useState, useEffect, useContext} from "react"
import {createUseStyles} from "react-jss";
import UserSVG from "../../../images/user-solid.svg"
import EditSVG from "../../../images/pen-solid.svg"

import {storage} from "../../../firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {doc, updateDoc} from 'firebase/firestore'
import {db} from "../../../firebase"
import {AppContext} from "../../../App";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

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
        display: "block",
        borderRadius: "50%",
        backgroundImage: `url(${EditSVG})`,
        backgroundColor: "lightgreen",
        backgroundSize: "15px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "30px",
        height: "30px",
        top: "-15%",
        left: "65%",
        transform: "translate(-50%, -10%)",
        border: "1px solid black",
        outline: "none",
    },
    userInfo: {
        textAlign: "center",
        position: "absolute",
        fontSize: "1.2rem",
        top: "85%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
    },
    invisibleInput: {
    display: "none"
}


}))

const ProfilePhoto = ({userName, age}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {setState} = useContext(AppContext)
    const classes = useStyles();
    const [url, setUrl] = useState({ UserSVG})
    const [cover, setCover] = useState("")
    const [color, setColor] = useState("")



    useEffect(() => {
        const starsRef = ref(storage, `Avatars/${localStorage.getItem("uid")}`);
        getDownloadURL(starsRef).then((url) => {
            setUrl(url);
            setState(prev => ({...prev, photo: true, photoURL: url}))
            setColor("transparent")
            setCover("cover")}).
            catch((err) => {console.log(err.message); setState(prev => ({...prev, photo: false}))})
    }, [])




    const uploadFiles = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (event) {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;


            imgElement.onload = function (e) {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = window.innerWidth;

                const scaleSize = MAX_WIDTH / e.target.width;
                canvas.width = MAX_WIDTH;
                canvas.height = e.target.height * scaleSize;

                const ctx = canvas.getContext("2d");

                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

                const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");

                const docRef = doc(db, 'Users', localStorage.getItem("doc.id"))
                updateDoc(docRef, {
                    avatar64: srcEncoded,
                    avatar64Height: canvas.height,
                    docId: localStorage.getItem("doc.id")
                })
                    .then(() => {
                        console.log("Zapisano")
                    }).catch((err) => {console.log(err.message)})


            };

        };

        const storageRef = ref(storage, `Avatars/${localStorage.getItem("uid")}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",null,
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setState(prev => ({...prev, photo: true, photoURL: downloadURL}))
                    setUrl(downloadURL);
                    setColor("transparent")
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
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                       <div style={{backgroundImage: `url(${url})`, backgroundPosition: "center" ,backgroundSize: cover, height: "70vh"}}/>
                    </Box>
                </Modal>
            </div>
            <div
                className={classes.photo}
                onClick={cover?handleOpen:null}
                style={{backgroundImage: `url(${url})`, backgroundSize: cover}}>
            </div>
            <label className={classes.edit} style={{backgroundColor: color? color: null}} htmlFor="upload-photo"/>
            <input
                type="file"
                name="photo"
                className={classes.invisibleInput}
                accept="image/*"
                onChange={(e) => handleChange(e)}
                id="upload-photo"/>

            {age? <h2 className={classes.userInfo}>{userName}, {age} lat</h2>: null}
        </header>
    )
}

export default ProfilePhoto

