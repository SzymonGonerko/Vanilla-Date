import * as React from 'react';
import polishCities from "./polishCities";

import {
    Container,
    Box,
    Button,
    TextField,
    FormControlLabel,
    RadioGroup,
    createTheme,
    ThemeProvider,
    FormControl,
    FormLabel,
    Radio} from "@material-ui/core";


import Autocomplete from '@mui/material/Autocomplete';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import plLocale from 'date-fns/locale/pl'
import {useContext, useState} from "react";
import {AppContext} from "../../../../App";

const theme = createTheme();




const  PersonalDataForm = () => {
    const [value, setValue] = React.useState(null);
    const {setState} = useContext(AppContext)


    const [errors, setErrors] = useState({
        name: true,
        email: true,
        password: true,
        ConfirmPassword: true,
        gender: true,
        birth: true,
        height: true,
        city: true,
        orientation: true
    })


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        getValidate(data)

        if ( Object.entries(errors).every(([key, value]) => value === false)) {
            // console.log({
            //     email: data.get('email'),
            //     password: data.get('password'),
            //     ConfirmPassword: data.get('ConfirmPassword'),
            //     gender: data.get('gender'),
            //     birth: data.get('birth'),
            //     height: data.get('height'),
            //     city: data.get('city'),
            //     orientation: data.get('orientation')
            // });
            setState(prev => ({
                registerPart: prev.registerPart + 1,
                personalDataForm: {
                    name: data.get('name'),
                    email: data.get('email'),
                    password: data.get('password'),
                    ConfirmPassword: data.get('ConfirmPassword'),
                    gender: data.get('gender'),
                    birth: data.get('birth'),
                    height: data.get('height'),
                    city: data.get('city'),
                    orientation: data.get('orientation')
            }
            }))
        }

    };

    const getValidate = (data) => {
        if ([...data.get('name')].length < 3) {
            setErrors(prev => {return {...prev, name: prev.name = 'imię jest za krótkie za krótkie min. 3 znaki'}})
        } else {setErrors(prev => {return {...prev, name: prev.name = false}})}

        if (![...data.get('email')].includes("@") || [...data.get('email')].length < 3) {
            setErrors(prev => {return {...prev, email: prev.email = 'email nie zawiera "@" lub jest za krótki'}})
        } else {setErrors(prev => {return {...prev, email: prev.email = false}})}

        if (data.get('password') !== data.get('ConfirmPassword') || [...data.get('password')].length < 3) {
            setErrors(prev => {return {...prev, password: prev.password = 'hasła nie są takie same lub są za krótkie min. 3 znaki'}})
        } else {setErrors(prev => {return {...prev, password: prev.password = false, ConfirmPassword: prev.ConfirmPassword = false}})}

        if (data.get('gender') === null) {
            setErrors(prev => {return {...prev, gender: prev.gender = 'wybierz płeć'}})
        } else {setErrors(prev => {return {...prev, gender: prev.gender = false}})}

        if (data.get('orientation') === null) {
            setErrors(prev => {return {...prev, orientation: prev.orientation = 'wybierz orientację'}})
        } else {setErrors(prev => {return {...prev, orientation: prev.orientation = false}})}

        if (data.get('birth') === "") {
            setErrors(prev => {return {...prev, birth: prev.birth = 'wybierz datę urodzenia'}})
        } else {setErrors(prev => {return {...prev, birth: prev.birth = false}})}

        if (parseInt(data.get('height')) >= 273 || parseInt(data.get('height')) <= 54 || data.get('height') === "") {
            setErrors(prev => {return {...prev, height: prev.height = 'podaj poprawną wartość'}})
        } else {setErrors(prev => {return {...prev, height: prev.height = false}})}

        if (data.get('city') === "") {
            setErrors(prev => {return {...prev, city: prev.city = 'podaj miasto'}})
        } else {setErrors(prev => {return {...prev, city: prev.city = false}})}

    }

    return (
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

                        <TextField
                            inputProps={{style: {fontSize: "1.3rem"}}}
                            InputLabelProps={{style: {fontSize: "1.3rem"}}}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Imię"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        {errors.name? <p style={{color: "red", textAlign: "center"}}>{errors.name}</p>: null}
                        <TextField
                            inputProps={{style: {fontSize: "1.3rem"}}}
                            InputLabelProps={{style: {fontSize: "1.3rem"}}}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="adres e-mail"
                            name="email"
                            autoComplete="email"
                        />
                        {errors.email? <p style={{color: "red", textAlign: "center"}}>{errors.email}</p>: null}

                        <TextField
                            inputProps={{style: {fontSize: "1.3rem"}}}
                            InputLabelProps={{style: {fontSize: "1.3rem"}}}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Hasło"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {errors.password? <p style={{color: "red",textAlign: "center"}}>{errors.password}</p>: null}
                        <TextField
                            inputProps={{style: {fontSize: "1.3rem"}}}
                            InputLabelProps={{style: {fontSize: "1.3rem"}}}
                            margin="normal"
                            required
                            fullWidth
                            name="ConfirmPassword"
                            label="Powtórz Hasło"
                            type="password"
                            id="ConfirmPassword"
                        />
                        {errors.password? <p style={{color: "red", textAlign: "center"}}>{errors.password}</p>: null}
                        <FormControl
                            margin="normal"
                            required
                            fullWidth>
                            <FormLabel
                                style={{fontSize: "1.3rem"}}
                                id="demo-radio-buttons-group-label">Płeć:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="gender"
                                row
                                margin="normal"
                            >
                                <FormControlLabel value="kobieta" control={<Radio />} label="kobieta" />
                                <FormControlLabel value="meżczyzna" control={<Radio />} label="meżczyzna" />
                            </RadioGroup>
                        </FormControl>
                        {errors.gender? <p style={{color: "red", textAlign: "center"}}>{errors.gender}</p>: null}
                        <FormControl
                            margin="normal"
                            required
                            fullWidth>
                            <FormLabel id="demo-radio-buttons-group-label">Orientacja:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="orientation"
                                row
                                margin="normal"
                            >
                                <FormControlLabel value="hetero" control={<Radio />} label="heteroseksualna" />
                                <FormControlLabel value="homo" control={<Radio />} label="homoseksualna" />
                            </RadioGroup>
                        </FormControl>
                        {errors.orientation? <p style={{color: "red", textAlign: "center"}}>{errors.orientation}</p>: null}
                        <FormControl
                            required
                            fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
                                    <DatePicker
                                        name="birth"
                                        label="Data Urodzenia"
                                        mask={'pl'}
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        renderInput={(params) => <TextField {...params} name="birth" />}
                                    />
                            </LocalizationProvider>
                        </FormControl>
                        {errors.birth? <p style={{color: "red", textAlign: "center"}}>{errors.birth}</p>: null}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="height"
                            label="Wzrost"
                            type="number"
                        />
                        {errors.height? <p style={{color: "red", textAlign: "center"}}>{errors.height}</p>: null}
                        <Autocomplete
                            margin="normal"
                            disablePortal
                            fullWidth
                            options={polishCities}
                            renderInput={(params) => <TextField {...params} name="city" required label="Miasto" />}
                        />
                        {errors.city? <p style={{color: "red", textAlign: "center"}}>{errors.city}</p>: null}
                        <Button
                            type="submit"
                            style={{marginTop: "30px", marginBottom: "30px"}}
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Dalej
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


export default PersonalDataForm