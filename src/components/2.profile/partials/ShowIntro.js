import React, {useState, useEffect, useContext} from "react"

import Button from "@mui/material/Button";
import TvIcon from '@mui/icons-material/Tv';
import {AppContext} from "../../../App";

const ShowIntro = () => {
    const {state, setState} = useContext(AppContext)

const handleOpen = () => {
    setState(prev => ({...prev, openFirstSession: true}))
}

return (<>
        <Button
            onClick={handleOpen}
            size="large"
            endIcon={<TvIcon/>}
            fullWidth
            variant="outlined"
            >
            "Pierwszy Raz"
        </Button>
</>)
}

export default ShowIntro