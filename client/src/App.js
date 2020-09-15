import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt from "jsonwebtoken"
import { logoutUser } from "./features/auth/authSlice"
import { Register, Login } from './features/auth';
import { Dashboard } from './features/dashboard';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import PrivateRoute from './components/private-route/PrivateRoute';
import checkAuth from './utils/checkAuth';
import store from './store';

function authAuth() {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token").split(" ")[1]
    jwt.verify(token, "theMostPowerfulSecretMessage3VeR", (err) => {
      if (err) {
        store.dispatch(logoutUser())
      }
    })
  }
}
window.addEventListener("storage", authAuth)
const App = () => {
  // Check if user is already logged in
  useEffect(() => {
    checkAuth(store);
  }, []);
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Switch>
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
};
export default App;
