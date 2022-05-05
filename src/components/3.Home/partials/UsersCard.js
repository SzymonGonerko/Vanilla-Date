import React from "react"
import Card from "@mui/material/Card";
import CanvasUser from "./CanvasUser"
import {CardActionArea} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const UsersCard =({name, age, question, story, gender, avatar64, avatar64Height, zIndex, height, city}) => {
    return (<>
        <Card
              style={{
                  overflowY: "scroll",
                  overflowX: "hidden",
                  zIndex: (zIndex? zIndex: null),
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  backgroundColor: (gender === "kobieta"? "rgb(255, 230, 252)": "rgb(232, 230, 255)")}}>
            <CardActionArea>
                <CardContent>
                    <Typography style={{fontFamily: "Roboto Serif"}} gutterBottom variant="h4" component="span">
                        {name},
                    </Typography>
                    <Typography style={{fontFamily: "Roboto Serif"}} gutterBottom variant="h6" component="div">
                        {" "}{age} lat, {height} cm, {city}
                    </Typography>
                    <Typography style={{fontFamily: "Roboto Serif", fontSize: "1rem", color: "#9c27b0"}} variant="body1" color="text.secondary">
                        {question}
                    </Typography>
                    <Typography style={{fontFamily: "Roboto Serif", fontSize: "1rem"}} variant="body1" color="text.secondary">
                        {story}
                    </Typography>
                </CardContent>
                <CanvasUser gender={gender} avatar64={avatar64} avatar64Height={avatar64Height} />
            </CardActionArea>
        </Card>
    </>)
}

export default UsersCard