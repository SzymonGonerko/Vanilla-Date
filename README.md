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
const q = query(collection(db, "Users"), where("UID", "==", userF.uid));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    isFirSession = doc.data().isFirstSession
    setDocId(doc.id)
    setUser(doc.data());
})
```

The where method allows you to easily filter data on the server. It is not a deep filtering because this method works on the server side and is a provider burden. ***Unfortunately, Firebase 9.6.8 disabled in free version the ability to implement server-side function.***

![FIREBASE](https://github.com/SzymonGonerko/Vanilla-Date/blob/c0b44ad5705ec4e250e0eda049b15d3bcf8b99f0/src/images/firebase.jpg)

3. React-Router-Dom 5.2.0

The navigation is based on React-Router-Home. The application consists of several main components rendered in the main root in App.js. The main structure is shown below

```
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
```

# Problems and solutions

## Optimization

One of the biggest problems I faced was optimization. The application load consist of several elements. First, firebase disabled the ability to execute server-side functions. Therefore, the pairing function for the current user must be performed on the side of the current user. The user's browser takes the interactions of all other users and compares them to the interactions of the current user. I am aware that this functionality should be performed on the server side, but with free version of Friebase it is not possible. Simplified scheme of selecting partners is presented below

![FIREBASE](https://github.com/SzymonGonerko/Vanilla-Date/blob/aa9abade7afcfcd5b7b723607a2bc0658ba41b29/src/images/object.jpg)


Of course, each user can delete couple, so the pairing function is a bit more complicated. 

```
    currUserProfile.likes?.forEach(currUser => Object.entries(currUser).forEach(([currKeycurrValue]) => (
        users.forEach(el => el.likes?.forEach(item => Object.entries(item).forEach(([key, value]) => {
            if (currUserProfile.docId === key && value && currKey === el.docId && currValue) {
                setCouples(prev => [...prev, el.docId])
                updateDoc(docRef, {
                couples: arrayUnion(el.docId)
                })
                            }
                        }
                    )))
                )))
```


Moreover, each user object contains a base64 image which is then converted to a canvas animation. 
Finally, the number of server queries was so large that it did not allow smooth use of the application.
I tried to transfer some of the data to the application state, but it turned out to be insufficient. 
The only effective solution to this problem was to execute 

```
 window.location.reload()
```

I am fully aware of the side effects of this solution, including page load times and information loss from the global state. At the moment, this is the only possible way to ensure the application runs smoothly. I Hope to learn more about code optimization process in future work. 

# Link
Demo page is is available at adress https://vanilla-date.netlify.app/


