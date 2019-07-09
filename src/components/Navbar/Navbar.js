import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from './../../redux/reducers/users'
import bars from './../../bars-solid.svg'
import './Navbar.css'

import { logout } from '../../redux/reducers/users'

class Navbar extends Component {
    render() {
        let { user } = this.props
        return (
            <div className='nav'>
                <div className='profile'>
                    <p className='pName' >Welcome, {user.first_name}</p>
                    <p className='pEmail'>{user.email}</p>
                </div>
                <Link to={`/profile/${user.id}`}>
                    <img src={user.image} alt="" className='userPhoto'/>
                </Link>
                <nav className="navbar" >
                    <label htmlFor="toggle" className="label" >
                        <img className='bars' src={bars} alt=""></img>
                    </label>
                    <input type="checkbox" id="toggle" />
                    <div className="menu" >
                        <a href="#/">Home</a>
                        <a href="#/kennel">The Kennel</a>
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

export default connect(mapStateToProps, { logout, getUser })(Navbar)

// let styles = {
//     navbar: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     },

//     image: {
//         height: 50,
//         width: 50,
//         borderRadius: 25
//     },

//     profile: {
//         marginRight: 10,
//         fontSize: 12
//     },

//     userInfo: {
//         margin: 0,
//     },

//     bars: {
//         height: 30,
//         width: 30,
//         marginTop: 30
//     },
// }