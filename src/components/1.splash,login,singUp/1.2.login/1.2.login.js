import React, {useState, useContext} from "react";
import BackgroundContainer from "../1.1.splash/partials/BackgroundContainer";
import AreaLogin from "./partials/AreaLogin";
import Draw from "../1.1.splash/partials/Draw";
import Title from "../1.1.splash/partials/Title";
import {AppContext} from "../../../App";
import FancyButton from "../../4.Likes/partials/FancyButton";


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const stylesModal = {
    modalWarn: {
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
}

const Login = () => {
    const {state, setState} = useContext(AppContext)
    const handleClose = () => setState(prev => ({...prev, warnLogout: false}));

    return (<>
                <Modal
                open={state.warnLogout === undefined ? false :state.warnLogout}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={stylesModal.modalWarn}>
                    <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        Zbyt długi czas nieaktywności
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 , fontFamily: "Roboto Serif"}}>
                        Regułu bezpieczeństwa serwera, po zbyt długim czasie nieaktywności ograniczają dostęp do konta użytkownika
                        zaloguj się ponownie aby dokończyć usunięcie konta. Przepraszam za kłopot
                    </Typography>
                    <FancyButton bottomPosition={"-30vh"} close={handleClose}/>
                </Box>
            </Modal>


            <BackgroundContainer>
                <Title/>
                <Draw/>
                <AreaLogin/>
            </BackgroundContainer>
            </>
    )
}

export default Login