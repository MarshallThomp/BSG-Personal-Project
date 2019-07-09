import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/users'
import axios from 'axios'
import S3bucket from './../S3bucket/S3bucket'
import Header from './../../components/Header/Header'
import './RegisterForm.css'

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
                <Header />
                <div className='registerPage'>
                    <h1>Register</h1>
                    {/* <input 
                type="text"
                name="image"
                placeholder="image"
                onChange={this.handleChange}
                value={this.state.image}
                required /> */}
                    <S3bucket className='upload' setUserPic={this.setUserPic} />
                    <input
                        className='inp fn'
                        type="text"
                        name="first_name"
                        placeholder="first name"
                        onChange={this.handleChange}
                        value={this.state.first_name}
                        required />
                    <input
                        className='inp ln'
                        type="text"
                        name="last_name"
                        placeholder="last name"
                        onChange={this.handleChange}
                        value={this.state.last_name}
                        required />
                    <input
                        className='inp email'
                        type="text"
                        name="email"
                        placeholder="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        required />
                    <input
                        className='inp pw'
                        type="text"
                        name="password"
                        placeholder="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        required />
                    <button className='btn registering' onClick={this.register}><b>Register</b></button>
                    <div>
                        <p>Already have an account? {" "}
                            <button className='btn cancel' onClick={this.props.toggleLogin}>Cancel</button>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { getUser })(RegisterForm)