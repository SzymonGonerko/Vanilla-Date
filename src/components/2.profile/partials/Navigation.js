import React, {useContext} from "react"

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import {AppContext} from "../../../App";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useHistory} from "react-router-dom";


const styles = {color: "rgb(170, 63, 236)"}

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

const Navigation = () => {
    const {state, setState} = useContext(AppContext)
    const history = useHistory();
    const [value, setValue] = React.useState('Profil');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleChange = (event, newValue) => {
        if (state.photo && state.story) {
            setState(prev => ({...prev, navigation: newValue}))
            setValue(newValue)
            newValue === "Główna" ? history.push('/Home'): null

        } else {handleOpen()}
    };

    return (<>
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        Najpierw wstaw swoje zdjęcie i uzupełnij swoją historię
                    </Typography>
                </Box>
            </Modal>
        </div>

        <BottomNavigation sx={{backgroundColor: "rgb(230, 230, 230)", borderRadius: "20px 20px 0 0"}} value={value} onChange={handleChange}>
            <BottomNavigationAction
                style={styles}
                label="Główna"
                value="Główna"
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                style={styles}
                label="Pary"
                value="Pary"
                icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
                style={styles}
                label="Chat"
                value="Chat"
                icon={<ChatIcon />}
            />
            <BottomNavigationAction
                style={styles}
                label="Profil"
                value="Profil"
                icon={<PersonIcon />} />
        </BottomNavigation>
    </>)
}

export default Navigation