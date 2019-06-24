import React from 'react'
import { Switch, Route } from 'react-router-dom'
import WelcomePage from './components/WelcomePage'
import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'

export default (
    <Switch>
        <Route path="/welcomePage" component={WelcomePage} />
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/login" component={LoginForm} /> */}
    </Switch>
)