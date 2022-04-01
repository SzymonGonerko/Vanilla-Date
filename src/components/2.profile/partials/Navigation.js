import React from "react"

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';

const Navigation = () => {
    const [value, setValue] = React.useState('Profil');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<>
        <BottomNavigation sx={{backgroundColor: "rgb(230, 230, 230)", borderRadius: "20px 20px 0 0"}} value={value} onChange={handleChange}>
            <BottomNavigationAction
                style={{color: "rgb(170, 63, 236)"}}
                label="Główna"
                value="Główna"
                icon={<HomeIcon />}
            />
            <BottomNavigationAction
                style={{color: "rgb(170, 63, 236)"}}
                label="Pary"
                value="Pary"
                icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
                style={{color: "rgb(170, 63, 236)"}}
                label="Chat"
                value="Chat"
                icon={<ChatIcon />}
            />
            <BottomNavigationAction
                style={{color: "rgb(170, 63, 236)"}}
                label="Profil"
                value="Profil"
                icon={<PersonIcon />} />
        </BottomNavigation>
    </>)
}

export default Navigation