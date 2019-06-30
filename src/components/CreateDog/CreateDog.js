import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

class CreateDog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            breed: '',
            image: '',
            age: 0,
            vaccinated: '',
            fixed: '0',
            description: ''
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    createDog = e => {
        e.preventDefault()

        const { name, breed, age, image, vaccinated, fixed, description } = this.state

        axios.put(`/api/dogs`, { name, breed, age, image, vaccinated, fixed, description }).then(res => {
            this.props.history.push("/")
        })
    }

    render() {
        if(!this.props.user.id){
            return <Redirect to="/welcomePage" />
        }
        const {
            name,
            breed,
            image,
            age,
            vaccinated,
            fixed,
            description
        } = this.state
        return(
            <div>
                <h1>PAWsent Your Dog!</h1>
                <form 
                onSubmit={this.createDog}>
                    <label>Name</label>
                    <input
                    type='text'
                    placeholder='Dog Name'
                    name='name'
                    value={name}
                    onChange={this.handleInput}
                    required />
                    <label>Breed</label>
                    <input
                    type='text'
                    placeholder='Dog Breed'
                    name='breed'
                    value={breed}
                    onChange={this.handleInput}
                    required />
                    <label>Age</label>
                    <input
                    type='number'
                    placeholder='Dog Age'
                    name='age'
                    value={age}
                    onChange={this.handleAgeInput}
                    required />
                    <label>Vaccinated?</label>
                    <input
                    type='text'
                    placeholder='Vaccinated'
                    name='vaccinated'
                    value={vaccinated}
                    onChange={this.handleInput}
                    required />
                    <label>Fixed?</label>
                    <input
                    type='text'
                    placeholder='fixed ?'
                    name='fixed'
                    value={fixed}
                    onChange={this.handleInput}
                    required />
                    <label>Description</label>
                    <input
                    type='text'
                    placeholder='description'
                    name='description'
                    value={description}
                    onChange={this.handleInput}
                    required />
                    <label>image</label>
                    <input
                    type='text'
                    placeholder='Dog Image'
                    name='image'
                    value={image}
                    onChange={this.handleInput}
                    required />
                </form>
                <button>Save</button>
                <Link to="/kennel">
                    <button onClick={this.createDog}>Cancel</button>
                </Link>
            </div>
        )
    }
}

let mapStateToProps = state => {
    let { data: user} = state.user
    return { user }
}

export default connect(mapStateToProps)(CreateDog)