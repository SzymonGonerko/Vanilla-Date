import React from "react";
import Draw from "./partials/Draw";
import Title from "./partials/Title";
import ButtonSplash from "./partials/ButtonSplash";
import AboutApp from "./partials/AboutApp";
import BackgroundContainer from "./partials/BackgroundContainer";
import Copyright from "./partials/Copyright";


const Splash = () => {
    return <BackgroundContainer>
                <Title/>
                <Draw/>
                <ButtonSplash/>
                <AboutApp/>
                <Copyright/>
            </BackgroundContainer>

}

export default Splash