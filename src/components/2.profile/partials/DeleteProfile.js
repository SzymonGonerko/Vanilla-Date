import React from "react"
import Button from '@mui/material/Button';

const DeleteProfile = () => {
    return (<>
        <Button
            sx={{marginTop: "10px"}}
            size="large"
            fullWidth
            variant="outlined"
            color="error">
            Usuń konto
        </Button>
    </>)
}

export default DeleteProfile