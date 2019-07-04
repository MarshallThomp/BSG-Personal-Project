import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/users'
import axios from 'axios'
import S3bucket from './../S3bucket/S3bucket'

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
        this.setState({
            [name]: value
        })
    }

    register = () => {
        const { first_name, last_name, email, image, password } = this.state;
        axios
            .post("/auth/register", { image, first_name, last_name, email, password })
            .then(res => {
                this.props.getUser(res.data);
                this.props.history.push("/");
            })
            .catch(err => {
                alert("User Already Exist Try Logging IN");
            });
    }

    setUserPic = url => {
        this.setState({
            image: url
        })
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                {/* <input 
                type="text"
                name="image"
                placeholder="image"
                onChange={this.handleChange}
                value={this.state.image}
                required /> */}
                <S3bucket setUserPic={this.setUserPic} />
                <input
                    type="text"
                    name="first_name"
                    placeholder="first name"
                    onChange={this.handleChange}
                    value={this.state.first_name}
                    required />
                <input
                    type="text"
                    name="last_name"
                    placeholder="last name"
                    onChange={this.handleChange}
                    value={this.state.last_name}
                    required />
                <input
                    type="text"
                    name="email"
                    placeholder="email"
                    onChange={this.handleChange}
                    value={this.state.email}
                    required />
                <input
                    type="text"
                    name="password"
                    placeholder="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    required />
                <button onClick={this.register}>Register</button>
                <div>
                    <p>Already have an account? {" "}
                        <button onClick={this.props.toggleLogin}>Cancel</button>
                    </p>
                </div>
            </div>
        )
    }
}

export default connect(null, { getUser })(RegisterForm)