import './App.scss';
import React, {useState, createContext} from "react";
import Splash from "./components/1.splash,login,singUp/1.1.splash/1.1.splash";
import Login from "./components/1.splash,login,singUp/1.2.login/1.2.login";
import SignUp from "./components/1.splash,login,singUp/1.3.SignUp/1.3.SignUp";
import Profile from "./components/2.profile/2.Profile"
import  {ThemeProvider} from 'react-jss'
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

const theme = {
  colorPrimary: "#e73c7e",
}


export const AppContext = createContext({})


const  App = () => {
  const [state, setState] = useState({
    registerPart: 1,
    personalDataForm: undefined,
    personalityTestForm: undefined,
    uid: undefined,
    photo: false,
    photoURL: undefined,
    story: false
  })


  return (
      <AppContext.Provider value={{state, setState}}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>

              <Route exact path="/">
                <Splash/>
              </Route>

              <Route path="/login">
                <Login/>
              </Route>

              <Route path="/signUp">
                <SignUp/>
              </Route>

              <Route path="/profile">
                <Profile/>
              </Route>

            </Switch>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>);
}

export default App;
