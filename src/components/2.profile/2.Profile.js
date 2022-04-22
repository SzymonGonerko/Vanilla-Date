import React, {useState, useEffect, useContext} from "react"
import {
    getFirestore, collection, getDocs,query, orderBy, where,doc, getDoc , onSnapshot
} from 'firebase/firestore'



import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import {createUseStyles} from "react-jss";

import ProfilePhoto from "./partials/ProfilePhoto";
import ProfileInfo from "./partials/ProfileInfo"
import Logout from "./partials/Logout"
import Story from "./partials/Story"
import ProfileCard from "./partials/ProfileCard"
import DeleteProfile from "./partials/DeleteProfile"
import Navigation from "./partials/Navigation"
import {AppContext} from "../../App";

const db = getFirestore()



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


const useStyles = createUseStyles((theme) => ({
    buttonContainer: {
        paddingLeft: "16px",
        paddingRight: "16px",
        margin: "0 auto"
    }
}))

const Profile = () => {
    const {state} = useContext(AppContext)
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
    
    const { state: { user: userF } } = useContext(AppContext);





    useEffect(() => {
        if (!userF?.uid) return;
        const start = async () => {
            try {
                const q = query(collection(db, "Users"), where("UID", "==", userF.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
                })

            } catch (e) {console.log(e)}
        }

 
        start().then(() => {handleClose()})
    }, [userF] )



    return (<>
        <div>
            <Modal
                open={open}
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
        age={user.personalDataForm? user.personalDataForm.age: null}
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
    <div className={classes.buttonContainer}>
        <ProfileCard
            name={user.personalDataForm? user.personalDataForm.name: null}
            gender={user.personalDataForm? user.personalDataForm.gender: null}
            age={user.personalDataForm? user.personalDataForm.age: null}
            plot={state.plot? state.plot:null}
        />
        <Logout />
        <DeleteProfile uid={user.personalDataForm? user.personalDataForm.UID : null}/>
    </div>
    <Navigation curr="Profil"/>


    </>)
}

export default Profile