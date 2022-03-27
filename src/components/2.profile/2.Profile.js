import React, {useContext, useState, useEffect} from "react"
import {AppContext} from "../../App";
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

import ProfilePhoto from "./partials/ProfilePhoto";
import ProfileInfo from "./partials/ProfileInfo"
import Logout from "./partials/Logout"
import DeleteProfile from "./partials/DeleteProfile"

const db = getFirestore()
const colRef = collection(db, 'Users')

const Profile = () => {
    const {state ,setState} = useContext(AppContext);
    const [user, setUser] = useState({})

    useEffect(() => {
        getDocs(colRef)
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (doc.data().personalDataForm.UID === localStorage.getItem("uid")){
                        setUser({ ...doc.data()})
                    }
                    // console.log(doc.data().personalDataForm.UID)
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])





    const handleClick = () => {
        console.log(user)
    }



    return (<>
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
        <Logout uid={user.personalDataForm? user.personalDataForm.UID : null} />
        <DeleteProfile uid={user.personalDataForm? user.personalDataForm.UID : null}/>

    </ProfileInfo>

    </>)
}

export default Profile