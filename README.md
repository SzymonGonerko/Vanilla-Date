## Navigation

- [Project_Vanilla-Date](#Project_Vanilla-Date)
- [Technologies](#Technologies)
  - [MaterialUI](#MaterialUI)
  - [Firebase](#Firebase)
  - [React_Router_Dom](#React_Router_Dom)
- [Problems_and_solutions](#Problems_and_solutions)
  - [Optimization](#Optimization)
  - [Data_before_load](#Data_before_load)
  - [TypeError_couples_is_not_iterable](#TypeError_couples_is_not_iterable)
- [Canvas_animation_and_class_Particle_-_Logic](#Canvas_animation_and_class_Particle_-_Logic)



# Project_Vanilla-Date

https://vanilla-date.netlify.app/

![VD](https://github.com/SzymonGonerko/Vanilla-Date/blob/b031be018ca23b8af85c6d5b3361011bdc6364c6/src/images/screen.jpg)
Vanilla-Date is dating application in mobile version, fully functional, written in a React library
, styled with JSS and with Material-UI. During write a project, I learned how to apply functions
asynychronical and solve the problem of server queries. I became proficient in
reading documentation and managing component lifecycles. App
placed on a Google server (Firebase) with user authentication and service
backend. Design inspired by the movie "The Shape of Water" dir. Guillermo del Toro

# Technologies

![NPM](https://github.com/SzymonGonerko/Vanilla-Date/blob/b83579ffeac66a58d8fcab9dc0d70ec919d17950/src/images/npm.jpg)

## MaterialUI

One of the most commonly used NPM packages were Material-UI and MaterialUI / core. I decided to install both. The design of the MaterialUI / core components is more suited to the form and the Material-UI components are more suited to the user section (for example UserCard.js). One of the problems with styling Material components is that the vast majority of them can only be styled linearly. The Material components are based on their own classes, so class styling is much more difficult. Therefore, in some parts of the project, I  use linear styling and class styling for html tags.

## Firebase

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

## React_Router_Dom

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

# Problems_and_solutions

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

![FIREBASE](https://github.com/SzymonGonerko/Vanilla-Date/blob/86a3ad5ecbc7eabd4466b8404120b1d0be37668d/src/images/fetch.jpg)

## Data_before_load

While i was writing the implementation of a class object, I missed one obvious detail that I hadn't thought of. It is a big functionality. I was convinced that the error was on the side of a flawed class object. I will devote a separate chapter to the Particle.js object. The animation did not work, and the console did not return any error. One solution to this problem was to use setTimeout (() => {}, 0), which is an asynchronous method that moves it to the call stack. Then I realized what the problem was. I tried to get the instance data of an object before load. The solution to this problem is to use the myImage.onload = function () {…}.

![LOAD](https://github.com/SzymonGonerko/Vanilla-Date/blob/7180eca71573abfd89d35979f4dc25fa28cbdcf2/src/images/load.jpg)

## TypeError_couples_is_not_iterable

During first session, the user probably not have couples. Other users have not interacted with the his/her until using the application. When useEffect is executed, the value of doc.data().couples of the current user is undefined. After rest operator [...doc.data ().couples] try itering of value undefined. The application stops working. The solution to the problem is to use the try {…} catch (e) {console.log (e)} methods. This allows you to catch the error and execute the rest of the script. Moreover, try {} catch () {} converte error into message in console browser.

![LOAD](https://github.com/SzymonGonerko/Vanilla-Date/blob/a1974ec16656f72679bb73c2e24b4410c95d736f/src/images/iterable.jpg)


# Canvas_animation_and_class_Particle_-_Logic


Before we go to the analysis, we will need a base64 photo. Base64 format allows you to encode photo source in bit format (it can also be text). After loading the image, I created the canva element and specified its width and height. For the purposes of this project, I set the canva width to the width of the window. After that i executed drawImage() and next step is convert image to base64 using toDataURL() method and send to firebase. 

```
        reader.onload = function (event) {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;
            imgElement.onload = function (e) {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = window.innerWidth;

                const scaleSize = MAX_WIDTH / e.target.width;
                canvas.width = MAX_WIDTH;
                canvas.height = e.target.height * scaleSize;
                const ctx = canvas.getContext("2d");

                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
                const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
                const docRef = doc(db, 'Users', docId)
                updateDoc(docRef, {
                    avatar64: srcEncoded,
                    avatar64Height: canvas.height,
                }).catch((err) => {console.log(err.message)})
            };
```

Directly in the MyCanvas.js component, i set to references for the canvas tag so that React can see which element is to give context using useRef(). The next step is to draw the image on the canvas, execute the getImageData () method and finally clean the canva. The getImageData() method returns an object from the data array with information about the rgba value of each pixel.

![LOAD](https://github.com/SzymonGonerko/Vanilla-Date/blob/adfde41e68cdcd42705c6070ac8d9afb60e2234b/src/images/getImageData.jpg)

I would like to explain in detail how the pixel data function works. Canvas has two coordinate coordinates as seen in the notation

```
const context = canvas.getContext('2d')
```

therefore, a dependent loop with an X and Y coordinate is needed. Importantly, the loop takes all pixels vertically for Y. Then it goes to horizontally coordinate. 

![LOAD](https://github.com/SzymonGonerko/Vanilla-Date/blob/14ae5c080ddbcb6692a69eb843ebd71dd8d9a9a5/src/images/loop.jpg)

Another function is performed in the loop. This is calculateRelativeBrightness() This function adjusts the brightness of the pixels according to human perception of brightness. As humans we tend to perceive brightness through the context in which it is embedded which does not make the color lighter or darker. I am not a specialist in the theory of contrast, so below is an article about specialized physical theory.

https://www.sciencedirect.com/science/article/pii/S0042698907000648

![LOAD](https://github.com/SzymonGonerko/Vanilla-Date/blob/0f19e6f089699fd39e57a756b90f1daea1a6be4a/src/images/brightness.jpg)


Finally, we move on to the particle class, which is the essence of animation. This class is seen as small circles that move on the animation at different speeds and sizes. This class contains some basic dependencies in the constructor. The color is depends of gender user. If the user is female it is red, if the user is male it is blue. Contex is the canvas tag element so that objects can access it. Height and width are the dimensions of the context. The X and Y coordinates are the directions in which the objects will move. The next elements are the speed and size of the objects.

```
class Particle {
    constructor(width, height, pixelsImage, context, color){
        this.color = color
        this.context = context
        this.pixelsImage = pixelsImage
        this.height = height
        this.width = width
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.speed = 0;
        this.size = Math.random() * 2.5 + 0.2;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);

    }
    update(){
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        if ((this.pixelsImage[this.position1])&&(this.pixelsImage[this.position1][this.position2])){
            this.speed = this.pixelsImage[this.position1][this.position2][0];
        }
        this.size = this.speed * 3;


        this.y -= 0.3;
        this.x += 0.3;
        if (this.y <= 0){
            this.y = this.height;
            this.x = Math.random() * this.width;
        }
        if (this.x >= this.width){
            this.x = 0;
            this.y = Math.random() * this.height;
        }
    }
    draw(){
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.context.fill();
    }
}
```

I added some chaos to this project using the Math.random () method. You have to remember that the starting points of the animation are the left side of the canvas. If several thousand small objects have the same initial value, they will create one canva line.

# Link
Page is is available at adress https://vanilla-date.netlify.app/


