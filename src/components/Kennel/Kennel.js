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

    checkId = obj => {
        if(obj.user_id === this.props.user.id) {
            return obj
        }
    }

    getId = dog => {
        console.log(dog)
        if(this.checkId(dog.user_id) && dog.user_id === this.props.user.id){
            return true
        }
    }

    render() {
        if(!this.props.dogs.length){
            return( 
                <div>
                    loading
                </div>
            )
        }
        if (!this.props.user.id) {
            return <Redirect to="/welcomePage" />
        }
        let dogId = this.props.dogs.filter((dog) => {
            return dog.user_id === this.props.user.id
        })
        
        return dogId.length ? (
            <div>
                <h1>The Kennel</h1>
                <Doglist dogs={dogId} delete={this.delete} />
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