import React, { useState, useEffect} from "react"
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

import ProfilePhoto from "./partials/ProfilePhoto";
import ProfileInfo from "./partials/ProfileInfo"
import Logout from "./partials/Logout"
import Story from "./partials/Story"
import ProfileCard from "./partials/ProfileCard"
import DeleteProfile from "./partials/DeleteProfile"
import Navigation from "./partials/Navigation"

const db = getFirestore()
const colRef = collection(db, 'Users')

const Profile = () => {
    const [user, setUser] = useState({})

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
            })
    }, [])




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
        <Story/>
        <ProfileCard
            name={user.personalDataForm? user.personalDataForm.name: null}
            birth={user.personalDataForm? user.personalDataForm.birth: null}
            story={user.story? user.story: null}
        />
        <Logout uid={user.personalDataForm? user.personalDataForm.UID : null} />
        <DeleteProfile uid={user.personalDataForm? user.personalDataForm.UID : null}/>
    </ProfileInfo>

    <Navigation/>


    </>)
}

export default Profile