import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import RegisterForm from './RegisterForm';

class WelcomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            signUp: false
        }
    }

    handleClick = () => {
        this.state.signUp ? this.setState({signUp: false}) : this.setState({signUp: true})
    }

    render(){
        let { user } = this.props
        if (user) {
            return <Redirect to="/"/>
        }
        return(
            <div>
                { this.state.signUp ? <RegisterForm /> : <LoginForm />}
                <div>
                    <p>Don't have an account? {" "}
                        <button onClick={this.handleClick}>Sign Up</button>
                    </p>
                </div>
            </div>
        )
    }
}

let mapStateToProp = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProp)(WelcomePage)