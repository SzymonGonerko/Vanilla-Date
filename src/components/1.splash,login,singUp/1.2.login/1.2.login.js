import React from "react";
import BackgroundContainer from "../1.1.splash/partials/BackgroundContainer";
import AreaLogin from "./partials/AreaLogin";
import Draw from "../1.1.splash/partials/Draw";
import Title from "../1.1.splash/partials/Title";



const Login = () => {
    return (
        <BackgroundContainer>
            <Title/>
            <Draw/>
            <AreaLogin/>
        </BackgroundContainer>
    )
}

export default Login