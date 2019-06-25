import React from 'react'
import { Switch, Route } from 'react-router-dom'
import WelcomePage from './components/WelcomePage/WelcomePage'
import HomePage from './components/Homepage/HomePage'
import RegisterForm from './components/RegisterForm/RegisterForm'
import Profile from './components/Profile/Profile'

export default (
    <Switch>
        <Route path="/welcomePage" component={WelcomePage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/profile" component={Profile} />
    </Switch>
)