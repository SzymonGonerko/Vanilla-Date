import {Box, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {topic} from "./topic";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, {useState, useEffect} from "react";
import {createUseStyles} from "react-jss";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from '@mui/icons-material/Edit';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import {doc, getDocs, updateDoc, collection} from 'firebase/firestore'
import {db} from "../../../firebase"
let docRef = doc(db, 'Users', localStorage.getItem("doc.id"))
const colRef = collection(db, 'Users')


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const useStyles = createUseStyles((theme) => ({
    profileTitle: {
        fontSize: "1.7rem",
        fontFamily: "Roboto Serif",
        marginTop: "15px",
        marginBottom: "10px"
    },
    description: {
        fontSize: "1.2rem",
        fontFamily: "Roboto Serif",
        letterSpacing: "1px",
    },
    error: {
        color: "orange"
    }
}))



const Story = () => {
    const classes = useStyles();
    const [form, setForm] = useState({area: "", topic: 1})
    const [errors, setErrors] = useState({length: false})
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(true)
    const [disable, setDisable] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getDocs(colRef)
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (doc.data().personalDataForm.UID === localStorage.getItem("uid")){
                        if (doc.data().story && doc.data().topic) {
                            setForm(prevState => ({...prevState, area: doc.data().story, topic: doc.data().topic}))
                            setDisable(true)
                            setEdit(false)
                        }
                    }
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }, [])

    const handleClick = () => {
        setDisable(false)
        setEdit(true)
    }

    const handleBlur = (e) => {
        console.log(e.target.value.length)
        if (e.target.value.length <= 200) {
            setErrors(prevState => ({...prevState, length: "Tak krótko? postaraj się aby twoja opowieść była na conajmniej 200 znaków"}))
        } else { setErrors(prevState => ({...prevState, length: false}))}

        if (e.target.value.length > 1500) {
            setErrors(prevState => ({...prevState, length: "Maksymalnie 1500 znaków"}))
        }

    }



    const handleSubmit = (e) => {
        e.preventDefault()
        const selectedTopic = form.topic;
        const story = form.area;
        if (!errors.length) {
            updateDoc(docRef, {
                story: story,
                topic: selectedTopic
            })
                .then(() => {
                    console.log("Zapisano")
                    setDisable(true)
                    setEdit(false)
                    handleClose()
                }).catch((err) => {console.log(err.message)})
        }


    }


    function updateState(event) {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setForm({ ...form, [fieldName]: fieldValue });
    }

    return (<>
        <h2 className={classes.profileTitle}>Twoja historia...</h2>
        <Box component="form" onSubmit={handleSubmit} style={{width: "100%", border: "1px solid black" }}>
            <RadioGroup
                name="topic"
                margin="normal"
                defaultValue="1"
                onChange={updateState}
                style={{flexDirection: "row", justifyContent: "space-between", marginLeft: "11px", marginRight: "-16px" }}
            >
                <FormControlLabel disabled={disable} value="1" control={<Radio/>}/>
                <FormControlLabel disabled={disable} value="2" control={<Radio/>}/>
                <FormControlLabel disabled={disable} value="3" control={<Radio/>}/>
                <FormControlLabel disabled={disable} value="4" control={<Radio/>}/>
            </RadioGroup>
            <div className={classes.description}>{topic.filter((el, i) => (parseInt(form.topic) === (i + 1) ? <div>{el}</div>: null))}</div>

            <TextareaAutosize
                name="area"
                value={form.area}
                onBlur={handleBlur}
                onChange={updateState}
                disabled={disable}
                style={{ width: "100%",
                    height: "20rem",
                    fontSize: "1.2rem",
                    fontFamily: "Roboto Serif",
                    letterSpacing: "1px",
                    lineHeight: "1.7rem",
                    outline: "none",
                    border: "none",
                    overflow: "scroll"
                }}
            />
            {errors.length? <p className={classes.error}>{errors.length}</p>: null}
            <Button
                sx={{marginTop: "10px" }}
                onClick={handleClick}
                disabled={edit}
                endIcon={<EditIcon />}
                size="large"
                fullWidth
                variant="outlined">
                edytuj
            </Button>
            <Button
                sx={{marginTop: "10px" }}
                onClick={handleOpen}
                disabled={disable}
                endIcon={<AutoStoriesIcon/>}
                size="large"
                fullWidth
                variant="outlined">
                To już koniec mojej historii
            </Button>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" sx={{fontFamily: "Roboto Serif", fontWeight: "bold"}} variant="h6" component="h2">
                            Czy to jest koniec Twojej historii?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 , fontFamily: "Roboto Serif"}}>
                            Pamiętaj, że możesz umieścić długą formę wypowiedzi. Inni użytkownicy będą czytać Twoją historię, która będzie w dużej mierze podstawą do połączenia użytkowników
                        </Typography>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Button
                                sx={{marginTop: "30px", width: "40%", backgroundColor: "#FFCCCC"}}
                                size="large"
                                startIcon={<CloseIcon />}
                                onClick={handleSubmit}
                                variant="outlined"
                                color="error">
                                Tak
                            </Button>
                            <Button
                                sx={{marginTop: "30px", width: "40%", backgroundColor: "lightgreen"}}
                                size="large"
                                onClick={handleClose}
                                startIcon={<CheckIcon />}
                                variant="outlined"
                                color="success">
                                Nie
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </Box>
    </>)
}

export default Story
