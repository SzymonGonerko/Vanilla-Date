import React from "react"
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


const Logout = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
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
            sx={{marginTop: "10px"}}
            onClick={handleOpen}
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
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        Czy chcesz się Wylogować ?
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

export default Logout