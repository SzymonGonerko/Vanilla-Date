# Project Vanilla-Date

![VD](https://github.com/SzymonGonerko/Vanilla-Date/blob/b031be018ca23b8af85c6d5b3361011bdc6364c6/src/images/screen.jpg)
Vanilla-Date is dating application in mobile version, fully functional, written in a React library
, styled with JSS and with Material-UI. During write a project, I learned how to apply functions
asynychronical and solve the problem of server queries. I became proficient in
reading documentation and managing component lifecycles. App
placed on a Google server (Firebase) along with user authentication and service
backend. Design inspired by the movie "The Shape of Water" dir. Guillermo del Toro
# Languages & technologies
![NPM](https://github.com/SzymonGonerko/Vanilla-Date/blob/b83579ffeac66a58d8fcab9dc0d70ec919d17950/src/images/npm.jpg)

1. Material-UI and MaterialUI/core

One of the most commonly used NPM packages were Material-UI and MaterialUI / core. I decided to install both. The design of the MaterialUI / core components is more suited to the form and the Material-UI components are more suited to the user section (for example UserCard.js). One of the problems with styling Material components is that the vast majority of them can only be styled linearly. The Material components are based on their own classes, so class styling is much more difficult. Therefore, in some parts of the project, I  use linear styling and class styling for html tags.

2. Firebase-9.6.8

One of the powerful tools of the project is Firebase 9.6.8. It is used to support the backend, including sending and downloading data and user authentication. Firebase has  own methods for handling server queries. One of the most used was the example below.

```
import { collection, query, where, getDocs } from "firebase/firestore";
const q = query(collection(db, "cities"), where("capital", "==", true));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```

The where method allows you to easily filter data on the server. It is not a deep filtering because this method works on the server side and is a provider burden. ***Unfortunately, Firebase 9.6.8 disabled in free version the ability to implement server-side function.***

![FIREBASE](https://github.com/SzymonGonerko/Vanilla-Date/blob/c0b44ad5705ec4e250e0eda049b15d3bcf8b99f0/src/images/firebase.jpg)

2. React-Router-Dom 5.2.0

The navigation is based on React-Router-Home. The application consists of several main components rendered in the main root in App.js. The main structure is shown below

```
      <AppContext.Provider value={{state, setState}}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>

            {dimensions.width> 450 && dimensions.height > 500? <Desktop/>:null}

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
      </AppContext.Provider>
```

# Link
Demo page is is available at adress https://vanilla-date.netlify.app/


