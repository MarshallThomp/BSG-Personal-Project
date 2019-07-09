import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { getUser } from './../../redux/reducers/users'
import { getNewDog } from './../../redux/reducers/dogs'
import Header from './../../components/Header/Header'
import S3bucket from './../S3bucket/S3bucket'
import './CreateDog.css'

class CreateDog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            breed: '',
            image: '',
            age: 0,
            vaccinated: '',
            fixed: '',
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

        axios.post(`/api/dogs`, { name, breed, age, image, vaccinated, fixed, description }).then(res => {
            this.props.getNewDog(res.data)
            this.props.history.push("/kennel")
        }).catch(err => console.log(err))
    }

    setDogPic = url => {
        this.setState({
            image: url
        })
    }

    render() {
        if (!this.props.user) {
            this.props.getUser()
            if (!this.props.user) {
                return <Redirect to='/welcomePage' />
            }
        }

        console.log(this.state.image)
        const {
            name,
            breed,
            age,
            vaccinated,
            fixed,
            description
        } = this.state
        return (
            <div>
                <Header />
                <div className='createDogPage'>
                    <h1>PAWsent Your Dog!</h1>
                    <div className='createDogInput'>
                        <label>Name: </label>
                        <input
                            type='text'
                            placeholder='Dog Name'
                            name='name'
                            value={name}
                            onChange={this.handleInput}
                            className='createInp createDogName'
                            required />
                        <label>Breed: </label>
                        <input
                            type='text'
                            placeholder='Dog Breed'
                            name='breed'
                            value={breed}
                            onChange={this.handleInput}
                            className='createInp createDogBreed'
                            required />
                        <label>Age: </label>
                        <select
                            type='number'
                            placeholder='Dog Age'
                            name='age'
                            value={age}
                            onChange={this.handleInput}
                            className='createInp createDogAge'
                            required>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            year(s) old
                    </select>
                        <label>Vaccinated: </label>
                        <select
                            type='text'
                            placeholder='Vaccinated'
                            name='vaccinated'
                            value={vaccinated}
                            onChange={this.handleInput}
                            className='createInp createDogVac'
                            required >
                            <option>Vaccinated</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        <label>Fixed: </label>
                        <select
                            type='text'
                            placeholder='fixed ?'
                            name='fixed'
                            value={fixed}
                            onChange={this.handleInput}
                            className='createInp createDogFixed'
                            required>
                            <option>Fixed</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        <label>Description: </label>
                        <input
                            type='text'
                            placeholder='description'
                            name='description'
                            value={description}
                            onChange={this.handleInput}
                            className='createInp createDogDesc'
                            required />
                        <label>image</label>
                        {/* <input
                    type='text'
                    placeholder='Dog Image'
                    name='image'
                    value={image}
                    onChange={this.handleInput}
                    required /> */}
                        <S3bucket setDogPic={this.setDogPic} />
                    </div>
                    <Link to="/kennel">
                        <button className='btn createDogSave' onClick={this.createDog}>Save</button>
                        <button className='btn createDogCancel'>Cancel</button>
                    </Link>
                </div>
            </div>
        )
    }
}

let mapStateToProps = state => {
    let { data: user } = state.user
    return { user }
}

export default connect(mapStateToProps, { getNewDog, getUser })(CreateDog)