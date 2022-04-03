import React, {useContext, useState} from "react";
import Container from "./partials/Container";
import Registration from "./partials/Registration";
import Description from "./partials/Description";

import PersonalDataForm from "./partials/PersonalDataForm";
import {AppContext} from "../../../App";
import Authorization from "./partials/Authorization";


const SignUp = () => {
    const [data,setData] = useState(0);
    const { state, setState } = useContext(AppContext)


return (
    <Container>
        <Registration/>
        <Description part={state.registerPart}/>
        {state.registerPart === 1 ? <PersonalDataForm/> : null}
        {state.registerPart === 2 ? <Authorization/> : null}

    </Container>
)
}

export default SignUp