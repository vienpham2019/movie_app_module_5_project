import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Login from './components/Login'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import {BrowserRouter as Router , Route } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <div>
      <NavBar />
      <Route 
        exact path = "/" 
        render = {(routerProps) => <App {...routerProps} />} 
      />
      <Route 
        exact path = "/login" 
        render = {(routerProps) => <Login {...routerProps} />} 
      /> 
      <Route 
        exact path = "/signup" 
        render = {(routerProps) => <SignUp {...routerProps} /> }
      />
    </div>
  </Router>,
  document.getElementById('root')
);
