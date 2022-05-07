import React, {useState, useEffect, useContext} from "react"
import {createUseStyles} from "react-jss";
import UserSVG from "../../../images/user-solid.svg"
import EditSVG from "../../../images/pen-solid.svg"
import FancyButton from "../../4.Likes/partials/FancyButton"

import {storage} from "../../../firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {doc, updateDoc} from 'firebase/firestore'
import {db} from "../../../firebase"
import {AppContext} from "../../../App";
import Modal from "@mui/material/Modal";
import Typography from '@mui/material/Typography';
import SecurityUpdateWarningIcon from '@mui/icons-material/SecurityUpdateWarning';
import Box from "@mui/material/Box";


const style = {
    position: 'absolute',
    outline: "none",
    top: '3%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: "90%",
    backgroundColor: "black",
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: "center"
};

const stylesModal = {
    modalPhoto: {
        position: 'absolute',
        outline: "none",
        top: '3%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        width: "90%",
        backgroundColor: "black",
        border: '2px solid #000',
        boxShadow: 24,
        textAlign: "center"
    },
    modalWarning: {
        position: 'absolute',
        outline: "none",
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        backgroundColor: "white",
        border: '2px solid #000',
        textAlign: "center",
        borderRadius: "10px",
        p: 1
    },
    uploadIcon: {
        transform: "translate(0%, 13%)",
        marginRight: "10px"
    }
}

const useStyles = createUseStyles((theme) => ({
    "@keyframes pulse": {
       "0%": {
          boxShadow: "0 0 0 0 rgba(24, 255, 0, 1)",
        },
        "100%": {
          boxShadow: "0 0 0 20px rgba(24, 255, 0, 0)",
        }
      },
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
    photoContainer: {
        position: "relative",
        top: "55%",
        left: "50%",
        height: "140px",
        width: "140px",
        transform: "translate(-50%, -50%)"
    },
    photo: {
        position: "absolute",
        borderRadius: "50%",
        backgroundImage: `url(${UserSVG})`,
        backgroundSize: "50px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "140px",
        height: "140px",
        top: "0",
        left: "0",
        border: "1px solid black"
    },
    edit: {
        position: "absolute",
        display: "block",
        borderRadius: "50%",
        backgroundImage: `url(${EditSVG})`,
        backgroundColor: "lightgreen",
        backgroundSize: "15px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "30px",
        height: "30px",
        top: "3%",
        left: "80%",
        border: "1px solid black",
        outline: "none",
        animation: "$pulse 2.5s infinite",
    },
    editAfterLoad: {
        position: "absolute",
        display: "block",
        borderRadius: "50%",
        backgroundImage: `url(${EditSVG})`,
        backgroundColor: "transparent",
        backgroundSize: "15px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "30px",
        height: "30px",
        top: "3%",
        left: "80%",
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

const ProfilePhoto = ({userName, age, uid, docId}) => {
    const { state: { user: userF } } = useContext(AppContext);
    const {setState} = useContext(AppContext)
    const [isLoaded, setIsLoaded] = useState(false)
    const [size, setSize] = useState("")

    const [openModalPhoto, setOpenModalPhoto] = useState(false);
    const handleOpenModalPhoto = () => setOpenModalPhoto(true);
    const handleCloseModalPhoto = () => setOpenModalPhoto(false);

    const [openModalWarning, setOpenModalWarning] = useState(false);
    const handleOpenModalWarning = () => setOpenModalWarning(true);
    const handleCloseModalWarning = () => (setOpenModalWarning(false), setSize(""));

    const classes = useStyles();
    const [url, setUrl] = useState({ UserSVG})
    const [cover, setCover] = useState("")

    useEffect(() => {
        if (!userF?.uid || !uid || !docId) return;
        const starsRef = ref(storage, `Avatars/${uid}`);
        getDownloadURL(starsRef).then((url) => {
            setIsLoaded(true)
            setUrl(url);
            setState(prev => ({...prev, photo: true, photoURL: url, modalLoad: false}))
            setCover("cover")}
            ).catch((err) => {
                console.log(err.message); setState(prev => ({...prev, photo: false, modalLoad: false}))
            })

    }, [userF, uid, docId] )





    const uploadFiles = (file) => {
        console.log(file)
        if (!file) return;
       
        if ((file.size / 1000000) > 10) {
            console.log(5)
            setSize((file.size / 1000000).toFixed(2))
            handleOpenModalWarning()
            return
        }
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
                const docRef = doc(db, 'Users', docId)
                updateDoc(docRef, {
                    avatar64: srcEncoded,
                    avatar64Height: canvas.height,
                })
                    .then(() => {
                        console.log("Zapisano")
                    }).catch((err) => {console.log(err.message)})


            };

        };

        const storageRef = ref(storage, `Avatars/${uid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",null,
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setIsLoaded(true)
                    setState(prev => ({...prev, photo: true, photoURL: downloadURL}))
                    setUrl(downloadURL);
                    setCover("cover")
                });
            }
        );
    };


    const handleChange = (e) => {
        console.log(e.target.files)
        uploadFiles(e.target.files[0])
    }


    return (
        <header className={classes.headerProfilePhoto}>
            <h1 className={classes.title}>Profil</h1>
                <Modal
                    open={openModalPhoto}
                    onClose={handleCloseModalPhoto}
                >
                    <Box sx={stylesModal.modalPhoto}>
                       <div style={{backgroundImage: `url(${url})`, backgroundPosition: "center" ,backgroundSize: cover, height: "70vh"}}/>
                        <FancyButton bottomPosition={"-25vh"} close={handleCloseModalPhoto}/>
                    </Box>
                </Modal>
                <Modal
                    open={openModalWarning}
                    onClose={handleCloseModalWarning}
                >
                    <Box sx={stylesModal.modalWarning}>
                    <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        <SecurityUpdateWarningIcon style={stylesModal.uploadIcon}/>Zdjęcie jest zbyt duże
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 , fontFamily: "Roboto Serif"}}>
                      Twoje zdjęcie ma {size}mb. Ilość miejsca na serwerze jest ograniczona.<br/><br/><strong>Proszę, wstaw zdjęcie do 10mb</strong> 
                    </Typography>
                        <FancyButton bottomPosition={"-30vh"} close={handleCloseModalWarning}/>
                    </Box>
                </Modal>
            <div className={classes.photoContainer}>
            <div
                className={classes.photo}
                onClick={cover?handleOpenModalPhoto:null}
                style={{backgroundImage: `url(${url})`, backgroundSize: cover}}>
                    
            </div>
            <label className={(isLoaded? classes.editAfterLoad: classes.edit)} htmlFor="upload-photo"/>
            </div>
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

