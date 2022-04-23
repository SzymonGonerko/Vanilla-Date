import React, {useEffect, useState, useContext} from "react"
import ContainerGradient from "../3.Home/partials/ContainerGradient"
import Title from "../1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import {AppContext} from "../../App";

const Chat = () => {
    const {state ,setState} = useContext(AppContext)
    const { state: { user: userF } } = useContext(AppContext);

    const [openModalLoad, setOpenModalLoad] = useState(true);
    const handleCloseModalLoad = () => setOpenModalLoad(false);


    useEffect(() => {
        // if (!userF?.uid) return;
        setState(prev => ({...prev, photo: true, story: true}))
    }, [])




    return (
    <ContainerGradient>
        <Modal open={openModalLoad} aria-labelledby="modal-modal-title">
            <Box sx={styleModalLoad}>
                <CircularProgress />
                    <Typography id="modal-modal-load" style={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        chwila...
                    </Typography>
            </Box>
        </Modal>
        <Title/>
        <Navigation curr="Chat"/>
    </ContainerGradient>)
}

export default Chat