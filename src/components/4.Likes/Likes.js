import React, {useContext, useEffect, useState} from "react"
import {arrayUnion, collection, doc, getDocs, getFirestore, updateDoc} from "firebase/firestore";
import Title from "../../components/1.splash,login,singUp/1.1.splash/partials/Title"
import Navigation from "../2.profile/partials/Navigation"
import {AppContext} from "../../App";

const db = getFirestore()
const colRef = collection(db, 'Users')
const docRef = doc(db, 'Users', localStorage.getItem("doc.id"))

const Likes = () => {
    const {state ,setState} = useContext(AppContext)
    const [users, setUsers] = useState({})
    const [loadedUsers, setLoadedUsers] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);

    const getCouples = () => {
        currentUser.likes?.forEach(currUser => Object.entries(currUser).forEach(([currKey,currValue]) => (
            users.forEach(el => el.likes?.forEach(item => Object.entries(item).forEach(([key, value]) => {
                    if (currentUser.docId === key && value && currKey === el.docId && currValue) {
                        console.log(el.personalDataForm.name)
                        updateDoc(docRef, {
                            couples: arrayUnion(el.docId)
                        }).then(() => {
                            console.log("Zapisano")
                        }).catch((err) => {console.log(err.message)})
                    }
                }

            )))
        )))
    }

    useEffect(()=> {
        setState(prev => ({...prev, photo: true, story: true}))
        getDocs(colRef)
            .then(snapshot => {
                const arr = []
                snapshot.docs.forEach(doc => {
                    if (doc.data().personalDataForm.UID === localStorage.getItem("uid")){
                        setCurrentUser({ ...doc.data()})
                    }
                    if (doc.data().personalDataForm.UID !== localStorage.getItem("uid") && doc.data().likes){
                        arr.push({...doc.data()})
                        setUsers(arr)
                    }
                })
            })
            .catch(err => {
                console.log(err.message)
            }).then(() => {
            setLoadedUsers(true)})
    },[])


    return (<>
        {loadedUsers? getCouples() :null}
        <Title/>
        <div>fff</div>
        <Navigation curr="Pary"/>

    </>)
}

export default Likes