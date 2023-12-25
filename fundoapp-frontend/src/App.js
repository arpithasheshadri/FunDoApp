import SignUp from "./pages/signup/SignUp"
import SignIn from "./pages/signin/SignIn"
import Forgot from "./pages/forgot/Forgot"
import Reset from "./pages/reset/Reset"
import Dashboard from "./pages/dashboard/Dashboard"
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {ProtectedRoute} from './ProtectedRoute'

function App() {
  return (
      
        <div className="App">
          <Router>
          <Switch>
            <Route exact path='/signup' component={SignUp}></Route>
            <Route exact path='/' component={SignIn}></Route>
            <Route exact path='/forgot' component={Forgot}></Route>
            <ProtectedRoute exact path='/reset-password/:id' component={Reset}></ProtectedRoute>
            <ProtectedRoute path='/dashboard' component={Dashboard}></ProtectedRoute>
          </Switch>
          </Router>
        </div>
      
  );
}

export default App;
