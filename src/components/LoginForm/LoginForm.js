import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login } from './../../redux/reducers/users'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        let { email, password } = this.state
        this.props.login({ email, password })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className='loginPage'>
                    <input
                        className='inp email'
                        type="text"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange} />
                    <input
                        className='inp password'
                        type="text"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange} />
                </div>
                    <button className='btn login' onClick={this.handleClick}>Login</button>
                <div>
                    <p>Don't have an account? {" "}
                        <button className='btn signUp' onClick={this.props.toggleLogin}>Sign Up</button>
                    </p>
                </div>
            </div>
        )
    }
}

export default connect(null, { login })(LoginForm)