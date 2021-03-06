import React, {useEffect} from "react";
import {useContext, useState} from "react";
import {AppContext} from "../../../../App";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';

import { useHistory } from 'react-router-dom'

import {
    Container,
    Box,
    createTheme,
    ThemeProvider
} from "@material-ui/core";


import auth from "../../../../firebase";
import { createUserWithEmailAndPassword} from "firebase/auth";
import {getFirestore, collection, addDoc} from 'firebase/firestore'

const db = getFirestore()
const colRef = collection(db, 'Users')





const rodo = 'Korzystając z Serwisu zgadzasz na przetwarzanie danych osobowych w związku realizacją obowiązku z art. 13 RODO.'

const theme = createTheme();

const Authorization = () => {
const { state: { user: userF } } = useContext(AppContext);
const [loading, setLoading] = React.useState(false);
const [success, setSuccess] = useState(false)
const [agree, setAgree] = useState(false)
const {state ,setState} = useContext(AppContext)
const history = useHistory();

useEffect(() => {
    if (userF?.uid) history.push('/Profile');
},[])


const getUserAge = (dataBirth) => {
    let currentData = new Date().getFullYear();
    let userAge;
    if (dataBirth !== null) {
        const year = parseInt([...dataBirth].splice(6, 4).join('').toString())
        userAge = currentData - year;
    }
    return userAge
}

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!agree) return
        setLoading(prev => !prev);
        const email = state.personalDataForm.email;
        const password = state.personalDataForm.newPassword;

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password).
                then(cred => {
                addDoc(colRef, {
                    personalDataForm: {
                        name: state.personalDataForm.name,
                        email: state.personalDataForm.email,
                        gender: state.personalDataForm.gender,
                        birth: state.personalDataForm.birth,
                        age: getUserAge(state.personalDataForm.birth),
                        height: state.personalDataForm.height,
                        city: state.personalDataForm.city,
                    },
                    likes: [],
                    UID: cred.user.uid,
                    isFirstSession: true,
                }).then(() => {
                    setSuccess(true)
                    setTimeout(() => {history.push('/Profile');}, 3000)
                })

            })
        } catch (err) {
            console.log(err.message)
        }
    };



    return (<>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate>

                        <FormGroup style={{border: "1px solid black",
                            borderRadius: "5px",
                            padding: "5px",
                            marginBottom: "10px" ,
                            backgroundColor: (agree? "lightgreen": null)}}>
                            <FormControlLabel control={<Checkbox
                                onChange={() => setAgree(prevState => !prevState)}
                                color="success"
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}/>} label={rodo} />
                        </FormGroup>
                        {success? <Button fullWidth  size="large" variant="contained" color="success">Witamy w Vinilla-Date</Button>:null}
                        <LoadingButton
                            fullWidth
                            size="large"
                            type={agree? "submit" :null}
                            endIcon={<SendIcon />}
                            loading={loading}
                            style={{fontSize: "1.2rem", backgroundColor: (agree? null : "grey")}}
                            loadingPosition="end"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Zarejestruj się
                        </LoadingButton>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>

    </>)
}

export default Authorization