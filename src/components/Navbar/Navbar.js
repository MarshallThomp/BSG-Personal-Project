import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Navbar.css' 

import { logout } from '../../redux/reducers/users'

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar" >
                    <label htmlFor="toggle" className="label" >
                    <i className="fas fa-bars"></i>
                    </label>
                    <input type="checkbox" id="toggle" />
                    <div className="menu">
                        <a href="#/">Home</a>
                        <a href="#/profile">Owner's Info</a>
                        <a href="#/messages">Messages</a>
                        <a href="#/welcomePage" onClick={this.props.logout}>Logout</a>
                    </div>
                </nav>
            </div >
        )
    }
}

let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { logout })(Navbar)