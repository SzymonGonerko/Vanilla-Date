import React from "react"
import { getAuth, signOut } from "firebase/auth";
import auth from "../../../firebase"
import {useHistory} from "react-router-dom";

import LoadingButton from '@mui/lab/LoadingButton';


const Logout = ({uid}) => {
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);

    function handleClick() {
        setLoading(prevState => !prevState);
        signOut(auth).then(() => {
            console.log("wylogowano")
            localStorage.removeItem('uid');
            history.push('/login')
        }).catch((error) => {
            console.log(error.message)
        })
    }



    return (<>
                <LoadingButton
                    size="large"
                    fullWidth
                    onClick={handleClick}
                    loading={loading}
                    loadingIndicator="sekunda..."
                    variant="outlined"
                >
                    Wyloguj
                </LoadingButton>


    </>)
}

export default Logout