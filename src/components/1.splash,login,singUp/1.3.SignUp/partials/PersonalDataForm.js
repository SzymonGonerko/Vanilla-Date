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
    const [value, setValue] = useState(null);
    const {setState} = useContext(AppContext)
    const [validate, setValidate] = useState(false)


    const [errors, setErrors] = useState({
        name: false,
        email: false,
        newPassword: false,
        currentPassword: false,
        gender: false,
        birth: false,
        height: false,
        city: false,
        preferSex: false
    })


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        getValidate(data)

        if ( Object.entries(errors).every(([key, value]) => value === false) && validate) {
            setState(prev => ({
                registerPart: prev.registerPart + 1,
                personalDataForm: {
                    name: data.get('name'),
                    email: data.get('email'),
                    newPassword: data.get('newPassword'),
                    currentPassword: data.get('currentPassword'),
                    gender: data.get('gender'),
                    birth: data.get('birth'),
                    height: data.get('height'),
                    city: data.get('city')
            }
            }))
        }

    };

    const getUserAge = (dataBirth) => {
        let currentData = new Date().getFullYear();
        let userAge;
        if (dataBirth !== null) {
            const year = parseInt([...dataBirth].splice(6, 4).join('').toString())
            userAge = currentData - year;
        }
        return userAge
    }

    const getValidate = (data) => {
        if ([...data.get('name')].length < 3) {
            setErrors(prev => {return {...prev, name: prev.name = 'imię jest za krótkie za krótkie min. 3 znaki'}})
        } else {setErrors(prev => {return {...prev, name: prev.name = false}})}

        if (![...data.get('email')].includes("@") || [...data.get('email')].length < 3) {
            setErrors(prev => {return {...prev, email: prev.email = 'email nie zawiera "@" lub jest za krótki'}})
        } else {setErrors(prev => {return {...prev, email: prev.email = false}})}

        if (data.get('newPassword') !== data.get('currentPassword') || [...data.get('newPassword')].length < 6) {
            setErrors(prev => {return {...prev, newPassword: prev.newPassword = 'hasła nie są takie same lub są za krótkie min. 6 znaków'}})
        } else {setErrors(prev => {return {...prev, newPassword: prev.newPassword = false, currentPassword: prev.currentPassword = false}})}

        if (data.get('gender') === null) {
            setErrors(prev => {return {...prev, gender: prev.gender = 'wybierz płeć'}})
        } else {setErrors(prev => {return {...prev, gender: prev.gender = false}})}

        if (data.get('birth') === "" || getUserAge(data.get('birth')) < 18 ) {
            setErrors(prev => {return {...prev, birth: prev.birth = 'wybierz datę urodzenia (powyżej 18 lat)'}})
        } else {setErrors(prev => {return {...prev, birth: prev.birth = false}})}

        if (parseInt(data.get('height')) >= 273 || parseInt(data.get('height')) <= 54 || data.get('height') === "") {
            setErrors(prev => {return {...prev, height: prev.height = 'podaj poprawną wartość'}})
        } else {setErrors(prev => {return {...prev, height: prev.height = false}})}

        if (data.get('city') === "") {
            setErrors(prev => {return {...prev, city: prev.city = 'podaj miasto'}})
        } else {setErrors(prev => {return {...prev, city: prev.city = false}})}

        setValidate(true)

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
                            helperText={errors.name}
                            error={errors.name? true: false}
                            fullWidth
                            id="name"
                            label="Imię"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
                            inputProps={{style: {fontSize: "1.3rem"}}}
                            InputLabelProps={{style: {fontSize: "1.3rem"}}}
                            margin="normal"
                            required
                            helperText={errors.email}
                            error={errors.email? true: false}
                            fullWidth
                            id="email"
                            label="adres e-mail"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            inputProps={{style: {fontSize: "1.3rem"}}}
                            InputLabelProps={{style: {fontSize: "1.3rem"}}}
                            margin="normal"
                            required
                            helperText={errors.password}
                            error={errors.password? true: false}
                            fullWidth
                            name="newPassword"
                            label="Hasło"
                            type="password"
                            id="newPassword"
                        />
                        <TextField
                            inputProps={{style: {fontSize: "1.3rem"}}}
                            InputLabelProps={{style: {fontSize: "1.3rem"}}}
                            margin="normal"
                            helperText={errors.password}
                            error={errors.password? true: false}
                            required
                            fullWidth
                            name="currentPassword"
                            label="Powtórz Hasło"
                            type="password"
                            id="currentPassword"
                        />
                        <FormControl
                            margin="normal"
                            required
                            fullWidth>
                            <FormLabel
                                style={{fontSize: "1.3rem"}}
                                error={errors.gender? true: false}
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
                                        renderInput={(params) => <TextField {...params} helperText={errors.birth} error={errors.birth? true: false} name="birth" />}
                                    />
                            </LocalizationProvider>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            helperText={errors.height}
                            error={errors.height? true: false}
                            fullWidth
                            name="height"
                            label="Wzrost"
                            type="number"
                        />
                        <Autocomplete
                            margin="normal"
                            id="auto-complete"
                            autoComplete
                            fullWidth
                            options={polishCities}
                            renderInput={(params) => <TextField {...params} helperText={errors.city} error={errors.city? true: false} name="city" required label="Miasto" />}
                        />
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