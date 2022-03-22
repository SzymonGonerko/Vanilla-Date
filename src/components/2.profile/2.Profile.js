import React, {useContext, useState, useEffect} from "react"
import {AppContext} from "../../App";
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

import ProfilePhoto from "./partials/ProfilePhoto";

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
    </>)
}

export default Profile