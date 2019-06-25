import React, { Component } from 'react'
import { connect } from 'react-redux'

import { logout } from '../../redux/reducers/users'

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav class="navbar">
                    <label for="toggle" class="label">&#9776;</label>
                    <input type="checkbox" id="toggle" />
                    <div className="menu">
                        <a href="/">Home</a>
                        <a href="/profile">Profile</a>
                        <a href="/pets">Pets</a>
                        <a href="/messages">Messages</a>
                        <a href="/welcomePage" onClick={this.props.logout}>Logout</a>
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