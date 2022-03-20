import React from "react";
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
    ThemeProvider, TextField,
} from "@material-ui/core";


import auth from "../../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {getFirestore, collection, addDoc} from 'firebase/firestore'

const db = getFirestore()
const colRef = collection(db, 'Users')





const rodo = 'Korzystając z Serwisu zgadzasz się z Regulaminem, Polityką Prywatności i Polityką Cookies. Szczegółowo opisaliśmy w nich zasady korzystania z Vanilla-Date oraz sposób gromadzenia, wykorzystania. Zapoznaj się z naszym komunikatem w związku realizacją obowiązku z art. 13 RODO.'

const theme = createTheme();

const Authorization = () => {
const [loading, setLoading] = React.useState(false);
const [success, setSuccess] = useState(false)
const [agree, setAgree] = useState(false)
const {state ,setState} = useContext(AppContext)
    const history = useHistory();

    const handleSubmit = async (event) => {

        setLoading(prev => !prev);
        event.preventDefault();
        const email = state.personalDataForm.email;
        const password = state.personalDataForm.password;
        console.log(state)

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password).
                then(cred => {
                addDoc(colRef, {
                    personalDataForm: {
                        UID: cred.user.uid,
                        name: state.personalDataForm.name,
                        email: state.personalDataForm.email,
                        password: state.personalDataForm.password,
                        ConfirmPassword: state.personalDataForm.ConfirmPassword,
                        gender: state.personalDataForm.gender,
                        birth: state.personalDataForm.birth,
                        height: state.personalDataForm.height,
                        city: state.personalDataForm.city,
                        orientation: state.personalDataForm.orientation
                    },
                    personalityTestForm: {
                        question1: state.personalityTestForm.question1,
                        question2: state.personalityTestForm.question2,
                        question3: state.personalityTestForm.question3,
                        question4: state.personalityTestForm.question4,
                        question5: state.personalityTestForm.question5,
                        question6: state.personalityTestForm.question6,
                        question7: state.personalityTestForm.question7,
                        question8: state.personalityTestForm.question8,
                        question9: state.personalityTestForm.question9,
                        question11: state.personalityTestForm.question11,
                        question12: state.personalityTestForm.question12,
                        question13: state.personalityTestForm.question13,
                        question14: state.personalityTestForm.question14,
                        question15: state.personalityTestForm.question15,
                        question16: state.personalityTestForm.question16,
                        question17: state.personalityTestForm.question17,
                        question18: state.personalityTestForm.question18,
                        question19: state.personalityTestForm.question19,
                        question20: state.personalityTestForm.question20,
                        question21: state.personalityTestForm.question21,
                        question22: state.personalityTestForm.question22,
                        question23: state.personalityTestForm.question23,
                        question24: state.personalityTestForm.question24,
                        question25: state.personalityTestForm.question25,
                        question26: state.personalityTestForm.question26,
                        question27: state.personalityTestForm.question27,
                        question28: state.personalityTestForm.question28,
                        question29: state.personalityTestForm.question29,
                        question31: state.personalityTestForm.question31,
                        question32: state.personalityTestForm.question32,
                        question33: state.personalityTestForm.question33,
                        question34: state.personalityTestForm.question34,
                        question35: state.personalityTestForm.question35,
                        question36: state.personalityTestForm.question36,
                        question37: state.personalityTestForm.question37,
                        question38: state.personalityTestForm.question38,
                        question39: state.personalityTestForm.question39,
                        question40: state.personalityTestForm.question40,
                        question41: state.personalityTestForm.question41,
                        question42: state.personalityTestForm.question42,
                    }
                }).then(() => {
                    setSuccess(true)
                    // setState({registerPart: 1})
                    setTimeout(() => {history.push('/login');}, 3000)
                })

            })
        } catch (err) {
            console.log(err.message)
        }


        console.log(state)

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
                                style={{fontSize: "2rem"}}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}/>} label={rodo} />
                        </FormGroup>
                        {success? <Button fullWidth size="large" size="large" variant="contained" color="success">Witamy w Vinilla-Date</Button>:null}
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