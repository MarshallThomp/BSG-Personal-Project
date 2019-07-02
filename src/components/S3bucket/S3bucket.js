import React, { Component } from 'react'
import axios from 'axios'

class S3bucket extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: '',
            fileName: '',
            fileType: '',
            img: ''
        }
    }

    handlePhoto = e => {
        const reader = new FileReader()
        const file = e.target.files[0]

        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                fileName: file.name,
                fileType: file.type,
                img: ''
            })
        }
        reader.readAsDataURL(file)
    }

    sendPhoto() {
        return axios.put('/api/s3', this.state).then(res => {
            console.log(this.props)
            if(this.props.updateUserPic) {
                console.log('Update User Pic')
                this.props.updateUserPic(res.data.Location)
            } else if (this.props.setUserPic) {
                console.log('Set User Pic')
                this.props.setUserPic(res.data.Location)
            } else if (this.props.updateDogPic) {
                console.log('Update Dog Pic')
                this.props.updateDogPic(res.data.Location)
            } else if (this.props.setDogPic) {
                console.log('Set Dog Pic')
                this.props.setDogPic(res.data.Location)
            } else {
                console.log('no pic')
            }
            this.setState({
                img: res.data.Location
            })
        })
    }

    render() {
        return (
            <div>
                <input type='file' id='real' onChange={this.handlePhoto} />
                <button onClick={this.sendPhoto}>Upload</button>
            </div>
        )
    }
}

export default S3bucket