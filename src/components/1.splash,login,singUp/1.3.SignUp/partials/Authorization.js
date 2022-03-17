import React from "react";
import {useContext, useState} from "react";
import {AppContext} from "../../../../App";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


import {
    Container,
    Box,
    Button,
    createTheme,
    ThemeProvider, FormControl, FormLabel, RadioGroup, Radio, TextField,
} from "@material-ui/core";

const rodo = 'Korzystając z Serwisu zgadzasz się z Regulaminem, Polityką Prywatności i Polityką Cookies. Szczegółowo opisaliśmy w nich zasady korzystania z Vanilla-Date oraz sposób gromadzenia, wykorzystania. Zapoznaj się z naszym komunikatem w związku realizacją obowiązku z art. 13 RODO.'

const theme = createTheme();

const Authorization = () => {
const [agree, setAgree] = useState(false)
const {state ,setState} = useContext(AppContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
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
                            // marginTop: "10px",
                            marginBottom: "10px" ,
                            backgroundColor: (agree? "lightgreen": null)}}>
                            <FormControlLabel control={<Checkbox
                                onChange={() => setAgree(prevState => !prevState)}
                                color="success"
                                style={{fontSize: "2rem"}}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}/>} label={rodo} />
                        </FormGroup>
                        <Button
                            size="large"
                            fullWidth
                            color={agree?"primary" : "default"}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 ,}}

                        >
                            Wyślij kod autoryzacji
                        </Button>
                        <TextField
                            inputProps={{style: {fontSize: "1.3rem"}}}
                            InputLabelProps={{style: {fontSize: "1.3rem"}}}
                            margin="normal"
                            fullWidth

                            name="ConfirmPassword"
                            label="kod autoryzacji"
                            type="password"
                        />

                        <Button
                            type="submit"
                            size="large"
                            color={agree?"primary" : "default"}
                            fullWidth
                            style={{padding: "10px", marginTop: "10px"}}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                           Zarejestruj się
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>

    </>)
}

export default Authorization