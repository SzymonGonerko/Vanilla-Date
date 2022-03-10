import './App.scss';
import Splash from "./components/1.splash,login,singUp/1.1.splash/1.1.splash";
import Login from "./components/1.splash,login,singUp/1.2.login/1.2.login";

import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


const  App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Splash/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>

    </Switch>
  </Router>);
}

export default App;
