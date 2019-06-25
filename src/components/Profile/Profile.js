import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from './../../redux/reducers/users'

class Profile extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        let { user } = this.props
        return(
            <div>
                <div>
                    <img src={user.image} alt=""/>
                    <button>Edit</button>
                </div>
                <div>
                    <h3>{user.first_name} {user.last_name}</h3>
                    <h3>{user.email}</h3>
                </div>
                <div>
                    <h2>The Pack</h2>
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(Profile)