import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'

class WelcomePage extends Component {
    render(){
        let { user } = this.props
        if (user) {
            return <Redirect to="/"/>
        }
        return(
            <div>
                <LoginForm />
            </div>
        )
    }
}

let mapStateToProp = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProp)(WelcomePage)