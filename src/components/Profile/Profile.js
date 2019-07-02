import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from './../../redux/reducers/users'
import { Link } from 'react-router-dom'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: '',
            firstName: '',
            lastName: '',
            email: '',
            editing: false
        }
    }

    handleInput = e => {
        let { name, value} = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    update = e => {
        e.preventDefault()

        this.setState({ editing: false })

        let updatedUser = this.state
        this.props.updateUser(updatedUser)
    }

    toggleEdit = () => {
        let { editing } = this.state
        editing ? this.setState({ editing: false }) : this.setState({ editing: true })
    }

    render() {
        let { user } = this.props
        return this.state.editing ? (
            <div>
                update page
            </div>
        ) : (
                <div>
                    <div style={styles.profile}>
                        <div>
                            <img src={user.image} alt=""  style={styles.image}/>
                        </div>
                        <div>
                            <h3>{user.first_name} {user.last_name}</h3>
                            <h3>{user.email}</h3>
                        </div>
                    </div>
                    <button>Edit</button>
                    <Link to="/">
                        <button>Cancel</button>
                    </Link>
                </div>
            )
    }
}

let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getUser })(Profile)

let styles = {
    profile: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        border: '1px solid black'
    },

    image: {
        height: 150,
        width: 225,
        margin: 20
    }
}