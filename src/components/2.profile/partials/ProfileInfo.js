import React from "react"
import {
    Box,
    Container, createTheme,
    ThemeProvider
} from "@material-ui/core";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import {createUseStyles} from "react-jss";

const theme = createTheme();

const useStyles = createUseStyles((theme) => ({
    profileTitle: {
        fontSize: "1.7rem",
        fontFamily: "Roboto Serif",
        marginTop: "15px",
        marginBottom: "10px"
    },
    separator: {
        borderBottom: "1px solid grey",
        width: "50%",
        marginTop: "20px",
        marginBottom: "20px"

    }
}))


const ProfileInfo = ({name, birth, email, city, height, children}) => {
    const classes = useStyles();

    return (<>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <h1 className={classes.profileTitle}>Dane osobowe:</h1>
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <ButtonGroup
                        sx={{
                            marginBottom: "10px",
                            marginTop: "10px",
                        }}
                        color="secondary"
                        disableElevation
                        fullWidth
                        variant="outlined">
                            <Button sx={{textTransform: "capitalize"}}>Imię:</Button>
                            <Button sx={{textTransform: "capitalize"}}>{name}</Button>
                    </ButtonGroup>
                    <ButtonGroup
                        sx={{
                            marginBottom: "10px",
                            marginTop: "10px",
                        }}
                        color="secondary"
                        disableElevation
                        fullWidth
                        variant="outlined">
                        <Button sx={{textTransform: "capitalize"}}>Data Urodzenia:</Button>
                        <Button sx={{textTransform: "lowercase"}}>{birth} r.</Button>
                    </ButtonGroup>


                    <ButtonGroup
                        sx={{
                            marginBottom: "10px",
                            marginTop: "10px",
                        }}
                        color="secondary"
                        disableElevation
                        fullWidth
                        variant="outlined">
                        <Button sx={{textTransform: "capitalize"}}>Miasto:</Button>
                        <Button sx={{textTransform: "capitalize"}}>{city}</Button>
                    </ButtonGroup>

                    <ButtonGroup
                        sx={{
                            marginBottom: "10px",
                            marginTop: "10px",
                        }}
                        color="secondary"
                        disableElevation
                        fullWidth
                        variant="outlined">
                        <Button sx={{textTransform: "capitalize"}}>Email:</Button>
                        <Button sx={{textTransform: "capitalize", fontSize: "10px"}}>{email}</Button>
                    </ButtonGroup>

                    <ButtonGroup
                        sx={{
                            marginBottom: "10px",
                            marginTop: "10px",
                        }}
                        color="secondary"
                        disableElevation
                        fullWidth
                        variant="outlined">
                        <Button sx={{textTransform: "capitalize"}}>Wzrost:</Button>
                        <Button sx={{textTransform: "lowercase"}}>{height} cm</Button>
                    </ButtonGroup>
                    <span className={classes.separator} />
                    {children}
                </Box>
            </Container>
        </ThemeProvider>
    </>)
}

export default ProfileInfo
