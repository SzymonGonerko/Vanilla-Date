import React, {useContext} from "react"

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import {AppContext} from "../../../App";
import {useHistory} from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {color: "rgb(170, 63, 236)"}

const styles = {
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

const Navigation = ({curr}) => {
    const {state, setState} = useContext(AppContext)
    const [value, setValue] = React.useState(curr);
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
       if (state.photo && state.story) {
           setValue(newValue)
           if (newValue === "Główna") {
               history.push('/Home')
               window.location.reload()
           }
           if (newValue === "Profil") {
               history.push('/Profile')
               window.location.reload()
           }
           if (newValue === "Pary") {
               history.push('/Likes')
               window.location.reload()
           }
           if (newValue === "Chat") {
            history.push('/Chat')
            window.location.reload()
        }
       } else {handleOpen()}
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (<>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box sx={styles}>
                    <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        Najpierw wstaw swoje zdjęcie i uzupełnij historię
                    </Typography>
                </Box>
            </Modal>
        </div>
        <form style={{position: "fixed", bottom: "0", width: "100%"}} onSubmit={handleSubmit}>
        <BottomNavigation sx={{backgroundColor: "rgb(230, 230, 230)", borderRadius: "20px 20px 0 0"}} value={value} onChange={handleChange}>
            <BottomNavigationAction
                style={style}
                type="submit"
                label="Główna"
                value="Główna"
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                style={style}
                type="submit"
                label="Pary"
                value="Pary"
                icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
                style={style}
                type="submit"
                label="Chat"
                value="Chat"
                icon={<ChatIcon />}
            />
            <BottomNavigationAction
                style={style}
                type="submit"
                label="Profil"
                value="Profil"
                icon={<PersonIcon />} />
        </BottomNavigation>
        </form>
    </>)
}

export default Navigation