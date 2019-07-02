import React from 'react'
import { Switch, Route } from 'react-router-dom'
import WelcomePage from './components/WelcomePage/WelcomePage'
import HomePage from './components/Homepage/HomePage'
import RegisterForm from './components/RegisterForm/RegisterForm'
import Profile from './components/Profile/Profile'
import Kennel from './components/Kennel/Kennel'
import Detail from './components/DetailDog/DetailDog'
import AddDog from './components/CreateDog/CreateDog'

export default (
    <Switch>
        <Route path="/welcomePage" component={WelcomePage} />
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/profile" component={Profile} />
        <Route path="/kennel" component={Kennel} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/addDog" component={AddDog} />
    </Switch>
)