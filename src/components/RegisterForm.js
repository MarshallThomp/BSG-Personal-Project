import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from './../redux/reducers/users'
import axios from 'axios'

class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: '',
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState = {
            [name]: value
        }
    }

    register() {
        const { first_name, last_name, email, image, password } = this.state;
    
        axios
          .post("/auth/register", { first_name, last_name, email, image, password })
          .then(res => {
            this.props.getUser(res.data);
            this.props.history.push("/");
          })
          .catch(err => {
            alert("User Already Exist Try Logging IN");
          });
      }

    render(){
        return(
            <div>
                <h1>Register</h1>
                <input 
                type="text"
                name="image"
                placeholder="image"
                onChange={this.handleChange}
                value={this.state.image} />
                <input 
                type="text"
                name="first_name"
                placeholder="first name"
                onChange={this.handleChange}
                value={this.state.first_name} />
                <input 
                type="text"
                name="last_name"
                placeholder="last name"
                onChange={this.handleChange}
                value={this.state.last_name} />
                <input 
                type="text"
                name="email"
                placeholder="email"
                onChange={this.handleChange}
                value={this.state.email} />
                <input 
                type="text"
                name="password"
                placeholder="password"
                onChange={this.handleChange}
                value={this.state.password} />
                <button onClick={this.handleClick}>Register</button>
            </div>
        )
    }
}

export default connect(null, { getUser })(RegisterForm)