import React, {useContext} from "react"

import {AppContext} from "../../../App";
import Card from "@mui/material/Card";
import CanvasUser from "./CanvasUser"

import {CardActionArea} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";



import {createUseStyles} from "react-jss";

const stylesModal = {
    card: {
        overflowY: "scroll",
        overflowX: "hidden",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
    },
    typoName: {fontFamily: "Roboto Serif", textTransform: "capitalize"},
    typoAgeHeightCity: {fontFamily: "Roboto Serif"},
    typoQuestion: {fontFamily: "Roboto Serif", fontSize: "1rem", color: "#9c27b0"},
    typoStory: {fontFamily: "Roboto Serif", fontSize: "1rem"}
}

const useStyles = createUseStyles((theme) => ({
    "@keyframes like": {
        "0%": {
           opacity: "1",
           transform: "translate(0%,0%) rotate(0)"
         },
         "100%": {
           opacity: "0",
           transform: "translate(20%,0%) rotate(5deg)"
         }
       },
       "@keyframes unlike": {
        "0%": {
           opacity: "1",
           transform: "translate(0%,0%) rotate(0)"
         },
         "100%": {
           opacity: "0",
           transform: "translate(-20%,0%) rotate(-5deg)"
         }
       },
       cardLike: {
           animation: "$like 0.3s",
           animationFillMode: "forwards"
        },
        cardUnlike: {
            animation: "$unlike 0.3s",
            animationFillMode: "forwards"
         }
}))


const UsersCard =({name, age, question, story, gender, avatar64, avatar64Height, zIndex, height, city}) => {
    const classes = useStyles();
    const {state ,setState} = useContext(AppContext)


    return (<>
        <Card
        className={state.selectedUser === zIndex? (state.isLike ?classes.cardLike: classes.cardUnlike): null}
        style={{
            ...stylesModal.card,
            zIndex: (zIndex? zIndex: null),
            backgroundColor: (gender === "kobieta"? "rgb(255, 230, 252)": "rgb(232, 230, 255)")}}>
            <CardActionArea>
                <CardContent>
                    <Typography style={stylesModal.typoName} gutterBottom variant="h4" component="span">
                        {name},
                    </Typography>
                    <Typography style={stylesModal.typoAgeHeightCity} gutterBottom variant="h6" component="div">
                        {" "}{age} lat, {height} cm, {city}
                    </Typography>
                    <Typography style={stylesModal.typoQuestion} variant="body1" color="text.secondary">
                        {question}
                    </Typography>
                    <Typography style={stylesModal.typoStory} variant="body1" color="text.secondary">
                        {story}
                    </Typography>
                </CardContent>
                <CanvasUser gender={gender} avatar64={avatar64} avatar64Height={avatar64Height} />
            </CardActionArea>
        </Card>
    </>)
}

export default UsersCard