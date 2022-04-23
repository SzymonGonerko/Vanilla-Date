import './App.scss';
import React, {useState, createContext, useEffect} from "react";

import {
  getFirestore, collection, getDocs,query, orderBy, where,doc, getDoc , onSnapshot, updateDoc
} from 'firebase/firestore'



import Splash from "./components/1.splash,login,singUp/1.1.splash/1.1.Splash";
import Login from "./components/1.splash,login,singUp/1.2.login/1.2.login";
import SignUp from "./components/1.splash,login,singUp/1.3.SignUp/1.3.SignUp";
import Profile from "./components/2.profile/2.Profile"
import Home from "./components/3.Home/3.Home"
import Likes from "./components/4.Likes/Likes"
import Chat from "./components/5.Chat/Chat"
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
import { getAuth, onAuthStateChanged } from "firebase/auth";

const theme = {
  colorPrimary: "#e73c7e",
}


const db = getFirestore()

export const AppContext = createContext({})


const  App = () => {
  const [state, setState] = useState({
    registerPart: 1,
    personalDataForm: undefined,
    personalityTestForm: undefined,
    uid: undefined,
    photo: false,
    photoURL: undefined,
    story: false,
    plot: false,
    question: false,
    navigation: false,
    user: null
  })



useEffect(() => {
   const auth = getAuth();

   const unsubscribe = onAuthStateChanged(auth, (user) => {
     
    if (user) {
      setState(prev => ({
        ...prev, 
        user
      }))
    } else {
      setState(prev => ({
        ...prev, 
        user: null
      }))
    }
  });

  
  return () => { unsubscribe() }
}, [])


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

              <Route path="/Home">
                <Home/>
              </Route>

              <Route path="/Likes">
                <Likes/>
              </Route>

              <Route path="/Chat">
                <Chat/>
              </Route>

            </Switch>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>);
}

export default App;
