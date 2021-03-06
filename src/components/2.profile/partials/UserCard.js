import React from "react"
import {CardActionArea} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MyCanvas from "./MyCanvas";

const UserCard = ({name, age, question, story ,plot ,gender, srcFromProps}) => {
    return (<>
        <UserCard style={{overflowY: "scroll", overflowX: "hidden"}}>
            <CardActionArea>
                <CardContent>
                    <Typography style={{fontFamily: "Roboto Serif"}} gutterBottom variant="h4" component="div">
                        {name}, {age} lat
                    </Typography>
                    <Typography style={{fontFamily: "Roboto Serif", fontSize: "1rem", color: "#9c27b0"}} variant="body1" color="text.secondary">
                        {question}
                    </Typography>
                    <Typography style={{fontFamily: "Roboto Serif", fontSize: "1rem"}} variant="body1" color="text.secondary">
                        {plot === null ? story: plot}
                    </Typography>
                </CardContent>
                <MyCanvas gender={gender}/>
            </CardActionArea>
        </UserCard>
    </>)
}

export default UserCard