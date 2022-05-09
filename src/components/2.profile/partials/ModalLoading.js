import React, {useState, useEffect, useContext} from "react"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';


const stylesmodalLoad = {
        position: 'absolute',
        outline: "none",
        borderRadius: "10px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        textAlign: "center",
        p: 4,
}

const ModalLoading = ({isOpen}) => {

useEffect(() =>{},[isOpen])

    return (<>
                <Modal
                open={isOpen === undefined ? true:isOpen}
                aria-labelledby="modal-modal-load">
                <Box sx={stylesmodalLoad}>
                    <CircularProgress />
                    <Typography id="modal-modal-load" style={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        chwila...
                    </Typography>
                </Box>
            </Modal>
    </>)
}

export default ModalLoading