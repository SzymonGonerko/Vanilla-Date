import React from "react"
import {useHistory} from "react-router-dom";

import {deleteDoc, doc} from "firebase/firestore";
import {deleteObject, ref} from "firebase/storage"
import {storage, db} from "../../../firebase"
import auth from "../../../firebase"
import {deleteUser} from "firebase/auth";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const stylesModal = {
    modalConfirm: {
        position: 'absolute',
        outline: "none",
        borderRadius: "10px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "90%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    },
    btn: {
        boxShadow: "rgb(68 68 68 / 10%) 0px 3px 3px 0px",
        marginTop: "10px", 
        marginBottom: "70px", 
    }
}



const DeleteProfile = ({uid, docId}) => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleClick = () => {

    const desertRef = ref(storage, `Avatars/${uid}`);
        deleteObject(desertRef).then(() => {
            console.log("usunięto avatar")
        }).catch((error) => {
            console.log(error.message)
        });



    const docRef = doc(db, 'Users', docId);
        deleteDoc(docRef)
            .then(() => {
                console.log("usnięto")
            }).catch((error) => {
            console.log(error.message)
        })


    const user = auth.currentUser;
        deleteUser(user).then(() => {
            console.log("usunięto użytkownika")
            history.push('/login')
        }).catch((error) => {
            console.log(error.message)
        });
    }


    return (<>
        <Button
            onClick={handleOpen}
            style={stylesModal.btn}
            size="large"
            fullWidth
            endIcon={<DeleteForeverIcon/>}
            variant="outlined"
            color="error">
            Usuń konto
        </Button>
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={stylesModal.modalConfirm}>
                    <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        Czy chcesz usunąć konto ?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 , fontFamily: "Roboto Serif"}}>
                        Spowoduje to usunięcie Twojego konta oraz wszystkich danych w tym; hasła, emaila, zdjęcia..itp.
                    </Typography>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button
                            sx={{marginTop: "30px", width: "40%"}}
                            size="large"
                            startIcon={<CheckIcon />}
                            onClick={handleClick}
                            variant="outlined"
                            color="success">
                            Tak
                        </Button>
                        <Button
                            sx={{marginTop: "30px", width: "40%"}}
                            size="large"
                            onClick={handleClose}
                            startIcon={<CloseIcon />}
                            variant="outlined"
                            color="error">
                            Nie
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    </>)
}

export default DeleteProfile