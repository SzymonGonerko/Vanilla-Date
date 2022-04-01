import React, {useState, useEffect, useContext} from "react"
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import ProfilePhoto from "./partials/ProfilePhoto";
import ProfileInfo from "./partials/ProfileInfo"
import Logout from "./partials/Logout"
import Story from "./partials/Story"
import ProfileCard from "./partials/ProfileCard"
import DeleteProfile from "./partials/DeleteProfile"
import Navigation from "./partials/Navigation"
import {AppContext} from "../../App";

const db = getFirestore()
const colRef = collection(db, 'Users')


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: "center",
    p: 4,
};


const Profile = () => {
    const {state} = useContext(AppContext)
    const [user, setUser] = useState({})
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        getDocs(colRef)
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (doc.data().personalDataForm.UID === localStorage.getItem("uid")){
                        localStorage.setItem("doc.id", doc.id)
                        setUser({ ...doc.data()})
                    }
                })
            })
            .catch(err => {
                console.log(err.message)
            }).then(() => {handleClose()})
    }, [] )




    return (<>

        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box sx={style}>
                    <CircularProgress />
                    <Typography id="modal-modal-title" style={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                        chwila...
                    </Typography>
                </Box>
            </Modal>
        </div>
    <ProfilePhoto
        userName={user.personalDataForm? user.personalDataForm.name: null}
        userBirth={user.personalDataForm? user.personalDataForm.birth: null}
    />

    <ProfileInfo
        name={user.personalDataForm? user.personalDataForm.name: null}
        birth={user.personalDataForm? user.personalDataForm.birth: null}
        email={user.personalDataForm? user.personalDataForm.email: null}
        city={user.personalDataForm? user.personalDataForm.city: null}
        height={user.personalDataForm? user.personalDataForm.height: null}
    >
        <Story/>
    </ProfileInfo>
    <ProfileCard
            name={user.personalDataForm? user.personalDataForm.name: null}
            birth={user.personalDataForm? user.personalDataForm.birth: null}
            gender={user.personalDataForm? user.personalDataForm.gender: null}
            plot={state.plot? state.plot:null}
    />
    <Logout />
    <DeleteProfile uid={user.personalDataForm? user.personalDataForm.UID : null}/>
    <Navigation/>


    </>)
}

export default Profile