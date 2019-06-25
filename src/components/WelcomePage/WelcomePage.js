import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm';

class WelcomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signUp: false
        }
    }

    toggleLogin = () => {
        this.state.signUp ? this.setState({signUp: false}) : this.setState({signUp: true})
    }

    render(){
        let { user } = this.props
        if (user) {
            return <Redirect to="/"/>
        }
        return(
            <div>
                { this.state.signUp ? <RegisterForm toggleLogin={this.toggleLogin}/> : <LoginForm toggleLogin={this.toggleLogin}/>}
            </div>
        )
    }
}

let mapStateToProp = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProp)(WelcomePage)