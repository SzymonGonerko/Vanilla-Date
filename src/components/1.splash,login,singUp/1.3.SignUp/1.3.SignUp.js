import React, {useContext, useState} from "react";
import Container from "./partials/Container";
import Registration from "./partials/Registration";
import Description from "./partials/Description";

import PersonalDataForm from "./partials/PersonalDataForm";
import PersonalityTestForm from "./partials/PersonalityTestForm";
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
        {state.registerPart === 2 ? <PersonalityTestForm/>  : null}
        {state.registerPart === 3 ? <Authorization/> : null}

        {/*<Description part="3"/>*/}
        {/*<Authorization/>*/}
    </Container>
)
}

export default SignUp