import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDogs, updateAllDogs } from './../../redux/reducers/dogs'
import { Redirect, Link } from 'react-router-dom'
import Doglist from '../DogList/Doglist'
import axios from 'axios'

class Kennel extends Component {

    componentDidMount() {
        this.props.getDogs()
    }

    delete = id => {
        axios.delete(`/api/dogs/${id}`).then(res => {
            this.props.updateAllDogs()
            this.props.history.push("/kennel")
        })
    }

    render() {
        if (!this.props.user.id) {
            return <Redirect to="/welcomePage" />
        }
        
        return this.props.user.id === this.props.dogs.user_id ? (
            <div>
                <h1>The Kennel</h1>
                <Doglist dogs={this.props.dogs} delete={this.delete} />
                <p>Have a new friend?<br />
                    <Link to="/addDog">
                        Welcome them here!
                    </Link>
                </p>
        </div> ) : (
            <div>
                <h2>Welcome Your First Friend Here!</h2>
                <Link to="/addDog">
                    <button style={styles.button}>+</button>
                </Link>
            </div>
        )
        
    }
}

let mapStateToProps = state => {
    let { dogs } = state.dogs
    let { data: user } = state.user
    return { dogs, user }
}
export default connect(mapStateToProps, { getDogs, updateAllDogs })(Kennel)

let styles = {
    button: {
        border: '3px dashed black',
        height: 100,
        width: 100,
        fontSize: 50,
        backGround: '(255, 255, 255, 0.5)'
    }
}