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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};


const DeleteProfile = ({uid}) => {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleClick = () => {
    const docId = localStorage.getItem("doc.id")


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
            sx={{marginTop: "10px", marginBottom: "30px", }}
            onClick={handleOpen}
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
                <Box sx={style}>
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
                            startIcon={<CloseIcon />}
                            onClick={handleClick}
                            variant="outlined"
                            color="error">
                            Tak
                        </Button>
                        <Button
                            sx={{marginTop: "30px", width: "40%"}}
                            size="large"
                            onClick={handleClose}
                            startIcon={<CheckIcon />}
                            variant="outlined"
                            color="success">
                            Nie
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    </>)
}

export default DeleteProfile