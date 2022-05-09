import React, {useState} from "react"
import {signOut} from "firebase/auth";
import auth from "../../../firebase"
import {useHistory} from "react-router-dom";


import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import LogoutIcon from '@mui/icons-material/Logout';

const stylesModal = {
    modalConfirm: {
        position: 'absolute',
        outline: "none",
        borderRadius: "10px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "90%",
        backgroundColor: "white",
        border: '2px solid #000',
        boxShadow: 24,
        padding: "20px"
    },
    btn: {
        boxShadow: "rgb(68 68 68 / 10%) 0px 3px 3px 0px"
    }
}

const Logout = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    function handleClick() {
        setLoading(prevState => !prevState);
        signOut(auth).then(() => {
            history.push('/login')
        }).catch((error) => {
            console.log(error.message)
        })
    }



    return (<>
        <Button
            onClick={handleOpen}
            style={stylesModal.btn}
            size="large"
            endIcon={<LogoutIcon/>}
            fullWidth
            variant="outlined"
            >
            Wyloguj
        </Button>
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={stylesModal.modalConfirm}>
                    <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        Czy chcesz się Wylogować ?
                    </Typography>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button
                            sx={{marginTop: "30px", width: "40%"}}
                            size="large"
                            startIcon={<CheckIcon/>}
                            onClick={handleClick}
                            variant="outlined"
                            color="success">
                            Tak
                        </Button>
                        <Button
                            sx={{marginTop: "30px", width: "40%"}}
                            size="large"
                            onClick={handleClose}
                            startIcon={<CloseIcon/>}
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

export default Logout